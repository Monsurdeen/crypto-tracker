function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search coins..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 16px',
          fontSize: '15px',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export default SearchBar