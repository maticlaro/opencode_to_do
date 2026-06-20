import { useState } from 'react';

function ListCard({ list, onSelect, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  const handleSave = () => {
    if (title.trim()) {
      onEdit(list.id, title.trim());
      setIsEditing(false);
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      cursor: 'pointer',
      transition: 'box-shadow 0.2s',
    }}
      onClick={() => !isEditing && onSelect(list.id)}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {isEditing ? (
        <input
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') { setTitle(list.title); setIsEditing(false); }
          }}
          onClick={e => e.stopPropagation()}
          style={{ width: '100%', fontSize: 16, padding: 4, marginBottom: 8, boxSizing: 'border-box' }}
        />
      ) : (
        <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{list.title}</h3>
      )}
      <p style={{ margin: 0, color: '#666', fontSize: 14 }}>{list.count} tareas</p>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
        <button onClick={() => setIsEditing(true)} style={{ fontSize: 12 }}>Editar</button>
        <button onClick={() => onDelete(list.id)} style={{ fontSize: 12, color: 'red' }}>Eliminar</button>
      </div>
    </div>
  );
}

export default ListCard;
