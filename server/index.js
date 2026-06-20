import express from 'express';
import cors from 'cors';
import listsRouter from './routes/lists.js';
import todosRouter from './routes/todos.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/lists', listsRouter);
app.use('/api/lists/:listId/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
