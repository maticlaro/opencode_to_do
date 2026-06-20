import { Router } from 'express';
import { getTodos, addTodo, updateTodo, deleteTodo, searchTodos } from '../data/store.js';

const router = Router();

router.get('/', (req, res) => {
  const { q, filter } = req.query;
  if (q || filter) {
    return res.json(searchTodos(q, filter));
  }
  res.json(getTodos());
});

router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  res.status(201).json(addTodo(text));
});

router.put('/:id', (req, res) => {
  const todo = updateTodo(Number(req.params.id), req.body);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const todo = deleteTodo(Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

export default router;
