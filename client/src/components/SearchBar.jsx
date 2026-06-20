import { useState } from 'react';

function SearchBar({ query, filter, onQueryChange, onFilterChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
        placeholder="Buscar tareas..."
        style={{ width: '100%', padding: 8, marginBottom: 8, boxSizing: 'border-box' }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        {['all', 'pending', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            style={{
              flex: 1,
              padding: 6,
              backgroundColor: filter === f ? '#333' : '#eee',
              color: filter === f ? '#fff' : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendientes' : 'Completados'}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
