'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  accent?: boolean;
  dark?: boolean;
}

export default function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon,
  accent = false,
  dark = false,
}: KPICardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change !== undefined && change === 0;

  return (
    <div
      className={cn(
        'rounded-xl p-5 card-hover transition-all',
        dark
          ? 'bg-[#132F4C] border border-[#1E3A5F]'
          : accent
          ? 'bg-gradient-to-br from-[#00C09A] to-[#009B7D] text-white'
          : 'bg-white border border-[#E5E7EB]'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={cn(
            'text-xs font-medium',
            dark ? 'text-[#8AB4D4]' : accent ? 'text-white/80' : 'text-[#6B7280]'
          )}
        >
          {title}
        </span>
        {icon && (
          <div
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center',
              dark ? 'bg-[#1A3D6B]' : accent ? 'bg-white/20' : 'bg-[#F0FBF8]'
            )}
          >
            <span className={cn('text-[#00C09A]', accent && 'text-white')}>{icon}</span>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span
          className={cn(
            'text-3xl font-bold font-tabular tracking-tight',
            dark ? 'text-white' : accent ? 'text-white' : 'text-[#1A1A2E]'
          )}
        >
          {value}
        </span>
        {unit && (
          <span
            className={cn(
              'text-sm font-medium',
              dark ? 'text-[#8AB4D4]' : accent ? 'text-white/80' : 'text-[#6B7280]'
            )}
          >
            {unit}
          </span>
        )}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1">
          <span
            className={cn(
              'flex items-center gap-0.5 text-xs font-medium',
              accent
                ? isPositive
                  ? 'text-white/90'
                  : isNegative
                  ? 'text-red-200'
                  : 'text-white/60'
                : isPositive
                ? 'text-[#92D050]'
                : isNegative
                ? 'text-[#FF4D4F]'
                : 'text-[#9CA3AF]'
            )}
          >
            {isPositive && <TrendingUp size={12} />}
            {isNegative && <TrendingDown size={12} />}
            {isNeutral && <Minus size={12} />}
            {change > 0 ? '+' : ''}{change}
            {changeLabel && <span className="ml-0.5 text-[10px] opacity-75">{changeLabel}</span>}
          </span>
          <span
            className={cn(
              'text-[10px]',
              dark ? 'text-[#8AB4D4]' : accent ? 'text-white/60' : 'text-[#9CA3AF]'
            )}
          >
            前月比
          </span>
        </div>
      )}
    </div>
  );
}
