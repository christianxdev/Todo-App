import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/form";
import TodoList from "./components/TodoList";

function App() {
  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState();
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Runs Once When The App Starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  //Run when todos, status are modified
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  function filterHandler() {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  //save to local storage/ push to state
  function saveLocalTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  //get from local storage-with refresh
  function getLocalTodos() {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([])); //pass an empty array if we got nothing
    } else {
      let localTodos = JSON.parse(
        localStorage.getItem("todos", JSON.stringify(todos)) //pass our items to the state
      );
      setTodos(localTodos);
    }
  }
  return (
    <div className="App">
      <header>
        <h1>My Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
