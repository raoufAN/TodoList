import "./Todo.css";
import data from "../../data/data";
import { useReducer } from "react";
import SearchTodo from "../searchTodo/SearchTodo";
import Showodo from "../showTodo/ShowTodo";

const taskFromLocalStorage = localStorage.getItem("task");
const initialState =
  taskFromLocalStorage && taskFromLocalStorage !== "[]"
    ? JSON.parse(localStorage.getItem("task"))
    : data;

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const dayStr = new Date(date).toLocaleString("fr-DZ", options).replace(",", "");

  const [day, month, year, time] = dayStr.split(/[/ ]/);
  const formattedDateStr = `${year}/${month}/${day} ${time} `;

  return formattedDateStr;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const addItem = [
        ...state,
        {
          task: action.text,
          tasktype: action.payload,
          date: formatDate(new Date()),
          id: action.id,
          isDone: false,
          drag: false,
        },
      ];
      localStorage.setItem("task", JSON.stringify(addItem));
      return addItem;
    }

    case "done": {
      const doneItem = state.map((element, index) => {
        return index === action.payload
          ? { ...element, isDone: !element.isDone, isEditing: false }
          : element;
      });
      localStorage.setItem("task", JSON.stringify(doneItem));
      return doneItem;
    }

    case "delete": {
      const deleteItem = state.filter((element, index) => index !== action.payload);
      localStorage.setItem("task", JSON.stringify(deleteItem));
      return deleteItem;
    }

    case "deleteAll":
      state = [];
      localStorage.setItem("task", JSON.stringify(state));
      return state;

    case "edit": {
      const editItem = state.map((element, index) => {
        return index === action.payload ? { ...element, isEditing: true } : element;
      });

      localStorage.setItem("task", JSON.stringify(editItem));
      return editItem;
    }
    case "finishEditing": {
      const finishEditing = state.map((element, index) => {
        return index === action.payload
          ? {
              ...element,
              task: action.text,
              tasktype: action.post,
              date: formatDate(new Date()),
              isEditing: false,
            }
          : element;
      });

      localStorage.setItem("task", JSON.stringify(finishEditing));
      return finishEditing;
    }

    case "classment": {
      // Filter out the "Should Do" items first
      let shouldOrderArray = state.filter((element) => element.tasktype === action.payload);

      // Filter out items that are not "Should Do"
      let filterState = state.filter((element) => element.tasktype !== action.payload);

      filterState = [...shouldOrderArray, ...filterState];

      // console.log(filterState);
      return filterState;
    }

    case "classmentWithOrder": {
      let deafaultArray = [...state];
      deafaultArray.sort((a, b) => a.id - b.id);
      return deafaultArray;
    }
    case "classmentWithDate": {
      const timeClassment = state
        .map((elment) => {
          let sec =
            Number(elment.date.split(" ")[2].split(":")[0]) * 60 +
            Number(elment.date.split(" ")[2].split(":")[1]);

          return { ...elment, timeInSeconds: sec };
        })
        .sort((a, b) => a.timeInSeconds - b.timeInSeconds);

      return timeClassment;
    }

    case "classmentWithDrag": {
      return state.map((element) => {
        return { ...element, drag: true };
      });
    }

    case "drop": {
      let { elementIsDrag, targetId } = action.payload;
      // console.log(elementIsDrag, targetId);

      let upadtedState = [...state];
      // splice(startIndex, deleteCount, add(item1, item2, ...))
      let spliceArrayOfElementDrag = upadtedState[elementIsDrag];
      upadtedState[elementIsDrag] = upadtedState[targetId];
      upadtedState[targetId] = spliceArrayOfElementDrag;

      // console.log(upadtedState);

      return upadtedState;
    }

    case "FinishDraging":
      return state.map((element) => {
        return { ...element, drag: false };
      });

    default:
      return state;
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="todo">
      <SearchTodo dispatch={dispatch} state={state} />
      <Showodo data={state} dispatch={dispatch} />
    </div>
  );
};

export default Todo;
