import { AreaChart, Area, ResponsiveContainer } from 'recharts'

function SparklineChart({ data, isPositive }) {
  const chartData = data?.map((price) => ({ price })) || []
  const color = isPositive ? '#16A34A' : '#DC2626'
  const gradientId = `gradient-${isPositive ? 'pos' : 'neg'}`

  return (
    <ResponsiveContainer width={120} height={50}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SparklineChart