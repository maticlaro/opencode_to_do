import { List } from '../models/List.js';

// Lists CRUD
export const getLists = async () => {
  const lists = await List.find().sort({ createdAt: -1 });
  return lists.map(l => ({ id: l._id, title: l.title, count: l.todos.length }));
};

export const getList = async (id) => {
  return await List.findById(id);
};

export const createList = async (title) => {
  const list = await List.create({ title, todos: [] });
  return { id: list._id, title: list.title, count: 0 };
};

export const updateList = async (id, title) => {
  const list = await List.findByIdAndUpdate(id, { title }, { new: true });
  if (!list) return null;
  return { id: list._id, title: list.title, count: list.todos.length };
};

export const deleteList = async (id) => {
  const list = await List.findByIdAndDelete(id);
  if (!list) return null;
  return { id: list._id, title: list.title };
};

// Todos within a list
export const getListTodos = async (listId) => {
  const list = await List.findById(listId);
  if (!list) return null;
  return list.todos.map(t => ({ id: t._id, text: t.text, completed: t.completed }));
};

export const addTodoToList = async (listId, text) => {
  const list = await List.findById(listId);
  if (!list) return null;
  const todo = list.todos.create({ text, completed: false });
  list.todos.push(todo);
  await list.save();
  return { id: todo._id, text: todo.text, completed: todo.completed };
};

export const updateTodoInList = async (listId, todoId, updates) => {
  const list = await List.findById(listId);
  if (!list) return null;
  const todo = list.todos.id(todoId);
  if (!todo) return null;
  if (updates.text !== undefined) todo.text = updates.text;
  if (updates.completed !== undefined) todo.completed = updates.completed;
  await list.save();
  return { id: todo._id, text: todo.text, completed: todo.completed };
};

export const deleteTodoFromList = async (listId, todoId) => {
  const list = await List.findById(listId);
  if (!list) return null;
  const todo = list.todos.id(todoId);
  if (!todo) return null;
  const result = { id: todo._id, text: todo.text, completed: todo.completed };
  list.todos.pull(todoId);
  await list.save();
  return result;
};

export const moveTodoToList = async (fromListId, toListId, todoId) => {
  const fromList = await List.findById(fromListId);
  const toList = await List.findById(toListId);
  if (!fromList || !toList) return null;
  const todo = fromList.todos.id(todoId);
  if (!todo) return null;
  const todoData = { text: todo.text, completed: todo.completed };
  fromList.todos.pull(todoId);
  toList.todos.push(todoData);
  await fromList.save();
  await toList.save();
  return { id: todo._id, text: todoData.text, completed: todoData.completed };
};

export const searchTodosInList = async (listId, query, filter) => {
  const list = await List.findById(listId);
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
  return result.map(t => ({ id: t._id, text: t.text, completed: t.completed }));
};
