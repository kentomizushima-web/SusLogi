'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Co2BarChart from '@/components/charts/Co2BarChart';
import LoadRateLineChart from '@/components/charts/LoadRateLineChart';
import { CO2_DATA, MONTHLY_KPI } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Leaf, TrendingDown, FileText, ExternalLink, Info } from 'lucide-react';

const CO2_TREND_DATA = MONTHLY_KPI.map(m => ({
  label: m.label,
  co2: m.co2,
}));

export default function EmissionsPage() {
  const [calcMethod, setCalcMethod] = useState<'fuel' | 'improvedTonKm' | 'tonKm'>('fuel');

  const methodLabels = {
    fuel: '燃費法',
    improvedTonKm: '改良トンキロ法',
    tonKm: 'トンキロ法',
  };

  const totalCo2 = CO2_DATA.byMethod[calcMethod];

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: '分析' },
        { label: 'CO2排出量' },
      ]}
    >
      <div className="space-y-5">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">CO2排出量算定</h1>
            <p className="text-[#6B7280] text-sm mt-0.5">Scope3 カテゴリ4・9対応。省エネ法・物効法レポート向け算定。</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#F0FBF8] border border-[#00C09A]/30 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00C09A]" />
              <span className="text-[#00C09A] text-xs font-medium">EcoNiPass 連携予定</span>
            </div>
            <button className="flex items-center gap-2 border border-[#E5E7EB] text-sm rounded-lg px-3 py-2 text-[#6B7280] hover:bg-[#F8FAFB] transition-colors">
              <FileText size={14} />
              レポート出力
            </button>
          </div>
        </div>

        {/* 算定方式選択 */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info size={14} className="text-[#6B7280]" />
            <p className="text-xs text-[#6B7280]">算定方式によってCO2排出量の計算結果が異なります。省エネ法定期報告には燃費法を推奨します。</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(['fuel', 'improvedTonKm', 'tonKm'] as const).map(m => (
              <button
                key={m}
                onClick={() => setCalcMethod(m)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all border',
                  calcMethod === m
                    ? 'bg-[#0F2B4C] text-white border-[#0F2B4C]'
                    : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0F2B4C]/30'
                )}
              >
                {methodLabels[m]}
              </button>
            ))}
          </div>
        </div>

        {/* KPIカード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#0F2B4C] to-[#1A3D6B] rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={16} className="text-[#00C09A]" />
              <span className="text-[#8AB4D4] text-xs">総CO2排出量（月次）</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold font-tabular">{totalCo2.toLocaleString()}</span>
              <span className="text-sm text-[#8AB4D4]">t-CO2</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown size={12} className="text-[#92D050]" />
              <span className="text-[#92D050] text-xs font-medium">-4.8%</span>
              <span className="text-[#8AB4D4] text-xs">前月比</span>
            </div>
            <p className="text-[#8AB4D4] text-[10px] mt-2">算定方式: {methodLabels[calcMethod]}</p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
            <p className="text-[#6B7280] text-xs mb-3">前年同月比較</p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold font-tabular text-[#92D050]">-8.3%</span>
            </div>
            <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
              <div className="h-full bg-[#92D050] rounded-full" style={{ width: '91.7%' }} />
            </div>
            <p className="text-[#9CA3AF] text-xs mt-2">前年: {(totalCo2 * 1.09).toFixed(0)} t-CO2</p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
            <p className="text-[#6B7280] text-xs mb-3">削減目標達成率</p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold font-tabular text-[#1890FF]">83%</span>
            </div>
            <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
              <div className="h-full bg-[#1890FF] rounded-full" style={{ width: '83%' }} />
            </div>
            <p className="text-[#9CA3AF] text-xs mt-2">年間目標: -10% 達成見込: -8.3%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* 月次推移 */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4">CO2排出量 月次推移</h2>
            <LoadRateLineChart
              data={CO2_TREND_DATA}
              lines={[{ key: 'co2', name: 'CO2排出量 (t-CO2)', color: '#00C09A' }]}
              height={220}
              yDomain={[1100, 1500]}
            />
          </div>

          {/* 拠点別 */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4">拠点別CO2排出量</h2>
            <Co2BarChart data={CO2_DATA.byWarehouse} height={220} />
          </div>
        </div>

        {/* 製品別CFP */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#1A1A2E]">製品別 CO2排出量（CFP）</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">走行距離・車両・トンキロ案分で製品1個あたりのCO2を算定</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-[#1890FF] hover:underline">
              <ExternalLink size={12} />
              CFPレポート
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  {['製品名', 'CO2排出量', '単位', '比較（t-CO2換算）'].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[#6B7280] font-medium text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CO2_DATA.perProduct.map((p, i) => (
                  <tr key={i} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFB]">
                    <td className="px-3 py-3 font-medium text-[#1A1A2E]">{p.product}</td>
                    <td className="px-3 py-3 font-tabular font-bold text-[#00C09A]">{p.co2}</td>
                    <td className="px-3 py-3 text-[#6B7280] text-xs">{p.unit}</td>
                    <td className="px-3 py-3">
                      <div className="w-32 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00C09A] to-[#33D4B3] rounded-full"
                          style={{ width: `${Math.min(p.co2 / 3 * 100, 100)}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 省エネ法ビュー */}
        <div className="bg-[#F0FBF8] border border-[#00C09A]/30 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <FileText size={18} className="text-[#00C09A] mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-[#1A1A2E]">省エネ法定期報告書フォーマット</h2>
              <p className="text-xs text-[#6B7280] mt-1">算定したCO2データを省エネ法の定期報告書フォーマットに変換できます。</p>
              <div className="flex gap-2 mt-3">
                <button className="bg-[#0F2B4C] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#1A3D6B] transition-colors">
                  レポートプレビュー
                </button>
                <button className="border border-[#0F2B4C] text-[#0F2B4C] text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                  Excel出力
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
