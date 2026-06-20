import { Router } from 'express';
import { getListTodos, addTodoToList, updateTodoInList, deleteTodoFromList, searchTodosInList, moveTodoToList } from '../data/store.js';

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { q, filter } = req.query;
  const listId = req.params.listId;
  if (q || filter) {
    const todos = await searchTodosInList(listId, q, filter);
    if (!todos) return res.status(404).json({ error: 'List not found' });
    return res.json(todos);
  }
  const todos = await getListTodos(listId);
  if (!todos) return res.status(404).json({ error: 'List not found' });
  res.json(todos);
});

router.post('/', async (req, res) => {
  const listId = req.params.listId;
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  const todo = await addTodoToList(listId, text);
  if (!todo) return res.status(404).json({ error: 'List not found' });
  res.status(201).json(todo);
});

router.put('/:todoId', async (req, res) => {
  const listId = req.params.listId;
  const todoId = req.params.todoId;
  const todo = await updateTodoInList(listId, todoId, req.body);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

router.delete('/:todoId', async (req, res) => {
  const listId = req.params.listId;
  const todoId = req.params.todoId;
  const todo = await deleteTodoFromList(listId, todoId);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

router.post('/:todoId/move', async (req, res) => {
  const fromListId = req.params.listId;
  const todoId = req.params.todoId;
  const { toListId } = req.body;
  if (!toListId) return res.status(400).json({ error: 'toListId is required' });
  const todo = await moveTodoToList(fromListId, toListId, todoId);
  if (!todo) return res.status(404).json({ error: 'Todo or list not found' });
  res.json(todo);
});

export default router;
