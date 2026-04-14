'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { DATA_CONNECTIONS, IMPORT_HISTORY } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Upload,
  FileSpreadsheet,
  Link2,
  Eye,
  Bot,
  Clock,
} from 'lucide-react';

type TabType = '連携一覧' | '取込み履歴' | 'エラー確認';

const STATUS_CONFIG = {
  active: { label: '接続中', color: 'text-[#92D050]', bg: 'bg-[#92D050]/10', icon: <CheckCircle2 size={14} /> },
  warning: { label: '警告', color: 'text-[#FFEC47]', bg: 'bg-[#FFEC47]/10', icon: <AlertTriangle size={14} /> },
  inactive: { label: '停止', color: 'text-[#9CA3AF]', bg: 'bg-[#9CA3AF]/10', icon: <XCircle size={14} /> },
};

const IMPORT_STATUS = {
  success: { label: '成功', color: 'text-[#92D050]', bg: 'bg-[#92D050]/10' },
  warning: { label: '一部エラー', color: 'text-[#FFEC47]', bg: 'bg-[#FFEC47]/10' },
  error: { label: 'エラー', color: 'text-[#FF4D4F]', bg: 'bg-[#FF4D4F]/10' },
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  api: <Link2 size={20} />,
  file: <FileSpreadsheet size={20} />,
  ocr: <Bot size={20} />,
};

export default function DataPage() {
  const [activeTab, setActiveTab] = useState<TabType>('連携一覧');
  const [dragging, setDragging] = useState(false);

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: 'データ入力' },
        { label: '連携管理' },
      ]}
    >
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A2E]">データ入力・連携管理</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">外部システムとのデータ連携状況を管理します</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex border-b border-[#E5E7EB]">
            {(['連携一覧', '取込み履歴', 'エラー確認'] as TabType[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-5 py-3.5 text-sm font-medium border-b-2 -mb-px transition-all',
                  activeTab === tab
                    ? 'border-[#00C09A] text-[#00C09A]'
                    : 'border-transparent text-[#6B7280] hover:text-[#1A1A2E]'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === '連携一覧' && (
            <div className="p-6 space-y-4">
              {/* 接続カード一覧 */}
              {DATA_CONNECTIONS.map(dc => {
                const status = STATUS_CONFIG[dc.status as keyof typeof STATUS_CONFIG];
                return (
                  <div key={dc.id} className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#00C09A]/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#F0FBF8] flex items-center justify-center text-[#00C09A]">
                      {TYPE_ICONS[dc.type] || <Link2 size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1A1A2E] text-sm">{dc.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                          <Clock size={11} />
                          最終同期: {dc.lastSync}
                        </span>
                        <span className="text-xs text-[#9CA3AF]">
                          {dc.recordCount.toLocaleString()} 件
                        </span>
                        {dc.errorCount > 0 && (
                          <span className="text-xs text-[#FF4D4F]">エラー: {dc.errorCount}件</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', status.bg, status.color)}>
                        {status.icon}
                        {status.label}
                      </span>
                      <button className="p-2 rounded-lg text-[#6B7280] hover:text-[#0F2B4C] hover:bg-[#F8FAFB] transition-colors">
                        <RefreshCw size={15} />
                      </button>
                      <button className="p-2 rounded-lg text-[#6B7280] hover:text-[#0F2B4C] hover:bg-[#F8FAFB] transition-colors">
                        <Eye size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* ファイル取込みエリア */}
              <div
                className={cn(
                  'mt-6 rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer',
                  dragging
                    ? 'border-[#00C09A] bg-[#F0FBF8]'
                    : 'border-[#E5E7EB] hover:border-[#00C09A]/50 hover:bg-[#F8FAFB]'
                )}
                onDragEnter={() => setDragging(true)}
                onDragLeave={() => setDragging(false)}
                onDrop={() => setDragging(false)}
              >
                <div className="w-12 h-12 bg-[#F0FBF8] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload size={22} className="text-[#00C09A]" />
                </div>
                <p className="text-[#1A1A2E] font-medium text-sm">CSVファイルをドロップ</p>
                <p className="text-[#9CA3AF] text-xs mt-1">または</p>
                <button className="mt-2 text-[#00C09A] text-sm font-medium hover:underline">
                  ファイルを選択
                </button>
                <p className="text-[#9CA3AF] text-xs mt-2">CSV, Excel (.xlsx) に対応。最大 50MB</p>
              </div>
            </div>
          )}

          {activeTab === '取込み履歴' && (
            <div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFB] border-b border-[#E5E7EB]">
                    {['日時', 'データ種別', '件数', 'ステータス', 'エラー', ''].map((h, i) => (
                      <th key={i} className="text-left px-4 py-3 text-[#6B7280] font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {IMPORT_HISTORY.map((h, i) => {
                    const status = IMPORT_STATUS[h.status as keyof typeof IMPORT_STATUS];
                    return (
                      <tr key={h.id} className={cn('border-b border-[#F3F4F6] hover:bg-[#F8FAFB]', i % 2 === 0 ? '' : 'bg-[#FAFAFA]')}>
                        <td className="px-4 py-3 font-tabular text-[#6B7280] text-xs">{h.date}</td>
                        <td className="px-4 py-3 font-medium text-[#1A1A2E]">{h.type}</td>
                        <td className="px-4 py-3 font-tabular text-[#1A1A2E]">{h.records.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', status.bg, status.color)}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-tabular text-xs">
                          {h.errors > 0 ? (
                            <span className="text-[#FF4D4F]">{h.errors}件</span>
                          ) : (
                            <span className="text-[#9CA3AF]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-[#6B7280] hover:text-[#0F2B4C] text-xs hover:underline">詳細</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'エラー確認' && (
            <div className="p-6">
              <div className="space-y-3">
                {[
                  { field: '商品コード', value: 'SKU-XXX', message: '商品マスタに存在しないコードです', row: 15, date: '2025-03-13' },
                  { field: '重量', value: '-5.2', message: '負の値は許容されません', row: 23, date: '2025-03-13' },
                  { field: '車番', value: 'YY-9999', message: '車両マスタに存在しない車番です', row: 47, date: '2025-03-13' },
                ].map((err, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-[#FFF2F2] border border-[#FF4D4F]/20 rounded-xl">
                    <XCircle size={16} className="text-[#FF4D4F] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-[#1A1A2E]">行 {err.row}</span>
                        <span className="text-xs text-[#9CA3AF]">|</span>
                        <span className="text-xs text-[#6B7280]">フィールド: {err.field}</span>
                        <span className="text-xs bg-[#F3F4F6] px-1.5 py-0.5 rounded font-tabular">{err.value}</span>
                      </div>
                      <p className="text-sm text-[#FF4D4F]">{err.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-[#1890FF] hover:underline">修正</button>
                      <button className="text-xs text-[#9CA3AF] hover:underline">スキップ</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button className="bg-[#00C09A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#009B7D] transition-colors">
                  修正して再取込み
                </button>
                <button className="border border-[#E5E7EB] text-[#6B7280] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#F8FAFB] transition-colors">
                  エラー行を除外して取込み
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
