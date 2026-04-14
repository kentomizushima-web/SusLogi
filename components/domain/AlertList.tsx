'use client';

import { AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALERTS } from '@/lib/mock-data';

const ALERT_STYLES = {
  warning: { icon: <AlertTriangle size={14} />, bg: 'bg-yellow-50', border: 'border-yellow-200', iconColor: 'text-yellow-600', dot: 'bg-yellow-400' },
  danger: { icon: <XCircle size={14} />, bg: 'bg-red-50', border: 'border-red-200', iconColor: 'text-red-600', dot: 'bg-red-400' },
  info: { icon: <Info size={14} />, bg: 'bg-blue-50', border: 'border-blue-200', iconColor: 'text-blue-600', dot: 'bg-blue-400' },
  success: { icon: <CheckCircle size={14} />, bg: 'bg-green-50', border: 'border-green-200', iconColor: 'text-green-600', dot: 'bg-green-400' },
};

export default function AlertList() {
  return (
    <div className="space-y-2">
      {ALERTS.map(alert => {
        const style = ALERT_STYLES[alert.type as keyof typeof ALERT_STYLES] || ALERT_STYLES.info;
        return (
          <div
            key={alert.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg border text-sm',
              style.bg,
              style.border
            )}
          >
            <span className={cn('mt-0.5 flex-shrink-0', style.iconColor)}>{style.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[#1A1A2E] text-xs leading-relaxed">{alert.message}</p>
              <p className="text-[#9CA3AF] text-[10px] mt-0.5">{alert.date}</p>
            </div>
            {!alert.read && (
              <span className={cn('w-2 h-2 rounded-full flex-shrink-0 mt-1', style.dot)} />
            )}
          </div>
        );
      })}
    </div>
  );
}
