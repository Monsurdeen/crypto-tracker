import { useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useCoinDetail } from '../hooks/useCoinDetail'
import { formatPrice, formatPercent } from '../utils/formatters'

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '10px 14px',
      }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
        <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '15px' }}>
          {payload[0].value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
      </div>
    )
  }
  return null
}

function CoinDetailModal({ coin, onClose }) {
  const { chartData, loading, error } = useCoinDetail(coin.id)
  const isPositive = coin.price_change_percentage_24h >= 0
  const color = isPositive ? 'var(--positive)' : 'var(--negative)'

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '32px', width: '100%', maxWidth: '680px',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={coin.image} alt={coin.name} width={40} height={40} />
            <div>
              <h2 style={{ margin: 0, fontSize: '22px', color: 'var(--text-primary)' }}>{coin.name}</h2>
              <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '13px' }}>
                {coin.symbol}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}
          >
            ✕
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Current Price</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
              {formatPrice(coin.current_price)}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>24h Change</div>
            <div style={{ fontSize: '20px', fontWeight: '600', color }}>
              {formatPercent(coin.price_change_percentage_24h)}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Market Cap Rank</div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>
              #{coin.market_cap_rank}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '15px', color: 'var(--text-primary)' }}>
            30-Day Price Chart
          </h3>
          {loading && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading chart...</p>}
          {error && <p style={{ color: 'var(--negative)' }}>{error}</p>}
          {!loading && !error && (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="modalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? '#16A34A' : '#DC2626'} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={isPositive ? '#16A34A' : '#DC2626'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                  interval={6}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
                  width={80}
                  axisLine={false}
                  tickLine={false}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? '#16A34A' : '#DC2626'}
                  strokeWidth={2.5}
                  fill="url(#modalGradient)"
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoinDetailModal