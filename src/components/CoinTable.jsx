import CoinRow from './CoinRow'

function CoinTable({ coins, onCoinClick }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E5E7EB', textAlign: 'left', color: '#6B7280', fontSize: '13px' }}>
            <th style={{ padding: '12px 16px' }}>#</th>
            <th style={{ padding: '12px 16px' }}>Coin</th>
            <th style={{ padding: '12px 16px' }}>Price</th>
            <th style={{ padding: '12px 16px' }}>24h %</th>
            <th style={{ padding: '12px 16px' }}>Market Cap</th>
            <th style={{ padding: '12px 16px' }}>7d Chart</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <CoinRow
              key={coin.id}
              coin={coin}
              index={index}
              onClick={onCoinClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoinTable