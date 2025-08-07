import React from 'react';

function DreamFilter({ categories = [], filters, onFilterChange }) {
  const handleDateChange = (e) => {
    onFilterChange({ ...filters, date: e.target.value });
  };

  const handleCategoryChange = (e) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const controlStyle = {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #e0c3fc',
    fontFamily: 'inherit',
    fontSize: '1em',
    minWidth: 120,
    background: 'rgba(255,255,255,0.8)',
    color: '#7e5bef',
    marginLeft: 8
  };

  return (
    <div className="dream-filter" style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', marginBottom: 6 }}>
        Category:
        <select value={filters.category || ''} onChange={handleCategoryChange} style={controlStyle}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 2 }}>
        <label style={{ margin: 0 }}>
          Date:
          <input
            type="date"
            value={filters.date || ''}
            onChange={handleDateChange}
            style={controlStyle}
          />
        </label>
      </div>
    </div>
  );
}

export default DreamFilter;