import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const BUTTONDATA = [
  { id: 0, name: "Show", completed: true },
  { id: 1, name: "Active", completed: false },
  { id: 2, name: "Completed", completed: false },
];

ReactDOM.render(
  <App tasks={DATA} filterbutton={BUTTONDATA} />,
  document.getElementById("root")
);
