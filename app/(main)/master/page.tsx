'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PRODUCTS, VEHICLES, WAREHOUSES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Plus, Search, Edit2, Trash2, ChevronUp, ChevronDown, Filter } from 'lucide-react';

type TabType = '商品' | '車両' | '拠点' | '算定ルール' | '予算';

export default function MasterPage() {
  const [activeTab, setActiveTab] = useState<TabType>('車両');
  const [searchQuery, setSearchQuery] = useState('');

  const TABS: TabType[] = ['商品', '車両', '拠点', '算定ルール', '予算'];

  return (
    <MainLayout
      breadcrumbs={[
        { label: 'ダッシュボード', href: '/dashboard' },
        { label: 'マスタ管理' },
      ]}
    >
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">マスタ管理</h1>
            <p className="text-[#6B7280] text-sm mt-0.5">各種マスタデータの参照・編集を行います</p>
          </div>
          <button className="flex items-center gap-2 bg-[#00C09A] hover:bg-[#009B7D] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus size={16} />
            新規追加
          </button>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          {/* タブ */}
          <div className="flex border-b border-[#E5E7EB] overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all',
                  activeTab === tab
                    ? 'border-[#00C09A] text-[#00C09A]'
                    : 'border-transparent text-[#6B7280] hover:text-[#1A1A2E]'
                )}
              >
                {tab}マスタ
              </button>
            ))}
          </div>

          {/* ツールバー */}
          <div className="flex items-center gap-3 p-4 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2 bg-[#F8FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 flex-1 max-w-xs">
              <Search size={14} className="text-[#9CA3AF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="検索..."
                className="bg-transparent text-sm text-[#1A1A2E] outline-none w-full placeholder-[#9CA3AF]"
              />
            </div>
            <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#6B7280] hover:bg-[#F8FAFB] transition-colors">
              <Filter size={14} />
              フィルタ
            </button>
          </div>

          {/* コンテンツ */}
          <div className="overflow-x-auto">
            {activeTab === '車両' && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFB] border-b border-[#E5E7EB]">
                    {['', '車番', '型式', '最大積載重量', '最大容積', '燃費', '拠点', ''].map((h, i) => (
                      <th key={i} className="text-left px-4 py-3 text-[#6B7280] font-medium text-xs">
                        {h && (
                          <div className="flex items-center gap-1">
                            {h}
                            <div className="flex flex-col">
                              <ChevronUp size={10} className="text-[#9CA3AF] -mb-0.5" />
                              <ChevronDown size={10} className="text-[#9CA3AF]" />
                            </div>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VEHICLES.filter(v =>
                    searchQuery === '' || v.number.includes(searchQuery) || v.type.includes(searchQuery)
                  ).map((v, i) => (
                    <tr key={v.id} className={cn('border-b border-[#F3F4F6] hover:bg-[#F8FAFB] transition-colors', i % 2 === 0 ? '' : 'bg-[#FAFAFA]')}>
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded border-[#E5E7EB]" />
                      </td>
                      <td className="px-4 py-3 font-medium text-[#1A1A2E] font-tabular">{v.number}</td>
                      <td className="px-4 py-3 text-[#6B7280]">{v.type}</td>
                      <td className="px-4 py-3 font-tabular text-[#1A1A2E]">{v.maxWeight.toLocaleString()} kg</td>
                      <td className="px-4 py-3 font-tabular text-[#1A1A2E]">{v.maxVolume} m³</td>
                      <td className="px-4 py-3 font-tabular text-[#1A1A2E]">{v.fuelEfficiency} km/L</td>
                      <td className="px-4 py-3 text-[#6B7280]">
                        <span className="px-2 py-0.5 bg-[#F0FBF8] text-[#00C09A] text-xs rounded">
                          {WAREHOUSES.find(w => w.id === v.warehouseId)?.name.split(' ')[0] || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded text-[#6B7280] hover:text-[#0F2B4C] hover:bg-[#F0F9FF] transition-colors">
                            <Edit2 size={14} />
                          </button>
                          <button className="p-1.5 rounded text-[#6B7280] hover:text-[#FF4D4F] hover:bg-[#FFF2F2] transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === '拠点' && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFB] border-b border-[#E5E7EB]">
                    {['', 'ID', '名称', '都道府県', '住所', '緯度', '経度', ''].map((h, i) => (
                      <th key={i} className="text-left px-4 py-3 text-[#6B7280] font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {WAREHOUSES.filter(w =>
                    searchQuery === '' || w.name.includes(searchQuery) || w.address.includes(searchQuery)
                  ).map((w, i) => (
                    <tr key={w.id} className={cn('border-b border-[#F3F4F6] hover:bg-[#F8FAFB] transition-colors', i % 2 === 0 ? '' : 'bg-[#FAFAFA]')}>
                      <td className="px-4 py-3"><input type="checkbox" className="rounded border-[#E5E7EB]" /></td>
                      <td className="px-4 py-3 font-tabular text-[#6B7280] text-xs">{w.id}</td>
                      <td className="px-4 py-3 font-medium text-[#1A1A2E]">{w.name}</td>
                      <td className="px-4 py-3 text-[#6B7280]">{w.prefecture}</td>
                      <td className="px-4 py-3 text-[#6B7280] text-xs">{w.address}</td>
                      <td className="px-4 py-3 font-tabular text-[#9CA3AF] text-xs">{w.lat}</td>
                      <td className="px-4 py-3 font-tabular text-[#9CA3AF] text-xs">{w.lng}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded text-[#6B7280] hover:text-[#0F2B4C] hover:bg-[#F0F9FF] transition-colors">
                            <Edit2 size={14} />
                          </button>
                          <button className="p-1.5 rounded text-[#6B7280] hover:text-[#FF4D4F] hover:bg-[#FFF2F2] transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === '商品' && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFB] border-b border-[#E5E7EB]">
                    {['', 'コード', '商品名', 'カテゴリ', '単位', '荷姿', '重量(kg)', '容積(m³)', ''].map((h, i) => (
                      <th key={i} className="text-left px-4 py-3 text-[#6B7280] font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.filter(p =>
                    searchQuery === '' || p.name.includes(searchQuery) || p.code.includes(searchQuery)
                  ).map((p, i) => (
                    <tr key={p.id} className={cn('border-b border-[#F3F4F6] hover:bg-[#F8FAFB]', i % 2 === 0 ? '' : 'bg-[#FAFAFA]')}>
                      <td className="px-4 py-3"><input type="checkbox" className="rounded border-[#E5E7EB]" /></td>
                      <td className="px-4 py-3 font-tabular text-[#6B7280] text-xs">{p.code}</td>
                      <td className="px-4 py-3 font-medium text-[#1A1A2E]">{p.name}</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded">{p.category}</span></td>
                      <td className="px-4 py-3 text-[#6B7280]">{p.unit}</td>
                      <td className="px-4 py-3 text-[#6B7280] text-xs">{p.packagingType}</td>
                      <td className="px-4 py-3 font-tabular text-[#1A1A2E]">{p.weight}</td>
                      <td className="px-4 py-3 font-tabular text-[#1A1A2E]">{p.volume}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded text-[#6B7280] hover:text-[#0F2B4C] hover:bg-[#F0F9FF]"><Edit2 size={14} /></button>
                          <button className="p-1.5 rounded text-[#6B7280] hover:text-[#FF4D4F] hover:bg-[#FFF2F2]"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === '算定ルール' && (
              <div className="p-6 space-y-4">
                <p className="text-sm text-[#6B7280] mb-4">CO2排出量算定に使用する算定方式と係数を設定します</p>
                <div className="space-y-3">
                  {[
                    { name: '燃費法', desc: '燃料消費量 × CO2排出係数で算定。デフォルト使用推奨。', factor: 'CO2排出係数: 2.62 kg-CO2/L', active: true },
                    { name: '改良トンキロ法', desc: 'トンキロ × 排出原単位 × (1/積載率)で算定。積載率の影響を反映。', factor: '大型車: 0.0522 kg-CO2/トンキロ', active: false },
                    { name: 'トンキロ法', desc: 'トンキロ × 排出原単位で算定。積載率を固定値で扱う。', factor: '大型車: 0.0448 kg-CO2/トンキロ', active: false },
                  ].map(rule => (
                    <div key={rule.name} className={cn('flex items-start gap-4 p-4 rounded-xl border', rule.active ? 'border-[#00C09A] bg-[#F0FBF8]' : 'border-[#E5E7EB] bg-white')}>
                      <input type="radio" name="calcMethod" defaultChecked={rule.active} className="mt-1 text-[#00C09A]" />
                      <div>
                        <p className="font-medium text-[#1A1A2E]">{rule.name}</p>
                        <p className="text-sm text-[#6B7280] mt-0.5">{rule.desc}</p>
                        <p className="text-xs text-[#00C09A] mt-1 font-tabular">{rule.factor}</p>
                      </div>
                      {rule.active && <span className="ml-auto px-2 py-0.5 bg-[#00C09A] text-white text-xs rounded font-medium">使用中</span>}
                    </div>
                  ))}
                </div>
                <button className="bg-[#00C09A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#009B7D] transition-colors">
                  保存
                </button>
              </div>
            )}

            {activeTab === '予算' && (
              <div className="p-6">
                <p className="text-sm text-[#6B7280] mb-4">年度予算・目標値を設定します</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: '目標積載効率', value: '65.0', unit: '%' },
                    { label: '目標CO2削減率', value: '10.0', unit: '% (対前年比)' },
                    { label: '物流コスト予算', value: '32,000,000', unit: '円/月' },
                    { label: '目標実車率', value: '85.0', unit: '%' },
                  ].map(item => (
                    <div key={item.label} className="bg-[#F8FAFB] rounded-xl p-4 border border-[#E5E7EB]">
                      <label className="text-xs font-medium text-[#6B7280] block mb-2">{item.label}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue={item.value}
                          className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm font-tabular text-[#1A1A2E] outline-none focus:ring-2 focus:ring-[#00C09A] w-28"
                        />
                        <span className="text-[#6B7280] text-sm">{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 bg-[#00C09A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#009B7D] transition-colors">
                  保存
                </button>
              </div>
            )}
          </div>

          {/* ページネーション */}
          {(activeTab === '車両' || activeTab === '商品' || activeTab === '拠点') && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#F3F4F6]">
              <p className="text-xs text-[#9CA3AF]">
                全 {activeTab === '車両' ? VEHICLES.length : activeTab === '商品' ? PRODUCTS.length : WAREHOUSES.length} 件
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map(p => (
                  <button key={p} className={cn('w-7 h-7 rounded text-xs font-medium transition-colors',
                    p === 1 ? 'bg-[#0F2B4C] text-white' : 'text-[#6B7280] hover:bg-[#F8FAFB]'
                  )}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
