'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  label: string;
  [key: string]: number | string;
}

interface LoadRateLineChartProps {
  data: DataPoint[];
  lines: { key: string; name: string; color: string; dashed?: boolean }[];
  height?: number;
  yDomain?: [number, number];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A2E] border border-[#E5E7EB] rounded-xl p-3 shadow-xl text-xs">
        <p className="text-[#6B7280] mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[#9CA3AF]">{p.name}:</span>
            <span className="text-white font-medium font-tabular">{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function LoadRateLineChart({ data, lines, height = 280, yDomain = [40, 100] }: LoadRateLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="label" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis domain={yDomain} tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, color: '#6B7280', paddingTop: 8 }} iconType="circle" iconSize={8} />
        {lines.map(l => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.name}
            stroke={l.color}
            strokeWidth={2}
            strokeDasharray={l.dashed ? '5 3' : undefined}
            dot={{ fill: l.color, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
