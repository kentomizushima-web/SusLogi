'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { MEASURES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Plus,
  Sparkles,
  Clock,
  User,
  TrendingUp,
  MoreHorizontal,
  CalendarDays,
  ChevronRight,
} from 'lucide-react';

type Status = '起案中' | '検討中' | '実行中' | '完了';
const KANBAN_COLUMNS: Status[] = ['起案中', '検討中', '実行中', '完了'];

const COLUMN_CONFIG = {
  '起案中': { color: '#9CA3AF', bg: 'bg-[#9CA3AF]/10', border: 'border-[#9CA3AF]/20' },
  '検討中': { color: '#FFEC47', bg: 'bg-[#FFEC47]/10', border: 'border-[#FFEC47]/20' },
  '実行中': { color: '#1890FF', bg: 'bg-[#1890FF]/10', border: 'border-[#1890FF]/20' },
  '完了': { color: '#92D050', bg: 'bg-[#92D050]/10', border: 'border-[#92D050]/20' },
};

const PRIORITY_CONFIG = {
  high: { label: '優先度高', color: '#FF4D4F', bg: 'bg-[#FF4D4F]/10' },
  medium: { label: '優先度中', color: '#FFEC47', bg: 'bg-[#FFEC47]/10' },
  low: { label: '優先度低', color: '#9CA3AF', bg: 'bg-[#9CA3AF]/10' },
};

// AIが提案する施策
const AI_SUGGESTIONS = [
  {
    id: 'AI01',
    title: '大阪-福岡便 便数削減と積合わせ提案',
    reason: '大阪→福岡ルートで積載効率55.4%（平均比-6.9pt）を検出。週3便を週2便に削減し、便統合を実施することで積載効率を+8〜12pt改善できる可能性があります。',
    effect: '+9.5pt見込',
    type: '便統合',
  },
  {
    id: 'AI02',
    title: 'W05福岡倉庫 車両ダウンサイジング',
    reason: '福岡倉庫の10t車両は平均積載重量2.1t（積載率21%）で著しく非効率。4t車両への変更で燃費改善とCO2削減が期待できます。',
    effect: 'CO2-15%見込',
    type: '車両変更',
  },
];

export default function MeasuresPage() {
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [measures, setMeasures] = useState(MEASURES);

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: '施策管理' },
      ]}
    >
      <div className="space-y-5">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">施策管理</h1>
            <p className="text-[#6B7280] text-sm mt-0.5">改善施策の起案・進捗・効果測定を一元管理します</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0F2B4C] to-[#1A3D6B] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-[#0F2B4C]/30"
            >
              <Sparkles size={14} className="text-[#FFEC47]" />
              AI施策提案
            </button>
            <button className="flex items-center gap-2 bg-[#00C09A] hover:bg-[#009B7D] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} />
              施策を起案
            </button>
          </div>
        </div>

        {/* AI提案パネル */}
        {showAISuggestions && (
          <div className="bg-gradient-to-r from-[#0F2B4C] to-[#1A3D6B] rounded-xl p-5 border border-[#1E3A5F] animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#FFEC47]" />
              <h2 className="text-white font-semibold text-sm">AIによる施策提案</h2>
              <span className="ml-auto bg-[#FFEC47]/20 text-[#FFEC47] text-xs px-2 py-0.5 rounded font-medium">Beta</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AI_SUGGESTIONS.map(s => (
                <div key={s.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-medium text-sm leading-tight">{s.title}</h3>
                    <span className="bg-[#00C09A]/20 text-[#00C09A] text-xs px-2 py-0.5 rounded flex-shrink-0">{s.type}</span>
                  </div>
                  <p className="text-[#8AB4D4] text-xs leading-relaxed mb-3">{s.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#92D050] text-xs font-medium">
                      <TrendingUp size={11} className="inline mr-1" />
                      {s.effect}
                    </span>
                    <button className="flex items-center gap-1 bg-[#00C09A] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#009B7D] transition-colors">
                      施策として登録
                      <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* カンバンボード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {KANBAN_COLUMNS.map(status => {
            const config = COLUMN_CONFIG[status];
            const columnMeasures = measures.filter(m => m.status === status);
            return (
              <div key={status} className="flex flex-col">
                {/* カラムヘッダー */}
                <div className={cn('flex items-center justify-between px-3 py-2.5 rounded-t-xl border-b-2', config.bg, 'border-b', config.border)}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: config.color }} />
                    <span className="text-sm font-semibold" style={{ color: config.color }}>{status}</span>
                  </div>
                  <span className={cn('text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center', config.bg)} style={{ color: config.color }}>
                    {columnMeasures.length}
                  </span>
                </div>

                {/* カード一覧 */}
                <div className="flex-1 bg-[#F8FAFB] rounded-b-xl border border-t-0 border-[#E5E7EB] p-2 space-y-2 min-h-[200px]">
                  {columnMeasures.map(m => {
                    const priority = PRIORITY_CONFIG[m.priority as keyof typeof PRIORITY_CONFIG];
                    return (
                      <div
                        key={m.id}
                        className="bg-white border border-[#E5E7EB] rounded-xl p-3 cursor-pointer hover:border-[#00C09A]/40 hover:shadow-md transition-all"
                      >
                        {/* ヘッダー */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', priority.bg)} style={{ color: priority.color }}>
                            {priority.label}
                          </span>
                          <button className="text-[#9CA3AF] hover:text-[#6B7280]">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>

                        {/* タイトル */}
                        <h3 className="text-sm font-medium text-[#1A1A2E] leading-tight mb-2">{m.title}</h3>

                        {/* 説明 */}
                        <p className="text-xs text-[#9CA3AF] leading-relaxed mb-3 line-clamp-2">{m.description}</p>

                        {/* フッター */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[#9CA3AF]">
                            <User size={11} />
                            <span className="text-[10px]">{m.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#9CA3AF]">
                            <CalendarDays size={11} />
                            <span className="text-[10px]">{m.deadline}</span>
                          </div>
                        </div>

                        {/* 期待効果 */}
                        <div className="mt-2 flex items-center gap-1 bg-[#F0FBF8] rounded-lg px-2 py-1">
                          <TrendingUp size={10} className="text-[#00C09A]" />
                          <span className="text-[10px] text-[#00C09A] font-medium">期待効果: {m.effect}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* 追加ボタン */}
                  <button className="w-full flex items-center gap-2 p-2 rounded-lg text-[#9CA3AF] hover:text-[#00C09A] hover:bg-[#F0FBF8] transition-colors text-xs">
                    <Plus size={14} />
                    施策を追加
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 効果測定サマリー */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4">完了施策の効果測定</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {measures.filter(m => m.status === '完了').map(m => (
              <div key={m.id} className="flex items-start gap-4 p-4 bg-[#F0FBF8] border border-[#00C09A]/20 rounded-xl">
                <div className="w-8 h-8 bg-[#00C09A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={14} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[#1A1A2E] text-sm">{m.title}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">完了日: {m.deadline}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[#00C09A] text-sm font-bold">{m.effect}</span>
                    <span className="text-[#9CA3AF] text-xs">積載効率改善</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
