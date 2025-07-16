import "./showTodo.css";
import { useRef, useState } from "react";

const listOfType = [
  "Must Do",
  "Should Do",
  "Could Do",
  "If I Have Time",
  "Draggable",
  "Time",
  "default",
];

let touchY = 0;

const listHandelingType = ["Must Do", "Should Do", "Could Do", "If I Have Time", "none"];

//* eslint-disable react/prop-types */
const Showodo = ({ data, dispatch }) => {
  const [showList, setShowList] = useState(false);
  const [type, setType] = useState("");
  const [inputEdit, setInputEdit] = useState("");
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(false);
  const [elementOnDrag, setElementOnDrag] = useState("");
  const [isDraggable, setIsDraggable] = useState(false);

  const RefAllTodo = useRef([]);

  const handleDone = (id) => {
    dispatch({ type: "done", payload: id });
  };
  const handelDelete = (id) => {
    dispatch({ type: "delete", payload: id });
  };

  const handelEditing = (id) => {
    dispatch({ type: "edit", payload: id });
  };

  const handelfinishEdit = (id) => {
    const boxType = listHandelingType[current];
    dispatch({ type: "finishEditing", text: inputEdit, payload: id, post: boxType });
    setCurrent(0);
    setNext(false);
  };

  const hadleDeleteAll = () => {
    dispatch({ type: "deleteAll" });
  };
  const handleCurrent = () => {
    setCurrent((prevCurent) => {
      const range = listHandelingType.length;
      if (prevCurent >= range - 1) {
        prevCurent = 0;
      } else {
        prevCurent = prevCurent + 1;
      }

      return prevCurent;
    });
  };

  const handleClasment = (list) => {
    if (list === "default") {
      FinishDrag();
      dispatch({ type: "classmentWithOrder" });
    }
    if (list === "Time") {
      FinishDrag();
      dispatch({ type: "classmentWithDate" });
    }
    if (list === "Draggable") {
      dispatch({ type: "classmentWithDrag" });
    } else {
      FinishDrag();
      dispatch({ type: "classment", payload: list });
    }
  };

  const handelDragStart = (e, id) => {
    setElementOnDrag(id);
    e.currentTarget.classList.add("IamINDragMode");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("over");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("over");
  };

  const handleChangeElement = (e, id) => {
    e.currentTarget.classList.remove("over");
    e.currentTarget.classList.remove("IamINDragMode");
    dispatch({ type: "drop", payload: { elementIsDrag: elementOnDrag, targetId: id } });
  };

  const FinishDrag = () => {
    dispatch({ type: "FinishDraging" });
  };

  const handleTouchStart = (e, id) => {
    if (isDraggable) {
      setElementOnDrag(id);
      touchY = e.touches[0].clientY;

      RefAllTodo.current.forEach((el, index) => {
        return id === index
          ? el.classList.add("IamINDragMode")
          : el.classList.remove("IamINDragMode");
      });
    }
  };

  const handleTouchMove = (e) => {
    touchY = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    const element = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );

    if (!element) return;

    const targetElement = element.closest(".single-todo");
    console.log(targetElement);

    if (targetElement) {
      const index = Number(targetElement.querySelector(".indexNumber")?.textContent) - 1;

      if (index >= 0) {
        dispatch({
          type: "drop",
          payload: { elementIsDrag: elementOnDrag, targetId: index },
        });
      }
    }

    FinishDrag();
  };

  return (
    <div className="show-todo">
      <div className="classment">
        <span className="delete-all-btn" onClick={hadleDeleteAll}>
          Delete All
        </span>
        <ul
          className={showList ? "todo-select selected" : "todo-select"}
          onClick={() => setShowList(!showList)}>
          <li className="first">
            <span>{type ? type : "Please Choose An Option"}</span>

            {showList ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </li>
          {showList && (
            <div className="classment-wrapper">
              {listOfType.map((list, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setType(list);
                    handleClasment(list);
                    if (list === "Draggable") {
                      setIsDraggable(true);
                    } else {
                      setIsDraggable(false);
                    }
                  }}>
                  {list}
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>
      <div className="wrapper-show">
        {data.map((item, index) => (
          <div
            className={item.isDone ? "single-todo done" : `single-todo ${item.tasktype}`}
            key={index}
            ref={(el) => (RefAllTodo.current[index] = el)}
            draggable={item.drag}
            onDragStart={(e) => handelDragStart(e, index)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleChangeElement(e, index)}
            onTouchStart={(e) => handleTouchStart(e, index)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={(e) => handleTouchEnd(e, index)}>
            {item.isEditing ? (
              <>
                {next ? (
                  <div className="next-type">
                    {listHandelingType[current]}
                    <i className="fa-regular fa-circle-right" onClick={handleCurrent}></i>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="edit-input"
                    value={inputEdit}
                    onChange={(e) => setInputEdit(e.target.value)}
                  />
                )}

                {next ? (
                  <span
                    className="done-Edit-btn"
                    onClick={() => {
                      handelfinishEdit(index);
                    }}>
                    Done
                  </span>
                ) : (
                  <span
                    className="done-Edit-btn"
                    onClick={() => {
                      setNext(true);
                      setCurrent(listHandelingType.indexOf(item.tasktype));
                    }}>
                    Next
                  </span>
                )}
              </>
            ) : (
              <>
                <span className={`indexNumber ${item.tasktype}`}>{index + 1}</span>
                <div className="wrapper-todo">
                  <h3>{item.task}</h3>
                  <h6 className="date">{item.date}</h6>
                </div>

                <div className="icon">
                  <i
                    className="fa-regular fa-circle-check check"
                    onClick={() => handleDone(index)}></i>
                  <i
                    className="fa-solid fa-pen-to-square edit"
                    onClick={() => {
                      handelEditing(index);
                      setInputEdit(item.task);
                    }}></i>
                  <i className="fa-solid fa-trash trash" onClick={() => handelDelete(index)}></i>
                </div>
                <span className={`poster ${item.tasktype}`}>{item.tasktype}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showodo;
