'use client';

import { Bell, Search, ChevronRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { ALERTS } from '@/lib/mock-data';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
}

export default function Header({ breadcrumbs = [], title }: HeaderProps) {
  const unreadCount = ALERTS.filter(a => !a.read).length;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between">
      {/* パンくずリスト */}
      <div className="flex items-center gap-1 min-w-0">
        {breadcrumbs.length > 0 ? (
          <nav className="flex items-center gap-1 text-sm">
            {breadcrumbs.map((item, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={14} className="text-[#9CA3AF]" />}
                {item.href && i < breadcrumbs.length - 1 ? (
                  <Link href={item.href} className="text-[#6B7280] hover:text-[#0F2B4C] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={i === breadcrumbs.length - 1 ? 'text-[#1A1A2E] font-medium' : 'text-[#6B7280]'}>
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        ) : (
          title && <h1 className="text-lg font-bold text-[#1A1A2E]">{title}</h1>
        )}
      </div>

      {/* 右側アクション */}
      <div className="flex items-center gap-2">
        {/* 検索 */}
        <div className="hidden md:flex items-center gap-2 bg-[#F8FAFB] border border-[#E5E7EB] rounded-lg px-3 py-1.5 w-56">
          <Search size={14} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="検索..."
            className="bg-transparent text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none w-full"
          />
        </div>

        {/* ヘルプ */}
        <button className="p-2 rounded-lg text-[#6B7280] hover:text-[#0F2B4C] hover:bg-[#F8FAFB] transition-all">
          <HelpCircle size={18} />
        </button>

        {/* 通知 */}
        <Link href="/alerts" className="relative p-2 rounded-lg text-[#6B7280] hover:text-[#0F2B4C] hover:bg-[#F8FAFB] transition-all">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF4D4F] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
