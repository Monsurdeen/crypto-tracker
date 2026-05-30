import { useState, useMemo, useEffect } from 'react'
import { useCoinData } from './hooks/useCoinData'
import Header from './components/Header'
import MarketOverview from './components/MarketOverview'
import CoinTable from './components/CoinTable'
import SearchBar from './components/SearchBar'
import CoinDetailModal from './components/CoinDetailModal'

function App() {
  const { coins, loading, error, lastUpdated } = useCoinData()
  const [search, setSearch] = useState('')
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [isDark, setIsDark] = useState(false)

  // Apply dark mode to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const filteredCoins = useMemo(() => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
  }, [coins, search])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Header
        isDark={isDark}
        onToggle={() => setIsDark(!isDark)}
        lastUpdated={lastUpdated}
      />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <MarketOverview />
        <SearchBar value={search} onChange={setSearch} />

        {loading && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px' }}>
            Loading market data...
          </p>
        )}
        {error && (
          <p style={{ textAlign: 'center', color: 'var(--negative)', padding: '40px' }}>
            {error}
          </p>
        )}
        {!loading && !error && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <CoinTable coins={filteredCoins} onCoinClick={setSelectedCoin} />
          </div>
        )}
      </main>

      {selectedCoin && (
        <CoinDetailModal
          coin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </div>
  )
}

export default App