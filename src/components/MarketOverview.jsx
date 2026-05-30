import { useEffect, useState } from 'react'
import { getGlobalStats } from '../services/coinGecko'
import { formatMarketCap } from '../utils/formatters'

function StatCard({ label, value }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '16px 20px',
      minWidth: '160px',
      flex: 1,
    }}>
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{value}</div>
    </div>
  )
}

function MarketOverview() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getGlobalStats().then(setStats).catch(console.error)
  }, [])

  if (!stats) return null

  const btcDominance = stats.market_cap_percentage?.btc?.toFixed(1)
  const totalMarketCap = formatMarketCap(stats.total_market_cap?.usd)
  const totalVolume = formatMarketCap(stats.total_volume?.usd)
  const activeCryptos = stats.active_cryptocurrencies?.toLocaleString()

  return (
    <div style={{
      display: 'flex', gap: '16px', flexWrap: 'wrap',
      marginBottom: '28px',
    }}>
      <StatCard label="Total Market Cap" value={totalMarketCap} />
      <StatCard label="24h Volume" value={totalVolume} />
      <StatCard label="BTC Dominance" value={`${btcDominance}%`} />
      <StatCard label="Active Cryptos" value={activeCryptos} />
    </div>
  )
}

export default MarketOverview