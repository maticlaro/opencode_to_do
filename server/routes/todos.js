import { Router } from 'express';
import { getListTodos, addTodoToList, updateTodoInList, deleteTodoFromList, searchTodosInList } from '../data/store.js';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
  const { q, filter } = req.query;
  const listId = Number(req.params.listId);
  if (q || filter) {
    const todos = searchTodosInList(listId, q, filter);
    if (!todos) return res.status(404).json({ error: 'List not found' });
    return res.json(todos);
  }
  const todos = getListTodos(listId);
  if (!todos) return res.status(404).json({ error: 'List not found' });
  res.json(todos);
});

router.post('/', (req, res) => {
  const listId = Number(req.params.listId);
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  const todo = addTodoToList(listId, text);
  if (!todo) return res.status(404).json({ error: 'List not found' });
  res.status(201).json(todo);
});

router.put('/:todoId', (req, res) => {
  const listId = Number(req.params.listId);
  const todoId = Number(req.params.todoId);
  const todo = updateTodoInList(listId, todoId, req.body);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

router.delete('/:todoId', (req, res) => {
  const listId = Number(req.params.listId);
  const todoId = Number(req.params.todoId);
  const todo = deleteTodoFromList(listId, todoId);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

export default router;
