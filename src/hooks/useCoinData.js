import { useState, useEffect, useCallback } from 'react'
import { getMarkets } from '../services/coinGecko'

const REFRESH_INTERVAL = 60000 // 60 seconds

export const useCoinData = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchCoins = useCallback(async () => {
    try {
      setError(null)
      const data = await getMarkets()
      setCoins(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError('Failed to fetch data. Retrying...')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCoins()
    const interval = setInterval(fetchCoins, REFRESH_INTERVAL)
    return () => clearInterval(interval) // cleanup on unmount
  }, [fetchCoins])

  return { coins, loading, error, lastUpdated, refresh: fetchCoins }
}