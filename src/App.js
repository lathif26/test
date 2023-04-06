import React, { useEffect, useState } from "react";
import TodoTable from "./TodoTable";

import { dummy_data } from "./data/dummy";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(dummy_data);
  }, []);

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  function updateTodo(id, updatedTodo) {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <TodoTable
        todos={todos}
        addTodo={addTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
