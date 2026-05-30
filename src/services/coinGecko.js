import axios from 'axios'

const BASE_URL = 'https://api.coingecko.com/api/v3'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// Get top 50 coins with sparkline data
export const getMarkets = async (page = 1) => {
  const { data } = await api.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 50,
      page,
      sparkline: true,
      price_change_percentage: '24h',
    },
  })
  return data
}

// Get global market stats
export const getGlobalStats = async () => {
  const { data } = await api.get('/global')
  return data.data
}

// Get 30-day price history for a coin
export const getCoinChart = async (id) => {
  const { data } = await api.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: 30,
    },
  })
  return data
}