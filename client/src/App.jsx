import { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import SearchBar from './components/SearchBar';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTodos = async () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filter !== 'all') params.set('filter', filter);
    const res = await fetch(`/api/todos?${params}`);
    setTodos(await res.json());
  };

  useEffect(() => {
    fetchTodos();
  }, [query, filter]);

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

  const editTodo = async (id, text) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
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
      <h1>Lista de Tareas</h1>
      <AddTodo onAdd={addTodo} />
      <SearchBar query={query} filter={filter} onQueryChange={setQuery} onFilterChange={setFilter} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
    </div>
  );
}

export default App;
