'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnalysisBarChart from '@/components/charts/AnalysisBarChart';
import LoadRateLineChart from '@/components/charts/LoadRateLineChart';
import VehicleScatterChart from '@/components/charts/VehicleScatterChart';
import {
  WAREHOUSE_PERFORMANCE,
  VEHICLE_SCATTER,
  MONTHLY_KPI,
} from '@/lib/mock-data';
import { getLoadRateLabel } from '@/lib/calculations';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

type ViewMode = '拠点別' | '車両別' | '時系列' | '重量/容積比較';

const VEHICLE_DATA = VEHICLE_SCATTER.map(v => ({
  name: v.vehicleNumber,
  loadEfficiency: v.loadEfficiency,
  loadRate: v.loadRate,
  vehicleRate: v.vehicleRate,
}));

const WAREHOUSE_DATA = WAREHOUSE_PERFORMANCE.map(w => ({
  name: w.name,
  loadEfficiency: w.loadEfficiency,
  loadRate: w.loadRate,
  vehicleRate: w.vehicleRate,
}));

// 容積 vs 重量のダミーデータ
const WEIGHT_VOLUME_DATA = MONTHLY_KPI.map(m => ({
  label: m.label,
  weightLoadRate: m.weightLoadRate,
  volumeLoadRate: m.volumeLoadRate,
  effectiveLoadRate: m.loadRate,
}));

export default function AnalysisPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('拠点別');
  const [period, setPeriod] = useState('2025-03');
  const [benchmarkOpen, setBenchmarkOpen] = useState(false);

  const currentKPI = {
    loadEfficiency: 62.3,
    loadRate: 74.8,
    vehicleRate: 83.2,
    industryAvgLoadEfficiency: 55.0,
    industryAvgLoadRate: 68.0,
  };

  const loadRateInfo = getLoadRateLabel(currentKPI.loadRate);

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: '分析' },
        { label: '積載率・積載効率' },
      ]}
    >
      <div className="space-y-5">
        {/* ページヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">積載率・積載効率 分析</h1>
            <p className="text-[#6B7280] text-sm mt-0.5">全拠点・全車両の積載状況を多角的に分析します</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="border border-[#E5E7EB] text-sm rounded-lg px-3 py-2 text-[#1A1A2E] outline-none bg-white focus:ring-2 focus:ring-[#00C09A]"
            >
              <option value="2025-03">2025年3月</option>
              <option value="2025-02">2025年2月</option>
              <option value="2025-01">2025年1月</option>
              <option value="2024-12">2024年12月</option>
            </select>
            <select className="border border-[#E5E7EB] text-sm rounded-lg px-3 py-2 text-[#1A1A2E] outline-none bg-white focus:ring-2 focus:ring-[#00C09A]">
              <option>全拠点</option>
              <option>東京物流センター</option>
              <option>名古屋倉庫</option>
              <option>大阪物流センター</option>
            </select>
          </div>
        </div>

        {/* サマリーKPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: '積載効率', value: currentKPI.loadEfficiency, unit: '%', prev: 59.1, color: '#00C09A', desc: '積載率 × 実車率' },
            { label: '積載率（実効）', value: currentKPI.loadRate, unit: '%', prev: 73.3, color: '#1890FF', desc: 'max(重量積載率, 容積積載率)' },
            { label: '実車率', value: currentKPI.vehicleRate, unit: '%', prev: 81.1, color: '#FFEC47', desc: '実車距離 ÷ 総走行距離' },
          ].map(kpi => {
            const diff = kpi.value - kpi.prev;
            const { label: evalLabel, color: evalColor } = getLoadRateLabel(kpi.value);
            return (
              <div key={kpi.label} className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#6B7280] text-xs font-medium">{kpi.label}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{kpi.desc}</p>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ background: `${evalColor}20`, color: evalColor }}
                  >
                    {evalLabel}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-tabular" style={{ color: kpi.color }}>
                    {kpi.value.toFixed(1)}
                  </span>
                  <span className="text-sm text-[#6B7280]">{kpi.unit}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {diff > 0 ? (
                    <TrendingUp size={12} className="text-[#92D050]" />
                  ) : (
                    <TrendingDown size={12} className="text-[#FF4D4F]" />
                  )}
                  <span className={`text-xs font-medium ${diff > 0 ? 'text-[#92D050]' : 'text-[#FF4D4F]'}`}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}pt
                  </span>
                  <span className="text-[#9CA3AF] text-xs">前月比</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 切り口タブ */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex border-b border-[#E5E7EB] overflow-x-auto">
            {(['拠点別', '車両別', '時系列', '重量/容積比較'] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  'px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px',
                  viewMode === mode
                    ? 'border-[#00C09A] text-[#00C09A]'
                    : 'border-transparent text-[#6B7280] hover:text-[#1A1A2E]'
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="p-5">
            {viewMode === '拠点別' && (
              <div>
                <p className="text-sm text-[#6B7280] mb-4">各拠点の積載効率・積載率・実車率を比較します</p>
                <AnalysisBarChart data={WAREHOUSE_DATA} height={300} />
                {/* 拠点詳細テーブル */}
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB]">
                        {['拠点', '積載効率', '積載率', '実車率', 'CO2(t)'].map(h => (
                          <th key={h} className="text-left px-3 py-2 text-[#6B7280] font-medium text-xs">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {WAREHOUSE_PERFORMANCE.map(w => {
                        const { label, color } = getLoadRateLabel(w.loadEfficiency);
                        return (
                          <tr key={w.warehouseId} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFB]">
                            <td className="px-3 py-3 font-medium text-[#1A1A2E]">{w.name}</td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                                  <div className="h-full rounded-full bg-[#00C09A]" style={{ width: `${w.loadEfficiency}%` }} />
                                </div>
                                <span className="font-tabular text-[#1A1A2E]">{w.loadEfficiency.toFixed(1)}%</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${color}20`, color }}>{label}</span>
                              </div>
                            </td>
                            <td className="px-3 py-3 font-tabular text-[#1890FF]">{w.loadRate.toFixed(1)}%</td>
                            <td className="px-3 py-3 font-tabular text-[#B8971F]">{w.vehicleRate.toFixed(1)}%</td>
                            <td className="px-3 py-3 font-tabular text-[#6B7280]">{w.co2}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {viewMode === '車両別' && (
              <div>
                <p className="text-sm text-[#6B7280] mb-4">各車両の積載効率・積載率・実車率を比較します</p>
                <AnalysisBarChart data={VEHICLE_DATA} height={300} />
                <div className="mt-5">
                  <h3 className="text-sm font-medium text-[#1A1A2E] mb-3">積載率 vs 実車率 散布図</h3>
                  <VehicleScatterChart />
                </div>
              </div>
            )}

            {viewMode === '時系列' && (
              <div>
                <p className="text-sm text-[#6B7280] mb-4">月次の積載効率・積載率・実車率の推移を表示します</p>
                <LoadRateLineChart
                  data={MONTHLY_KPI}
                  lines={[
                    { key: 'loadEfficiency', name: '積載効率', color: '#00C09A' },
                    { key: 'loadRate', name: '積載率（実効）', color: '#1890FF', dashed: true },
                    { key: 'vehicleRate', name: '実車率', color: '#FFEC47', dashed: true },
                  ]}
                  height={300}
                />
              </div>
            )}

            {viewMode === '重量/容積比較' && (
              <div>
                <div className="flex items-start gap-2 mb-4 p-3 bg-[#F0FBF8] rounded-lg border border-[#00C09A]/20">
                  <Info size={14} className="text-[#00C09A] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#1A1A2E]">
                    <strong>実効積載率</strong> = max(重量積載率, 容積積載率)。
                    どちらのリソースが制約になっているかを把握し、荷姿変更や車両変更の最適化に活用します。
                  </p>
                </div>
                <LoadRateLineChart
                  data={WEIGHT_VOLUME_DATA}
                  lines={[
                    { key: 'weightLoadRate', name: '重量積載率', color: '#1890FF' },
                    { key: 'volumeLoadRate', name: '容積積載率', color: '#00C09A' },
                    { key: 'effectiveLoadRate', name: '実効積載率', color: '#FF4D4F', dashed: true },
                  ]}
                  height={300}
                />
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: '重量制約が支配的な月', value: '3ヶ月', desc: '重量積載率 > 容積積載率', color: '#1890FF' },
                    { label: '容積制約が支配的な月', value: '9ヶ月', desc: '容積積載率 > 重量積載率', color: '#00C09A' },
                    { label: '改善余地（容積）', value: '+8.3pt', desc: '容積活用で積載率向上可能', color: '#FF4D4F' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#F8FAFB] rounded-lg p-3 border border-[#E5E7EB]">
                      <p className="text-xs text-[#6B7280]">{s.label}</p>
                      <p className="text-xl font-bold font-tabular mt-1" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ベンチマーク比較 */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
          <button
            className="w-full flex items-center justify-between"
            onClick={() => setBenchmarkOpen(!benchmarkOpen)}
          >
            <h2 className="text-sm font-semibold text-[#1A1A2E]">業界ベンチマーク比較</h2>
            <span className="text-[#00C09A] text-xs">{benchmarkOpen ? '閉じる' : '開く'}</span>
          </button>
          {benchmarkOpen && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: '積載効率', own: currentKPI.loadEfficiency, industry: currentKPI.industryAvgLoadEfficiency, unit: '%' },
                { label: '積載率', own: currentKPI.loadRate, industry: currentKPI.industryAvgLoadRate, unit: '%' },
              ].map(b => (
                <div key={b.label} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6B7280]">{b.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#00C09A] font-medium">自社: {b.own}{b.unit}</span>
                      <span className="text-[#9CA3AF]">業界平均: {b.industry}{b.unit}</span>
                    </div>
                  </div>
                  <div className="relative h-6 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-[#00C09A]/30 rounded-full" style={{ width: `${b.industry}%` }} />
                    <div className="absolute inset-y-0 left-0 bg-[#00C09A] rounded-full flex items-center justify-end pr-2" style={{ width: `${b.own}%` }}>
                      <span className="text-white text-[10px] font-bold">{b.own}%</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#92D050]">
                    業界平均比 +{(b.own - b.industry).toFixed(1)}{b.unit} 上回っています
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
