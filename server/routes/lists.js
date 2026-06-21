import { Router } from 'express';
import { getLists, createList, updateList, deleteList } from '../services/store.js';

const router = Router();

router.get('/', async (req, res) => {
  res.json(await getLists());
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  res.status(201).json(await createList(title));
});

router.put('/:id', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const list = await updateList(req.params.id, title);
  if (!list) return res.status(404).json({ error: 'List not found' });
  res.json(list);
});

router.delete('/:id', async (req, res) => {
  const list = await deleteList(req.params.id);
  if (!list) return res.status(404).json({ error: 'List not found' });
  res.json(list);
});

export default router;
