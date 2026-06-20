import { useState, useEffect } from 'react';
import ListView from './components/ListView';
import TodoView from './components/TodoView';

function App() {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedListTitle, setSelectedListTitle] = useState('');

  useEffect(() => {
    fetch('/api/lists').then(res => res.json()).then(setLists);
  }, []);

  const createList = async (title) => {
    const res = await fetch('/api/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const list = await res.json();
    setLists([...lists, list]);
  };

  const editList = async (id, title) => {
    const res = await fetch(`/api/lists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const updated = await res.json();
    setLists(lists.map(l => l.id === id ? updated : l));
    if (selectedListId === id) setSelectedListTitle(title);
  };

  const deleteList = async (id) => {
    await fetch(`/api/lists/${id}`, { method: 'DELETE' });
    setLists(lists.filter(l => l.id !== id));
  };

  const selectList = (id) => {
    const list = lists.find(l => l.id === id);
    setSelectedListId(id);
    setSelectedListTitle(list?.title || '');
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>
      {selectedListId ? (
        <TodoView
          listId={selectedListId}
          listTitle={selectedListTitle}
          onBack={() => setSelectedListId(null)}
          allLists={lists}
        />
      ) : (
        <ListView
          lists={lists}
          onSelect={selectList}
          onCreate={createList}
          onEdit={editList}
          onDelete={deleteList}
        />
      )}
    </div>
  );
}

export default App;
