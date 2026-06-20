import { Router } from 'express';
import { getLists, createList, updateList, deleteList } from '../data/store.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(getLists());
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  res.status(201).json(createList(title));
});

router.put('/:id', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const list = updateList(Number(req.params.id), title);
  if (!list) return res.status(404).json({ error: 'List not found' });
  res.json(list);
});

router.delete('/:id', (req, res) => {
  const list = deleteList(Number(req.params.id));
  if (!list) return res.status(404).json({ error: 'List not found' });
  res.json(list);
});

export default router;
