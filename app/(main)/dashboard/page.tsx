'use client';

import MainLayout from '@/components/layout/MainLayout';
import KPICard from '@/components/domain/KPICard';
import AlertList from '@/components/domain/AlertList';
import LoadEfficiencyChart from '@/components/charts/LoadEfficiencyChart';
import VehicleScatterChart from '@/components/charts/VehicleScatterChart';
import WarehouseBarChart from '@/components/charts/WarehouseBarChart';
import { CURRENT_KPI, MEASURES } from '@/lib/mock-data';
import {
  TrendingUp,
  Gauge,
  Truck,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

const STATUS_CONFIG = {
  '実行中': { icon: <Clock size={12} />, color: 'text-[#1890FF]', bg: 'bg-[#1890FF]/10' },
  '完了': { icon: <CheckCircle2 size={12} />, color: 'text-[#92D050]', bg: 'bg-[#92D050]/10' },
  '検討中': { icon: <AlertCircle size={12} />, color: 'text-[#FFEC47]', bg: 'bg-[#FFEC47]/10' },
  '起案中': { icon: <AlertCircle size={12} />, color: 'text-[#9CA3AF]', bg: 'bg-[#9CA3AF]/10' },
};

export default function DashboardPage() {
  return (
    <MainLayout
      breadcrumbs={[{ label: 'SusLogi' }, { label: 'ダッシュボード' }]}
    >
      <div className="dark-dashboard min-h-[calc(100vh-8rem)] -m-6 p-6">
        {/* ページタイトル */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">ダッシュボード</h1>
            <p className="text-[#8AB4D4] text-sm mt-0.5">2025年3月 — 全拠点サマリー</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-[#132F4C] border border-[#1E3A5F] text-[#8AB4D4] text-sm rounded-lg px-3 py-2 outline-none">
              <option>2025年3月</option>
              <option>2025年2月</option>
              <option>2025年1月</option>
            </select>
            <select className="bg-[#132F4C] border border-[#1E3A5F] text-[#8AB4D4] text-sm rounded-lg px-3 py-2 outline-none">
              <option>全拠点</option>
              <option>東京物流センター</option>
              <option>名古屋倉庫</option>
              <option>大阪物流センター</option>
            </select>
          </div>
        </div>

        {/* KPIカード群 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard
            dark
            title="平均積載効率"
            value={`${CURRENT_KPI.loadEfficiency}`}
            unit="%"
            change={CURRENT_KPI.loadEfficiencyChange}
            changeLabel="pt"
            icon={<Gauge size={16} />}
          />
          <KPICard
            dark
            title="平均積載率（実効）"
            value={`${CURRENT_KPI.effectiveLoadRate}`}
            unit="%"
            change={CURRENT_KPI.effectiveLoadRateChange}
            changeLabel="pt"
            icon={<TrendingUp size={16} />}
          />
          <KPICard
            dark
            title="平均実車率"
            value={`${CURRENT_KPI.vehicleRate}`}
            unit="%"
            change={CURRENT_KPI.vehicleRateChange}
            changeLabel="pt"
            icon={<Truck size={16} />}
          />
          <KPICard
            dark
            title="CO2排出量（月次）"
            value={`${CURRENT_KPI.co2Monthly.toLocaleString()}`}
            unit="t-CO2"
            change={CURRENT_KPI.co2MonthlyChange}
            changeLabel="%"
            icon={<Leaf size={16} />}
          />
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 月次推移グラフ */}
          <div className="lg:col-span-2 bg-[#132F4C] border border-[#1E3A5F] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-semibold text-sm">積載効率 月次推移</h2>
                <p className="text-[#8AB4D4] text-xs mt-0.5">過去12ヶ月の推移</p>
              </div>
              <Link href="/analysis" className="text-[#00C09A] text-xs flex items-center gap-1 hover:underline">
                詳細分析 <ArrowRight size={12} />
              </Link>
            </div>
            <LoadEfficiencyChart />
          </div>

          {/* アラート */}
          <div className="bg-[#132F4C] border border-[#1E3A5F] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-sm">アラート</h2>
              <Link href="/alerts" className="text-[#00C09A] text-xs flex items-center gap-1 hover:underline">
                すべて見る <ArrowRight size={12} />
              </Link>
            </div>
            <AlertList />
          </div>

          {/* 車両別散布図 */}
          <div className="bg-[#132F4C] border border-[#1E3A5F] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-semibold text-sm">積載率 vs 実車率</h2>
                <p className="text-[#8AB4D4] text-xs mt-0.5">車両別分布</p>
              </div>
            </div>
            <VehicleScatterChart />
          </div>

          {/* 拠点別棒グラフ */}
          <div className="bg-[#132F4C] border border-[#1E3A5F] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-semibold text-sm">拠点別積載効率</h2>
                <p className="text-[#8AB4D4] text-xs mt-0.5">2025年3月実績</p>
              </div>
              <Link href="/analysis" className="text-[#00C09A] text-xs flex items-center gap-1 hover:underline">
                詳細 <ArrowRight size={12} />
              </Link>
            </div>
            <WarehouseBarChart />
          </div>

          {/* 施策ステータス */}
          <div className="bg-[#132F4C] border border-[#1E3A5F] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-sm">施策ステータス</h2>
              <Link href="/measures" className="text-[#00C09A] text-xs flex items-center gap-1 hover:underline">
                詳細 <ArrowRight size={12} />
              </Link>
            </div>

            {/* サマリー */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: '実行中', count: 1, color: '#1890FF' },
                { label: '検討中', count: 1, color: '#FFEC47' },
                { label: '完了', count: 2, color: '#92D050' },
              ].map(s => (
                <div key={s.label} className="bg-[#0F2B4C] rounded-lg p-2 text-center">
                  <p className="text-xl font-bold font-tabular" style={{ color: s.color }}>{s.count}</p>
                  <p className="text-[#8AB4D4] text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* 施策リスト */}
            <div className="space-y-2">
              {MEASURES.slice(0, 4).map(m => {
                const cfg = STATUS_CONFIG[m.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG['起案中'];
                return (
                  <div key={m.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-[#0F2B4C]">
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium flex-shrink-0 mt-0.5 ${cfg.bg} ${cfg.color}`}>
                      {cfg.icon}
                      {m.status}
                    </span>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-medium leading-tight truncate">{m.title}</p>
                      <p className="text-[#00C09A] text-[10px] mt-0.5 font-tabular">期待効果: {m.effect}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
