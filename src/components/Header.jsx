function Header({ isDark, onToggle, lastUpdated }) {
  return (
    <header style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)' }}>
          📈 CryptoTrack Pro
        </h1>
        {lastUpdated && (
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
      <button
        onClick={onToggle}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '8px 16px',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  )
}

export default Header