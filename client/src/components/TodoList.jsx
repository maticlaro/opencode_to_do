import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit, onMove, allLists, currentListId }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onMove={onMove}
          allLists={allLists}
          currentListId={currentListId}
        />
      ))}
    </ul>
  );
}

export default TodoList;
