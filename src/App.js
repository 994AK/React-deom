import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

//过滤任务
const FILER_MAP = {
  // 返回true所有All任务
  All: () => true,
  //显示star为false任务
  Active: (task) => !task.completed,
  //显示star为true任务
  Completed: (task) => task.completed,
};

const FILER_NAMES = Object.keys(FILER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  //过滤钩子
  const [filter, setFilter] = useState("All");

  //切换任务
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // 判断勾选的ID是否相同
      if (id === task.id) {
        //如果任务的id属性与id函数提供的属性相匹配
        //创建一个新对象，并checked在返回该对象之前切换该对象的属性
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  //添加Todo
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    console.log([...tasks, newTask]);
    setTasks([...tasks, newTask]);
  }

  // 删除Todo任务
  function deleteTask(id) {
    //filter 筛选为false不显示
    const remainingTasks = tasks.filter((task) => id !== task.id);
    console.log(remainingTasks);
    setTasks(remainingTasks);
  }

  //编写任务名称
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        //返回对象，名称
        return { ...task, name: newName };
      }
      return task;
    });
    console.log(editedTaskList);
    setTasks(editedTaskList);
  }

  //渲染Todo
  const tasksList = tasks
    .filter(FILER_MAP[filter])
    .map((task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        completed={task.completed}
        //完成todo任务
        toggleTaskCompleted={toggleTaskCompleted}
        //删除todo任务
        deleteTask={deleteTask}
        //编写任务名称
        editTask={editTask}
      />
    ));

  //渲染过滤器
  const filterList = FILER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
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
        {filterList}
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
