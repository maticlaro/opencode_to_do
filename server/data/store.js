let lists = [];
let nextListId = 1;
let nextTodoId = 1;

// Lists CRUD
export const getLists = () => lists.map(({ id, title, todos }) => ({ id, title, count: todos.length }));

export const getList = (id) => lists.find(l => l.id === id) || null;

export const createList = (title) => {
  const list = { id: nextListId++, title, todos: [] };
  lists.push(list);
  return { id: list.id, title: list.title, count: 0 };
};

export const updateList = (id, title) => {
  const list = lists.find(l => l.id === id);
  if (!list) return null;
  list.title = title;
  return { id: list.id, title: list.title, count: list.todos.length };
};

export const deleteList = (id) => {
  const index = lists.findIndex(l => l.id === id);
  if (index === -1) return null;
  const [deleted] = lists.splice(index, 1);
  return { id: deleted.id, title: deleted.title };
};

// Todos within a list
export const getListTodos = (listId) => {
  const list = lists.find(l => l.id === listId);
  return list ? list.todos : null;
};

export const addTodoToList = (listId, text) => {
  const list = lists.find(l => l.id === listId);
  if (!list) return null;
  const todo = { id: nextTodoId++, text, completed: false };
  list.todos.push(todo);
  return todo;
};

export const updateTodoInList = (listId, todoId, updates) => {
  const list = lists.find(l => l.id === listId);
  if (!list) return null;
  const todo = list.todos.find(t => t.id === todoId);
  if (!todo) return null;
  Object.assign(todo, updates);
  return todo;
};

export const deleteTodoFromList = (listId, todoId) => {
  const list = lists.find(l => l.id === listId);
  if (!list) return null;
  const index = list.todos.findIndex(t => t.id === todoId);
  if (index === -1) return null;
  const [deleted] = list.todos.splice(index, 1);
  return deleted;
};

export const searchTodosInList = (listId, query, filter) => {
  const list = lists.find(l => l.id === listId);
  if (!list) return null;
  let result = list.todos;
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
