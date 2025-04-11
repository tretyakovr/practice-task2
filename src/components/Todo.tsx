import React, { useState, FormEvent } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Todo.scss";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoProps {
  toggleTheme?: () => void;
}

const Todo: React.FC<TodoProps> = ({ toggleTheme }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь добавить логику добавления задачи
    setTasks([...tasks, {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      text: inputValue,
      completed: false
    }]);
    setInputValue("");
  };

  const deleteTask = (e: React.MouseEvent<HTMLElement>) => {
    let id = Number(e.currentTarget.dataset.id);
    setTasks(tasks.filter(item => item.id !== id));
  };

  const toggleTaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let id = Number(e.currentTarget.dataset.id);
    let index = tasks.findIndex(item => item.id === id);

    let changedTask: Task[] = [{
      id: tasks[index].id,
      text: tasks[index].text,
      completed: !tasks[index].completed
    }];

    setTasks(tasks.slice(0, index).concat(changedTask, tasks.slice(index + 1)));
  }

  return (
    <div className='todo-container'>
      <div className='todo-header'>
        <h1>Список задач</h1>
        <ThemeToggle onClick={toggleTheme} />
      </div>

      <form className='input-section' onSubmit={handleSubmit}>
        <input
          type='text'
          className='task-input'
          placeholder='Введите новую задачу'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit' className='add-button'>
          Добавить
        </button>
      </form>

      <div className='tasks-list'>{/* Здесь должны отображаться задачи */}
        <ul>
          {tasks.map(item =>
          (<li key={item.id} style={{ listStyleType: 'none' }}>
            <input type='checkbox' checked={item.completed} data-id={item.id}
              onChange={(e) => toggleTaskStatus(e)}></input>
            <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>
              {item.text}
            </span>
            <button onClick={(e) => deleteTask(e)} data-id={item.id}>x</button>
          </li>))}
        </ul>
      </div>
    </div >
  );
};

export default Todo;
