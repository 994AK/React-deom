import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    console.log([...tasks, newTask]);
    setTasks([...tasks, newTask]);
  }

  const filterbutton = props.filterbutton.map((props) => (
    <FilterButton
      key={props.id}
      id={props.id}
      name={props.name}
      completed={props.completed}
    />
  ));

  // 监听打勾选的功能
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // 判断勾选的ID是否相同
      if (id === task.id) {
        //如果任务的id属性与id函数提供的属性相匹配
        //创建一个新对象，并checked在返回该对象之前切换该对象的属性
        console.log(task)
        return { ...task,completed:!task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // 删除Todo任务
  function deleteTask(id) {
    //filter 筛选为false不显示
    const remainingTasks = tasks.filter(task=> id !== task.id);
    console.log(remainingTasks);
    setTasks(remainingTasks);
  }


  const tasksList = props.tasks.map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      //完成todo任务
      toggleTaskCompleted={toggleTaskCompleted}
      //删除todo任务
      deleteTask={deleteTask}
    />
  ));

  //计算任务
  const tasksNoun = tasksList.length !== 1 ? "tasks" : "task";
  const headingText = `${tasksList.length} tasks remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {/* FilterButton组件 */}
        {filterbutton}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {/* Todo组件列表渲染 */}
        {tasksList}
      </ul>
    </div>
  );
}

export default App;
