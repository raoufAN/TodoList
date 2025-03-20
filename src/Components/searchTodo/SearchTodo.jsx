import "./searchTodo.css";
import { useState } from "react";

const dataValueLI = ["Must Do", "Should Do", "Could Do", "If I Have Time", "none"];

//* eslint-disable react/prop-types */
const SearchTodo = ({ dispatch, state }) => {
  const [showList, setShowList] = useState(false);
  const [typeTask, setTaskType] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeTask === "") {
      alert("You need select task type");
      return;
    }
    if (inputValue === "") {
      alert("You need to write your task bro");
      return;
    }
    dispatch({ type: "add", payload: typeTask, text: inputValue, id: state.length + 1 });
    setTaskType("");
    setInputValue("");
  };
  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="todo-input">
        <label htmlFor="todo">Write Your Todo : </label>
        <input
          type="text"
          id="todo"
          placeholder="Write Your Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="todo-type">
        <label>choose type of task :</label>
        <ul
          className={
            showList ? "todo-select selected" : typeTask ? "todo-select selected" : "todo-select"
          }
          onClick={() => setShowList(!showList)}>
          <li className="first">
            {typeTask === "" ? "Please Choose An Option" : typeTask}
            {showList ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </li>
          {showList && (
            <div className="wrapper-list">
              {dataValueLI.map((data, index) => (
                <li
                  data-value={data}
                  key={index}
                  className="list-option"
                  onClick={() => {
                    setTaskType(data);
                  }}>
                  {data}
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>

      <button type="submit">add tasks</button>
    </form>
  );
};

export default SearchTodo;
