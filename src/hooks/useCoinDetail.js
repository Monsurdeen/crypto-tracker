import { useState, useEffect } from 'react'
import { getCoinChart } from '../services/coinGecko'

export const useCoinDetail = (coinId) => {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!coinId) return
    setLoading(true)
    getCoinChart(coinId)
      .then((data) => {
        const formatted = data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: parseFloat(price.toFixed(2)),
        }))
        setChartData(formatted)
      })
      .catch(() => setError('Failed to load chart'))
      .finally(() => setLoading(false))
  }, [coinId])

  return { chartData, loading, error }
}