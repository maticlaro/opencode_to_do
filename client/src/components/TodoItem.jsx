import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit, onMove, allLists, currentListId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showMove, setShowMove] = useState(false);

  const otherLists = allLists.filter(l => l.id !== currentListId);

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
      {showMove && otherLists.length > 0 && (
        <select
          autoFocus
          defaultValue=""
          onChange={e => {
            onMove(todo.id, Number(e.target.value));
            setShowMove(false);
          }}
          onBlur={() => setShowMove(false)}
          style={{ fontSize: 12, padding: 2 }}
        >
          <option value="" disabled>Mover a...</option>
          {otherLists.map(l => (
            <option key={l.id} value={l.id}>{l.title}</option>
          ))}
        </select>
      )}
      {otherLists.length > 0 && (
        <button onClick={() => setShowMove(!showMove)} style={{ fontSize: 12 }}>Mover</button>
      )}
      <button onClick={() => onDelete(todo.id)}>Eliminar</button>
    </li>
  );
}

export default TodoItem;
