'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
} from 'recharts';
import { VEHICLE_SCATTER } from '@/lib/mock-data';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: typeof VEHICLE_SCATTER[0] }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-[#132F4C] border border-[#1E3A5F] rounded-xl p-3 shadow-xl text-xs">
        <p className="text-white font-medium mb-2">{d.vehicleNumber}</p>
        <p className="text-[#8AB4D4] text-[10px] mb-2">{d.type}</p>
        <div className="space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-[#8AB4D4]">積載率:</span>
            <span className="text-[#1890FF] font-tabular font-medium">{d.loadRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#8AB4D4]">実車率:</span>
            <span className="text-[#FFEC47] font-tabular font-medium">{d.vehicleRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#8AB4D4]">積載効率:</span>
            <span className="text-[#00C09A] font-tabular font-medium">{d.loadEfficiency.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function VehicleScatterChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" strokeOpacity={0.5} />
        <XAxis
          dataKey="loadRate"
          type="number"
          name="積載率"
          domain={[55, 90]}
          tick={{ fill: '#8AB4D4', fontSize: 11 }}
          axisLine={{ stroke: '#1E3A5F' }}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          label={{ value: '積載率', position: 'insideBottom', offset: -2, fill: '#8AB4D4', fontSize: 11 }}
        />
        <YAxis
          dataKey="vehicleRate"
          type="number"
          name="実車率"
          domain={[65, 95]}
          tick={{ fill: '#8AB4D4', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          label={{ value: '実車率', angle: -90, position: 'insideLeft', fill: '#8AB4D4', fontSize: 11 }}
        />
        <ZAxis range={[50, 50]} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1E3A5F' }} />
        <ReferenceLine x={65} stroke="#FFEC47" strokeDasharray="4 2" strokeOpacity={0.4} />
        <ReferenceLine y={80} stroke="#FFEC47" strokeDasharray="4 2" strokeOpacity={0.4} />
        <Scatter
          data={VEHICLE_SCATTER}
          fill="#00C09A"
          fillOpacity={0.85}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
