let todos = [];
let nextId = 1;

export const getTodos = () => todos;

export const addTodo = (text) => {
  const todo = { id: nextId++, text, completed: false };
  todos.push(todo);
  return todo;
};

export const updateTodo = (id, updates) => {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return null;
  todos[index] = { ...todos[index], ...updates };
  return todos[index];
};

export const deleteTodo = (id) => {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return null;
  const [deleted] = todos.splice(index, 1);
  return deleted;
};

export const searchTodos = (query, filter) => {
  let result = todos;

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(t => t.text.toLowerCase().includes(q));
  }

  if (filter === 'completed') {
    result = result.filter(t => t.completed);
  } else if (filter === 'pending') {
    result = result.filter(t => !t.completed);
  }

  return result;
};
