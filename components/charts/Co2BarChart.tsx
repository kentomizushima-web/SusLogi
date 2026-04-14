'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface Co2BarChartProps {
  data: DataItem[];
  height?: number;
  color?: string;
}

export default function Co2BarChart({ data, height = 200, color = '#00C09A' }: Co2BarChartProps) {
  const COLORS = ['#00C09A', '#1890FF', '#FFEC47', '#FF4D4F', '#722ED1'];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}t`} />
        <Tooltip
          formatter={(value) => [`${value} t-CO2`, 'CO2排出量']}
          contentStyle={{ background: '#1A1A2E', border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 12, color: '#fff' }}
          labelStyle={{ color: '#9CA3AF' }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
