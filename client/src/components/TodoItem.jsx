import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
      />
      {isEditing ? (
        <input
          autoFocus
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: 4, fontSize: 'inherit' }}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {todo.text}
        </span>
      )}
      <button onClick={() => onDelete(todo.id)}>Eliminar</button>
    </li>
  );
}

export default TodoItem;
