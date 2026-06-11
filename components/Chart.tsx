'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface ChartProps {
  data: Array<{ name: string; value: number }>
  title: string
  xAxisLabel?: string
  yAxisLabel?: string
}

export function Chart({ data, title, xAxisLabel, yAxisLabel }: ChartProps) {
  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottomRight', offset: -10 } : undefined} />
          <YAxis label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}