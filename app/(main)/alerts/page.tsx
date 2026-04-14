'use client';

import MainLayout from '@/components/layout/MainLayout';
import { ALERTS } from '@/lib/mock-data';
import { AlertTriangle, Info, XCircle, CheckCircle, Filter, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const ALERT_CONFIG = {
  warning: { icon: <AlertTriangle size={16} />, color: 'text-[#B8971F]', bg: 'bg-[#FFFBEB]', border: 'border-[#FFEC47]/40', label: '警告' },
  danger: { icon: <XCircle size={16} />, color: 'text-[#CF1322]', bg: 'bg-[#FFF2F2]', border: 'border-[#FF4D4F]/30', label: '危険' },
  info: { icon: <Info size={16} />, color: 'text-[#096DD9]', bg: 'bg-[#EFF8FF]', border: 'border-[#1890FF]/30', label: '情報' },
  success: { icon: <CheckCircle size={16} />, color: 'text-[#5A9E2F]', bg: 'bg-[#F6FFED]', border: 'border-[#92D050]/30', label: '完了' },
};

export default function AlertsPage() {
  const unreadAlerts = ALERTS.filter(a => !a.read);
  const readAlerts = ALERTS.filter(a => a.read);

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: 'アラート' },
      ]}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">アラート</h1>
            <p className="text-[#6B7280] text-sm mt-0.5">未読 {unreadAlerts.length}件 / 全 {ALERTS.length}件</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 border border-[#E5E7EB] text-sm rounded-lg px-3 py-2 text-[#6B7280] hover:bg-[#F8FAFB] transition-colors">
              <Filter size={14} />
              フィルタ
            </button>
            <button className="flex items-center gap-2 border border-[#E5E7EB] text-sm rounded-lg px-3 py-2 text-[#6B7280] hover:bg-[#F8FAFB] transition-colors">
              <Check size={14} />
              すべて既読
            </button>
          </div>
        </div>

        {unreadAlerts.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">未読</h2>
            <div className="space-y-2">
              {unreadAlerts.map(alert => {
                const config = ALERT_CONFIG[alert.type as keyof typeof ALERT_CONFIG] || ALERT_CONFIG.info;
                return (
                  <div key={alert.id} className={cn('flex items-start gap-4 p-4 rounded-xl border', config.bg, config.border)}>
                    <span className={cn('mt-0.5 flex-shrink-0', config.color)}>{config.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded', config.bg, config.color)}>
                          {config.label}
                        </span>
                        <span className="text-[#9CA3AF] text-xs">{alert.date}</span>
                      </div>
                      <p className="text-[#1A1A2E] text-sm">{alert.message}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#FF4D4F]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">既読</h2>
          <div className="space-y-2">
            {readAlerts.map(alert => {
              const config = ALERT_CONFIG[alert.type as keyof typeof ALERT_CONFIG] || ALERT_CONFIG.info;
              return (
                <div key={alert.id} className="flex items-start gap-4 p-4 rounded-xl border border-[#F3F4F6] bg-white opacity-70">
                  <span className={cn('mt-0.5 flex-shrink-0', config.color)}>{config.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#9CA3AF]">{config.label}</span>
                      <span className="text-[#9CA3AF] text-xs">{alert.date}</span>
                    </div>
                    <p className="text-[#6B7280] text-sm">{alert.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
