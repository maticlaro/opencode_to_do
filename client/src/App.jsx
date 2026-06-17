import { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async (text) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>TODO List</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
