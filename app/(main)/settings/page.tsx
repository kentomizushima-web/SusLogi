'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';
import {
  Users,
  Building2,
  CreditCard,
  Bell,
  Shield,
  Gauge,
  ChevronRight,
  Check,
} from 'lucide-react';

type TabType = 'ユーザー管理' | '組織管理' | 'プラン管理' | 'アラート設定' | '通知設定';

const PLANS = [
  {
    name: 'Lite',
    price: '¥50,000',
    period: '/月',
    features: ['拠点数: 1', '車両数: 10台まで', 'データ連携: CSV', 'レポート: 基本'],
    current: false,
  },
  {
    name: 'Standard',
    price: '¥150,000',
    period: '/月',
    features: ['拠点数: 5', '車両数: 50台まで', 'データ連携: API対応', 'CO2算定', 'レポート: 省エネ法対応'],
    current: true,
  },
  {
    name: 'Pro',
    price: '¥300,000',
    period: '/月',
    features: ['拠点数: 無制限', '車両数: 無制限', 'AIシミュレーション', 'CFP算定', 'カスタムレポート'],
    current: false,
  },
  {
    name: 'Enterprise',
    price: 'お問い合わせ',
    period: '',
    features: ['すべてのPro機能', 'SSO/SAML対応', '専任サポート', 'SLA保証', 'オンプレ対応'],
    current: false,
  },
];

const USERS = [
  { name: '山田太郎', email: 'yamada@example.com', role: '管理者', warehouse: '全拠点', lastLogin: '2025-03-14' },
  { name: '鈴木一郎', email: 'suzuki@example.com', role: '編集者', warehouse: '東京物流センター', lastLogin: '2025-03-13' },
  { name: '佐藤花子', email: 'sato@example.com', role: '閲覧者', warehouse: '大阪物流センター', lastLogin: '2025-03-12' },
  { name: '田中次郎', email: 'tanaka@example.com', role: '編集者', warehouse: '名古屋倉庫', lastLogin: '2025-03-10' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ユーザー管理');

  const TABS: { key: TabType; icon: React.ReactNode }[] = [
    { key: 'ユーザー管理', icon: <Users size={14} /> },
    { key: '組織管理', icon: <Building2 size={14} /> },
    { key: 'プラン管理', icon: <CreditCard size={14} /> },
    { key: 'アラート設定', icon: <Gauge size={14} /> },
    { key: '通知設定', icon: <Bell size={14} /> },
  ];

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: '設定' },
      ]}
    >
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A2E]">設定</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">システム設定・ユーザー管理・契約プランを管理します</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          {/* サイドメニュー */}
          <div className="sm:w-48 flex-shrink-0">
            <nav className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-sm transition-all border-b border-[#F3F4F6] last:border-0',
                    activeTab === tab.key
                      ? 'bg-[#F0FBF8] text-[#00C09A] font-medium'
                      : 'text-[#6B7280] hover:bg-[#F8FAFB] hover:text-[#1A1A2E]'
                  )}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.key}</span>
                  {activeTab === tab.key && <ChevronRight size={12} className="ml-auto" />}
                </button>
              ))}
            </nav>
          </div>

          {/* メインコンテンツ */}
          <div className="flex-1 min-w-0">
            {activeTab === 'ユーザー管理' && (
              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
                  <h2 className="text-sm font-semibold text-[#1A1A2E]">ユーザー一覧</h2>
                  <button className="bg-[#00C09A] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#009B7D] transition-colors">
                    ユーザー招待
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FAFB] border-b border-[#E5E7EB]">
                      {['名前', 'メール', '権限', '担当拠点', '最終ログイン', ''].map((h, i) => (
                        <th key={i} className="text-left px-4 py-2.5 text-[#6B7280] font-medium text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((u, i) => (
                      <tr key={i} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFB]">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#0F2B4C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {u.name[0]}
                            </div>
                            <span className="font-medium text-[#1A1A2E]">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#6B7280] text-xs">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            'px-2 py-0.5 rounded-full text-xs font-medium',
                            u.role === '管理者' ? 'bg-[#0F2B4C]/10 text-[#0F2B4C]' :
                              u.role === '編集者' ? 'bg-[#1890FF]/10 text-[#1890FF]' :
                                'bg-[#9CA3AF]/10 text-[#9CA3AF]'
                          )}>
                            {u.role === '管理者' && <Shield size={10} className="inline mr-1" />}
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#6B7280] text-xs">{u.warehouse}</td>
                        <td className="px-4 py-3 text-[#9CA3AF] text-xs font-tabular">{u.lastLogin}</td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-[#6B7280] hover:text-[#0F2B4C] hover:underline">編集</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'プラン管理' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PLANS.map(plan => (
                  <div
                    key={plan.name}
                    className={cn(
                      'bg-white border rounded-xl p-5',
                      plan.current ? 'border-[#00C09A] shadow-[0_0_0_2px_rgba(0,192,154,0.15)]' : 'border-[#E5E7EB]'
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-[#1A1A2E]">{plan.name}</h3>
                        <div className="flex items-baseline gap-0.5 mt-1">
                          <span className="text-xl font-bold font-tabular text-[#1A1A2E]">{plan.price}</span>
                          <span className="text-[#9CA3AF] text-xs">{plan.period}</span>
                        </div>
                      </div>
                      {plan.current && (
                        <span className="bg-[#00C09A] text-white text-xs font-medium px-2 py-0.5 rounded-full">現在のプラン</span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#6B7280]">
                          <Check size={12} className="text-[#00C09A] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {!plan.current && (
                      <button className="w-full mt-4 border border-[#0F2B4C] text-[#0F2B4C] text-sm font-medium py-2 rounded-lg hover:bg-[#0F2B4C] hover:text-white transition-all">
                        {plan.name === 'Enterprise' ? 'お問い合わせ' : 'アップグレード'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'アラート設定' && (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-5">
                <h2 className="text-sm font-semibold text-[#1A1A2E]">アラート閾値設定</h2>
                {[
                  { label: '積載率警告閾値', value: '65', unit: '% 以下でアラート' },
                  { label: '積載率危険閾値', value: '50', unit: '% 以下でアラート' },
                  { label: '実車率警告閾値', value: '70', unit: '% 以下でアラート' },
                  { label: 'CO2前月比増加閾値', value: '5', unit: '% 増加でアラート' },
                  { label: 'データ欠損警告', value: '3', unit: '日連続欠損でアラート' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <label className="text-sm text-[#1A1A2E] min-w-0">{item.label}</label>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <input
                        type="number"
                        defaultValue={item.value}
                        className="border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-sm font-tabular w-20 outline-none focus:ring-2 focus:ring-[#00C09A]"
                      />
                      <span className="text-[#6B7280] text-xs whitespace-nowrap">{item.unit}</span>
                    </div>
                  </div>
                ))}
                <button className="bg-[#00C09A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#009B7D] transition-colors">
                  保存
                </button>
              </div>
            )}

            {activeTab === '通知設定' && (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4">
                <h2 className="text-sm font-semibold text-[#1A1A2E]">通知設定</h2>
                {[
                  { label: 'メール通知', desc: 'アラート発生時にメールで通知', enabled: true },
                  { label: 'Slack通知', desc: 'Slackチャンネルに通知（要連携設定）', enabled: false },
                  { label: 'Teams通知', desc: 'Microsoft Teamsに通知（要連携設定）', enabled: false },
                  { label: '月次レポート自動配信', desc: '月初にサマリーレポートをメール配信', enabled: true },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between p-3 bg-[#F8FAFB] rounded-xl border border-[#E5E7EB]">
                    <div>
                      <p className="text-sm font-medium text-[#1A1A2E]">{n.label}</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      className={cn(
                        'relative w-10 h-5 rounded-full transition-colors',
                        n.enabled ? 'bg-[#00C09A]' : 'bg-[#E5E7EB]'
                      )}
                    >
                      <span className={cn(
                        'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                        n.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      )} />
                    </button>
                  </div>
                ))}
                <button className="bg-[#00C09A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#009B7D] transition-colors">
                  保存
                </button>
              </div>
            )}

            {activeTab === '組織管理' && (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4">
                <h2 className="text-sm font-semibold text-[#1A1A2E]">組織情報</h2>
                {[
                  { label: '会社名', value: '株式会社サンプル物流', type: 'text' },
                  { label: '業種', value: '製造業（荷主）', type: 'text' },
                  { label: '物流担当部署', value: '物流部', type: 'text' },
                  { label: '年間輸送量（トン）', value: '125,000', type: 'text' },
                ].map(field => (
                  <div key={field.label} className="space-y-1.5">
                    <label className="text-xs font-medium text-[#6B7280]">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1A1A2E] outline-none focus:ring-2 focus:ring-[#00C09A]"
                    />
                  </div>
                ))}
                <button className="bg-[#00C09A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#009B7D] transition-colors">
                  保存
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
