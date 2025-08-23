import React, { useState } from "react";

const TodoList = () => {
  // ✅ initial state with some demo todos
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: true },
    { id: 3, text: "Master Fullstack Dev", completed: false },
  ]);

  // ✅ Add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // ✅ Toggle completed state
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ✅ Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      {/* Simple add form for now */}
      <button onClick={() => addTodo("New Todo")}>+ Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)} // toggle when clicked
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
            <button
              style={{ marginLeft: "10px" }}
              onClick={(e) => {
                e.stopPropagation(); // prevent toggle when deleting
                deleteTodo(todo.id);
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
