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
  Cell,
  ReferenceLine,
} from 'recharts';
import { WAREHOUSE_PERFORMANCE } from '@/lib/mock-data';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#132F4C] border border-[#1E3A5F] rounded-xl p-3 shadow-xl text-xs">
        <p className="text-[#8AB4D4] mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-sm" style={{ background: p.color }} />
            <span className="text-[#8AB4D4]">{p.name}:</span>
            <span className="text-white font-medium font-tabular">{p.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const COLORS = ['#00C09A', '#33D4B3', '#009B7D', '#00A888', '#007D66'];

export default function WarehouseBarChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={WAREHOUSE_PERFORMANCE} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.6} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
        <Legend
          wrapperStyle={{ fontSize: 11, color: '#6B7280', paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />
        <ReferenceLine y={65} stroke="#FFEC47" strokeDasharray="4 2" strokeOpacity={0.6}
          label={{ value: '目標65%', position: 'right', fill: '#B8971F', fontSize: 10 }} />
        <Bar dataKey="loadEfficiency" name="積載効率" radius={[4, 4, 0, 0]}>
          {WAREHOUSE_PERFORMANCE.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
        <Bar dataKey="loadRate" name="積載率" fill="#1890FF" fillOpacity={0.6} radius={[4, 4, 0, 0]} />
        <Bar dataKey="vehicleRate" name="実車率" fill="#FFEC47" fillOpacity={0.7} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
