function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
      />
      <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Eliminar</button>
    </li>
  );
}

export default TodoItem;
