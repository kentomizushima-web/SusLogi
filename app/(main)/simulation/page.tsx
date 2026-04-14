'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { SIMULATION_BASE } from '@/lib/mock-data';
import { loadEfficiency } from '@/lib/calculations';
import { cn } from '@/lib/utils';
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Truck,
  Leaf,
  Banknote,
  Package,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

export default function SimulationPage() {
  const [vehicleSizeChange, setVehicleSizeChange] = useState(0); // -2 ~ +2 ton
  const [tripConsolidation, setTripConsolidation] = useState(0); // % reduction
  const [loadRateTarget, setLoadRateTarget] = useState(74.8);
  const [vehicleRateTarget, setVehicleRateTarget] = useState(83.2);
  const [simType, setSimType] = useState<'vehicle' | 'consolidation' | 'custom'>('vehicle');

  // シミュレーション計算
  const baseEfficiency = SIMULATION_BASE.currentLoadEfficiency;
  const baseCo2 = SIMULATION_BASE.currentCo2Monthly;
  const baseCost = SIMULATION_BASE.currentCostMonthly;

  let newLoadRate = loadRateTarget;
  let newVehicleRate = vehicleRateTarget;

  if (simType === 'vehicle') {
    newLoadRate = Math.min(98, loadRateTarget + vehicleSizeChange * 3.5);
    newVehicleRate = vehicleRateTarget;
  } else if (simType === 'consolidation') {
    newVehicleRate = Math.min(98, vehicleRateTarget + tripConsolidation * 0.8);
    newLoadRate = Math.min(98, loadRateTarget + tripConsolidation * 1.2);
  }

  const newEfficiency = loadEfficiency(newLoadRate, newVehicleRate);
  const efficiencyDiff = newEfficiency - baseEfficiency;
  const co2Reduction = baseCo2 * (1 - newEfficiency / baseEfficiency);
  const costReduction = baseCost * (1 - newEfficiency / baseEfficiency);

  const comparisonData = [
    { label: '現状', loadEfficiency: baseEfficiency, loadRate: loadRateTarget, vehicleRate: vehicleRateTarget },
    { label: 'シミュレーション', loadEfficiency: newEfficiency, loadRate: newLoadRate, vehicleRate: newVehicleRate },
  ];

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: 'シミュレーション' },
      ]}
    >
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A2E]">シミュレーション</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">条件を変えて積載効率・CO2削減効果・コスト削減効果を試算します</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* パラメータパネル */}
          <div className="lg:col-span-1 space-y-4">
            {/* シミュレーション種別 */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
              <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3">シミュレーション種別</h2>
              <div className="space-y-2">
                {[
                  { key: 'vehicle', label: '車両サイズ変更', icon: <Truck size={14} /> },
                  { key: 'consolidation', label: '便統合', icon: <Package size={14} /> },
                  { key: 'custom', label: 'カスタム条件', icon: <RefreshCw size={14} /> },
                ].map(s => (
                  <button
                    key={s.key}
                    onClick={() => setSimType(s.key as typeof simType)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all text-left',
                      simType === s.key
                        ? 'border-[#00C09A] bg-[#F0FBF8] text-[#00C09A]'
                        : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#00C09A]/30'
                    )}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* パラメータ入力 */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
              <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4">パラメータ設定</h2>

              {simType === 'vehicle' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#6B7280] block mb-2">
                      車両サイズ変更: {vehicleSizeChange > 0 ? '+' : ''}{vehicleSizeChange}t
                    </label>
                    <input
                      type="range"
                      min="-2"
                      max="4"
                      step="1"
                      value={vehicleSizeChange}
                      onChange={e => setVehicleSizeChange(Number(e.target.value))}
                      className="w-full accent-[#00C09A]"
                    />
                    <div className="flex justify-between text-[10px] text-[#9CA3AF]">
                      <span>-2t (ダウン)</span>
                      <span>現状</span>
                      <span>+4t (アップ)</span>
                    </div>
                  </div>
                </div>
              )}

              {simType === 'consolidation' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#6B7280] block mb-2">
                      便削減率: {tripConsolidation}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="5"
                      value={tripConsolidation}
                      onChange={e => setTripConsolidation(Number(e.target.value))}
                      className="w-full accent-[#00C09A]"
                    />
                    <div className="flex justify-between text-[10px] text-[#9CA3AF]">
                      <span>0% (変更なし)</span>
                      <span>30%削減</span>
                    </div>
                  </div>
                </div>
              )}

              {simType === 'custom' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#6B7280] block mb-2">目標積載率</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={loadRateTarget}
                        onChange={e => setLoadRateTarget(Number(e.target.value))}
                        className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm w-24 font-tabular outline-none focus:ring-2 focus:ring-[#00C09A]"
                        min="0" max="100" step="0.1"
                      />
                      <span className="text-[#6B7280] text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#6B7280] block mb-2">目標実車率</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={vehicleRateTarget}
                        onChange={e => setVehicleRateTarget(Number(e.target.value))}
                        className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm w-24 font-tabular outline-none focus:ring-2 focus:ring-[#00C09A]"
                        min="0" max="100" step="0.1"
                      />
                      <span className="text-[#6B7280] text-sm">%</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                className="w-full mt-4 bg-[#0F2B4C] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#1A3D6B] transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} />
                シミュレーション実行
              </button>
            </div>
          </div>

          {/* 結果パネル */}
          <div className="lg:col-span-2 space-y-4">
            {/* 効果サマリー */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: '積載効率',
                  current: `${baseEfficiency.toFixed(1)}%`,
                  new: `${newEfficiency.toFixed(1)}%`,
                  diff: efficiencyDiff,
                  color: '#00C09A',
                  icon: <TrendingUp size={14} />,
                },
                {
                  label: 'CO2削減量',
                  current: '—',
                  new: `${Math.abs(co2Reduction).toFixed(0)}t`,
                  diff: co2Reduction < 0 ? co2Reduction : -co2Reduction,
                  color: '#92D050',
                  icon: <Leaf size={14} />,
                },
                {
                  label: 'コスト削減',
                  current: '—',
                  new: `¥${Math.abs(costReduction / 10000).toFixed(0)}万`,
                  diff: costReduction < 0 ? costReduction : -costReduction,
                  color: '#1890FF',
                  icon: <Banknote size={14} />,
                },
                {
                  label: '積載率変化',
                  current: `${loadRateTarget.toFixed(1)}%`,
                  new: `${newLoadRate.toFixed(1)}%`,
                  diff: newLoadRate - loadRateTarget,
                  color: '#FFEC47',
                  icon: <TrendingUp size={14} />,
                },
              ].map(r => (
                <div key={r.label} className="bg-white border border-[#E5E7EB] rounded-xl p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <span style={{ color: r.color }}>{r.icon}</span>
                    <span className="text-xs text-[#6B7280]">{r.label}</span>
                  </div>
                  <p className="text-xl font-bold font-tabular" style={{ color: r.color }}>{r.new}</p>
                  {r.diff !== 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      {r.diff > 0 ? (
                        <TrendingUp size={10} className="text-[#92D050]" />
                      ) : (
                        <TrendingDown size={10} className="text-[#FF4D4F]" />
                      )}
                      <span className={`text-xs font-medium ${r.diff > 0 ? 'text-[#92D050]' : 'text-[#FF4D4F]'}`}>
                        {r.diff > 0 ? '+' : ''}{r.diff.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 比較グラフ */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
              <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4">現状 vs シミュレーション 比較</h2>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${v}%`} />
                  <Tooltip
                    formatter={(value) => [`${typeof value === 'number' ? value.toFixed(1) : value}%`]}
                    contentStyle={{ background: '#1A1A2E', border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 12, color: '#fff' }}
                  />
                  <Bar dataKey="loadEfficiency" name="積載効率" radius={[4, 4, 0, 0]}>
                    <Cell fill="#00C09A" />
                    <Cell fill={newEfficiency > baseEfficiency ? '#33D4B3' : '#FF7875'} />
                  </Bar>
                  <Bar dataKey="loadRate" name="積載率" fill="#1890FF" fillOpacity={0.7} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="vehicleRate" name="実車率" fill="#FFEC47" fillOpacity={0.7} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 推奨事項 */}
            {efficiencyDiff > 0 && (
              <div className="bg-[#F0FBF8] border border-[#00C09A]/30 rounded-xl p-4">
                <p className="text-sm font-medium text-[#1A1A2E] mb-1">推奨事項</p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  このシミュレーション条件で積載効率が <strong className="text-[#00C09A]">+{efficiencyDiff.toFixed(1)}pt</strong> 改善されます。
                  月次CO2排出量を <strong className="text-[#92D050]">{Math.abs(co2Reduction).toFixed(0)}t-CO2</strong> 削減でき、
                  物流コストは <strong className="text-[#1890FF]">¥{Math.abs(costReduction / 10000).toFixed(0)}万/月</strong> 削減できる見込みです。
                  施策管理に登録することをお勧めします。
                </p>
                <button className="mt-3 bg-[#00C09A] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#009B7D] transition-colors">
                  施策として登録
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
