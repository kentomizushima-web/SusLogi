'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';
import {
  FileText,
  FileSpreadsheet,
  Download,
  Send,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  Building2,
  Leaf,
  Truck,
} from 'lucide-react';

const REPORT_TEMPLATES = [
  {
    id: 'R01',
    name: '省エネ法定期報告書',
    desc: 'エネルギー使用量・CO2排出量を省エネ法フォーマットで出力',
    icon: <Leaf size={18} />,
    color: '#92D050',
    bg: 'bg-[#92D050]/10',
    format: ['Excel', 'PDF'],
    lastGenerated: '2025-03-01',
  },
  {
    id: 'R02',
    name: '物効法対応レポート',
    desc: '物流効率化法（物効法）に対応した積載効率報告書',
    icon: <Truck size={18} />,
    color: '#1890FF',
    bg: 'bg-[#1890FF]/10',
    format: ['Excel', 'PDF'],
    lastGenerated: '2025-03-01',
  },
  {
    id: 'R03',
    name: '取引先提出用レポート',
    desc: '荷主向けの積載率・CO2排出量データ',
    icon: <Building2 size={18} />,
    color: '#00C09A',
    bg: 'bg-[#00C09A]/10',
    format: ['PDF'],
    lastGenerated: '2025-02-28',
  },
  {
    id: 'R04',
    name: '月次KPIサマリー',
    desc: '積載効率・実車率・CO2の月次集計レポート',
    icon: <FileText size={18} />,
    color: '#722ED1',
    bg: 'bg-[#722ED1]/10',
    format: ['Excel', 'PDF'],
    lastGenerated: '2025-03-01',
  },
];

const SCHEDULED_REPORTS = [
  { name: '月次KPIサマリー', frequency: '毎月1日 09:00', recipients: '物流部チーム (5名)', status: 'active', next: '2025-04-01' },
  { name: '省エネ法定期報告書', frequency: '四半期末', recipients: '経営層 (3名)', status: 'active', next: '2025-06-30' },
  { name: '取引先提出用レポート', frequency: '毎月末', recipients: 'A社担当者', status: 'paused', next: '—' },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-03');
  const [activeTab, setActiveTab] = useState<'templates' | 'scheduled'>('templates');

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: 'レポート' },
      ]}
    >
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">レポート出力</h1>
            <p className="text-[#6B7280] text-sm mt-0.5">省エネ法・物効法対応レポートをPDF/Excelで出力します</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
              className="border border-[#E5E7EB] text-sm rounded-lg px-3 py-2 text-[#1A1A2E] outline-none bg-white focus:ring-2 focus:ring-[#00C09A]"
            >
              <option value="2025-03">2025年3月</option>
              <option value="2025-02">2025年2月</option>
              <option value="2025-Q1">2025年Q1（1-3月）</option>
              <option value="2024">2024年度</option>
            </select>
          </div>
        </div>

        {/* タブ */}
        <div className="flex border-b border-[#E5E7EB]">
          {[
            { key: 'templates', label: 'レポートテンプレート' },
            { key: 'scheduled', label: '定期配信設定' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={cn(
                'px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-all',
                activeTab === tab.key
                  ? 'border-[#00C09A] text-[#00C09A]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1A1A2E]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REPORT_TEMPLATES.map(r => (
              <div key={r.id} className="bg-white border border-[#E5E7EB] rounded-xl p-5 card-hover">
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', r.bg)}>
                    <span style={{ color: r.color }}>{r.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#1A1A2E] text-sm">{r.name}</h3>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{r.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Clock size={11} className="text-[#9CA3AF]" />
                  <span className="text-[10px] text-[#9CA3AF]">最終生成: {r.lastGenerated}</span>
                </div>

                <div className="flex items-center gap-2">
                  {r.format.map(fmt => (
                    <button
                      key={fmt}
                      className="flex items-center gap-1.5 bg-[#F8FAFB] border border-[#E5E7EB] text-[#6B7280] text-xs font-medium px-3 py-1.5 rounded-lg hover:border-[#00C09A] hover:text-[#00C09A] hover:bg-[#F0FBF8] transition-colors"
                    >
                      {fmt === 'Excel' ? <FileSpreadsheet size={12} /> : <FileText size={12} />}
                      {fmt}出力
                      <Download size={11} />
                    </button>
                  ))}
                  <button className="ml-auto flex items-center gap-1.5 text-[#6B7280] text-xs hover:text-[#1890FF] transition-colors">
                    <Send size={12} />
                    配信
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'scheduled' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFB] border-b border-[#E5E7EB]">
                    {['レポート名', '配信頻度', '配信先', '次回配信', 'ステータス', ''].map((h, i) => (
                      <th key={i} className="text-left px-4 py-3 text-[#6B7280] font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULED_REPORTS.map((r, i) => (
                    <tr key={i} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFB]">
                      <td className="px-4 py-3 font-medium text-[#1A1A2E]">{r.name}</td>
                      <td className="px-4 py-3 text-[#6B7280] text-xs">{r.frequency}</td>
                      <td className="px-4 py-3 text-[#6B7280] text-xs">{r.recipients}</td>
                      <td className="px-4 py-3 text-[#6B7280] text-xs font-tabular">{r.next}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          r.status === 'active' ? 'bg-[#92D050]/10 text-[#92D050]' : 'bg-[#9CA3AF]/10 text-[#9CA3AF]'
                        )}>
                          {r.status === 'active' ? '有効' : '停止中'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs text-[#6B7280] hover:text-[#0F2B4C] hover:underline">編集</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="flex items-center gap-2 bg-[#00C09A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#009B7D] transition-colors">
              <Calendar size={14} />
              定期配信を追加
            </button>
          </div>
        )}

        {/* 出力プレビュー */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4">省エネ法定期報告書 プレビュー</h2>
          <div className="bg-[#F8FAFB] rounded-xl border border-[#E5E7EB] p-6 font-mono text-xs">
            <div className="text-center mb-6">
              <p className="text-base font-bold text-[#1A1A2E]">定期報告書（荷主）</p>
              <p className="text-[#6B7280] mt-1">対象期間: 2024年度（2024年4月〜2025年3月）</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">事業者名</span>
                <span className="text-[#1A1A2E] font-medium">株式会社サンプル物流</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">エネルギー消費量</span>
                <span className="text-[#1A1A2E] font-tabular">2,845 kL（原油換算）</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">CO2排出量（Scope3）</span>
                <span className="text-[#1A1A2E] font-tabular">14,976 t-CO2</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">平均積載効率</span>
                <span className="text-[#00C09A] font-tabular font-bold">62.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">算定方式</span>
                <span className="text-[#1A1A2E]">燃費法</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#E5E7EB]">
              <CheckCircle2 size={14} className="text-[#92D050]" />
              <span className="text-[#92D050] text-xs">省エネ法フォーマット準拠確認済み</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
