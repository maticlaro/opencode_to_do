import { useState } from 'react';

function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Nueva tarea..."
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddTodo;
