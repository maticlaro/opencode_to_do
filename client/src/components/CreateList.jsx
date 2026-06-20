import { useState } from 'react';

function CreateList({ onCreate }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nombre de la nueva lista..."
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit">Crear Lista</button>
    </form>
  );
}

export default CreateList;
