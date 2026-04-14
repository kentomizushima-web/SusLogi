'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart2,
  FileInput,
  Database,
  Lightbulb,
  FlaskConical,
  FileText,
  BellRing,
  Settings,
  Leaf,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Truck,
  PackageSearch,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string; icon?: React.ReactNode }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'ダッシュボード', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
  {
    label: '分析',
    icon: <BarChart2 size={18} />,
    children: [
      { label: '積載率・積載効率', href: '/analysis', icon: <TrendingUp size={15} /> },
      { label: 'CO2排出量', href: '/emissions', icon: <Leaf size={15} /> },
    ],
  },
  {
    label: 'データ入力',
    icon: <FileInput size={18} />,
    children: [
      { label: '連携管理', href: '/data', icon: <PackageSearch size={15} /> },
    ],
  },
  { label: 'マスタ管理', href: '/master', icon: <Database size={18} /> },
  { label: '施策管理', href: '/measures', icon: <Lightbulb size={18} /> },
  { label: 'シミュレーション', href: '/simulation', icon: <FlaskConical size={18} /> },
  { label: 'レポート', href: '/reports', icon: <FileText size={18} /> },
  { label: 'アラート', href: '/alerts', icon: <BellRing size={18} /> },
  { label: '設定', href: '/settings', icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(['分析', 'データ入力']);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev =>
      prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      className={cn(
        'flex flex-col h-screen sticky top-0 transition-all duration-300 z-30',
        'bg-[#0F2B4C] border-r border-[#1E3A5F]',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* ロゴ */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#1E3A5F]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00C09A] flex items-center justify-center">
              <Truck size={16} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-wide">SusLogi</span>
              <p className="text-[#9CA3AF] text-[10px] leading-tight">サスロジ</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-[#00C09A] flex items-center justify-center mx-auto">
            <Truck size={16} className="text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#9CA3AF] hover:text-white transition-colors ml-auto"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map(item => {
          if (item.children) {
            const isOpen = openMenus.includes(item.label);
            const childActive = item.children.some(c => isActive(c.href));
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                    childActive
                      ? 'text-[#00C09A] bg-[#00C09A]/10'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left font-medium">{item.label}</span>
                      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </>
                  )}
                </button>
                {!collapsed && isOpen && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#1E3A5F] pl-3">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center gap-2 px-2 py-2 rounded-md text-xs transition-all',
                          isActive(child.href)
                            ? 'text-[#00C09A] bg-[#00C09A]/10 font-medium'
                            : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                        )}
                      >
                        {child.icon}
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                isActive(item.href!)
                  ? 'text-[#00C09A] bg-[#00C09A]/10 font-medium'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* フッター */}
      {!collapsed && (
        <div className="p-4 border-t border-[#1E3A5F]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1A3D6B] flex items-center justify-center text-white text-xs font-bold">
              山
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">山田太郎</p>
              <p className="text-[#9CA3AF] text-[10px] truncate">物流部 責任者</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
