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
  ReferenceLine,
} from 'recharts';
import { MONTHLY_KPI } from '@/lib/mock-data';

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
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[#8AB4D4]">{p.name}:</span>
            <span className="text-white font-medium font-tabular">{p.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function LoadEfficiencyChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={MONTHLY_KPI} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" strokeOpacity={0.5} />
        <XAxis
          dataKey="label"
          tick={{ fill: '#8AB4D4', fontSize: 11 }}
          axisLine={{ stroke: '#1E3A5F' }}
          tickLine={false}
        />
        <YAxis
          domain={[40, 100]}
          tick={{ fill: '#8AB4D4', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11, color: '#8AB4D4', paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />
        <ReferenceLine y={65} stroke="#FFEC47" strokeDasharray="4 2" strokeOpacity={0.6}
          label={{ value: '目標65%', position: 'right', fill: '#FFEC47', fontSize: 10 }} />
        <Line
          type="monotone"
          dataKey="loadEfficiency"
          name="積載効率"
          stroke="#00C09A"
          strokeWidth={2.5}
          dot={{ fill: '#00C09A', r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#33D4B3' }}
        />
        <Line
          type="monotone"
          dataKey="loadRate"
          name="積載率（実効）"
          stroke="#1890FF"
          strokeWidth={2}
          strokeDasharray="5 3"
          dot={false}
          activeDot={{ r: 4, fill: '#1890FF' }}
        />
        <Line
          type="monotone"
          dataKey="vehicleRate"
          name="実車率"
          stroke="#FFEC47"
          strokeWidth={2}
          strokeDasharray="3 3"
          dot={false}
          activeDot={{ r: 4, fill: '#FFEC47' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
