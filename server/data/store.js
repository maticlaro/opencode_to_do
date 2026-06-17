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
