'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface DataItem {
  name: string;
  loadEfficiency: number;
  loadRate: number;
  vehicleRate: number;
}

interface AnalysisBarChartProps {
  data: DataItem[];
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A2E] border border-[#E5E7EB] rounded-xl p-3 shadow-xl text-xs">
        <p className="text-[#6B7280] mb-2 font-medium">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-sm" style={{ background: p.color }} />
            <span className="text-[#9CA3AF]">{p.name}:</span>
            <span className="text-white font-medium font-tabular">{p.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalysisBarChart({ data, height = 300 }: AnalysisBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
        <Legend wrapperStyle={{ fontSize: 11, color: '#6B7280', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <ReferenceLine y={65} stroke="#FFEC47" strokeDasharray="4 2" strokeOpacity={0.6}
          label={{ value: '目標65%', position: 'right', fill: '#B8971F', fontSize: 10 }} />
        <Bar dataKey="loadEfficiency" name="積載効率" fill="#00C09A" radius={[4, 4, 0, 0]} />
        <Bar dataKey="loadRate" name="積載率" fill="#1890FF" fillOpacity={0.75} radius={[4, 4, 0, 0]} />
        <Bar dataKey="vehicleRate" name="実車率" fill="#FFEC47" fillOpacity={0.8} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
