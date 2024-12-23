import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./todo";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
// uuidv4();

const TodoWraper = () => {
  const loadTodos = () => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  };
  const [todos, setTodos] = useState(loadTodos());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "uncompleted") {
      return !todo.completed;
    }
    return true; // 'all' case
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done</h1>
      <TodoForm addTodo={addTodo} handleFilterChange={handleFilterChange} />
      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};

export default TodoWraper;
