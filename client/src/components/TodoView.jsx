import { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import SearchBar from './SearchBar';
import TodoList from './TodoList';

function TodoView({ listId, listTitle, onBack }) {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTodos = async () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filter !== 'all') params.set('filter', filter);
    const res = await fetch(`/api/lists/${listId}/todos?${params}`);
    setTodos(await res.json());
  };

  useEffect(() => {
    fetchTodos();
  }, [listId, query, filter]);

  const addTodo = async (text) => {
    const res = await fetch(`/api/lists/${listId}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`/api/lists/${listId}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  const editTodo = async (id, text) => {
    const res = await fetch(`/api/lists/${listId}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/lists/${listId}/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, marginBottom: 16 }}>
        ← Volver a listas
      </button>
      <h1>{listTitle}</h1>
      <AddTodo onAdd={addTodo} />
      <SearchBar query={query} filter={filter} onQueryChange={setQuery} onFilterChange={setFilter} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
    </div>
  );
}

export default TodoView;
