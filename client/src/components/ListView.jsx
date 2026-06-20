import ListCard from './ListCard';
import CreateList from './CreateList';

function ListView({ lists, onSelect, onCreate, onEdit, onDelete }) {
  return (
    <div>
      <h1>Mis Listas</h1>
      <CreateList onCreate={onCreate} />
      {lists.length === 0 ? (
        <p style={{ color: '#999', marginTop: 40, textAlign: 'center' }}>No hay listas. Crea una para comenzar.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          marginTop: 24,
        }}>
          {lists.map(list => (
            <ListCard
              key={list.id}
              list={list}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListView;
