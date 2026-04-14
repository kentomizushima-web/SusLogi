// ダミーデータ（SusLogi モックアップ用）

// 拠点マスタ
export const WAREHOUSES = [
  { id: 'W01', name: '東京物流センター', prefecture: '東京都', address: '東京都江東区有明1-1-1', lat: 35.6329, lng: 139.7951 },
  { id: 'W02', name: '名古屋倉庫', prefecture: '愛知県', address: '愛知県名古屋市港区金城ふ頭2-1-1', lat: 35.0763, lng: 136.8742 },
  { id: 'W03', name: '大阪物流センター', prefecture: '大阪府', address: '大阪府大阪市此花区高見1-2-3', lat: 34.6743, lng: 135.4629 },
  { id: 'W04', name: '静岡工場', prefecture: '静岡県', address: '静岡県静岡市清水区辻1-1-1', lat: 35.0116, lng: 138.4889 },
  { id: 'W05', name: '福岡倉庫', prefecture: '福岡県', address: '福岡県福岡市東区箱崎ふ頭4-1-1', lat: 33.6172, lng: 130.4166 },
] as const;

// 車両マスタ
export const VEHICLES = [
  { id: 'V01', number: 'XX-1001', type: '4tウイング', maxWeight: 4000, maxVolume: 18.0, fuelEfficiency: 5.2, warehouseId: 'W01' },
  { id: 'V02', number: 'XX-1002', type: '4tウイング', maxWeight: 4000, maxVolume: 18.0, fuelEfficiency: 5.0, warehouseId: 'W01' },
  { id: 'V03', number: 'XX-1003', type: '10t大型', maxWeight: 10000, maxVolume: 36.0, fuelEfficiency: 3.5, warehouseId: 'W02' },
  { id: 'V04', number: 'XX-1004', type: '10t大型', maxWeight: 10000, maxVolume: 36.0, fuelEfficiency: 3.8, warehouseId: 'W02' },
  { id: 'V05', number: 'XX-1005', type: '2t小型', maxWeight: 2000, maxVolume: 9.0, fuelEfficiency: 8.5, warehouseId: 'W03' },
  { id: 'V06', number: 'XX-1006', type: '2t小型', maxWeight: 2000, maxVolume: 9.0, fuelEfficiency: 8.2, warehouseId: 'W03' },
  { id: 'V07', number: 'XX-1007', type: '4tウイング', maxWeight: 4000, maxVolume: 18.0, fuelEfficiency: 5.1, warehouseId: 'W04' },
  { id: 'V08', number: 'XX-1008', type: '10t大型', maxWeight: 10000, maxVolume: 36.0, fuelEfficiency: 3.6, warehouseId: 'W04' },
  { id: 'V09', number: 'XX-1009', type: '4tウイング', maxWeight: 4000, maxVolume: 18.0, fuelEfficiency: 5.3, warehouseId: 'W05' },
  { id: 'V10', number: 'XX-1010', type: '2t小型', maxWeight: 2000, maxVolume: 9.0, fuelEfficiency: 8.8, warehouseId: 'W05' },
] as const;

// 月次KPIデータ（12ヶ月分 - 改善トレンドあり）
export const MONTHLY_KPI = [
  { month: '2024-04', label: '4月', loadRate: 63.2, vehicleRate: 78.5, loadEfficiency: 49.6, co2: 1420, weightLoadRate: 61.5, volumeLoadRate: 63.2 },
  { month: '2024-05', label: '5月', loadRate: 65.8, vehicleRate: 79.2, loadEfficiency: 52.1, co2: 1398, weightLoadRate: 63.2, volumeLoadRate: 65.8 },
  { month: '2024-06', label: '6月', loadRate: 64.5, vehicleRate: 80.1, loadEfficiency: 51.7, co2: 1405, weightLoadRate: 62.8, volumeLoadRate: 64.5 },
  { month: '2024-07', label: '7月', loadRate: 67.3, vehicleRate: 81.0, loadEfficiency: 54.5, co2: 1382, weightLoadRate: 65.1, volumeLoadRate: 67.3 },
  { month: '2024-08', label: '8月', loadRate: 68.9, vehicleRate: 80.5, loadEfficiency: 55.5, co2: 1361, weightLoadRate: 66.4, volumeLoadRate: 68.9 },
  { month: '2024-09', label: '9月', loadRate: 70.2, vehicleRate: 81.8, loadEfficiency: 57.4, co2: 1342, weightLoadRate: 68.5, volumeLoadRate: 70.2 },
  { month: '2024-10', label: '10月', loadRate: 71.5, vehicleRate: 82.3, loadEfficiency: 58.8, co2: 1325, weightLoadRate: 69.8, volumeLoadRate: 71.5 },
  { month: '2024-11', label: '11月', loadRate: 72.8, vehicleRate: 82.9, loadEfficiency: 60.4, co2: 1312, weightLoadRate: 71.2, volumeLoadRate: 72.8 },
  { month: '2024-12', label: '12月', loadRate: 73.5, vehicleRate: 83.5, loadEfficiency: 61.4, co2: 1298, weightLoadRate: 72.1, volumeLoadRate: 73.5 },
  { month: '2025-01', label: '1月', loadRate: 72.1, vehicleRate: 82.8, loadEfficiency: 59.7, co2: 1310, weightLoadRate: 70.5, volumeLoadRate: 72.1 },
  { month: '2025-02', label: '2月', loadRate: 73.9, vehicleRate: 83.0, loadEfficiency: 61.3, co2: 1285, weightLoadRate: 72.4, volumeLoadRate: 73.9 },
  { month: '2025-03', label: '3月', loadRate: 74.8, vehicleRate: 83.2, loadEfficiency: 62.3, co2: 1248, weightLoadRate: 73.1, volumeLoadRate: 74.8 },
];

// 現在月のKPI
export const CURRENT_KPI = {
  loadEfficiency: 62.3,
  loadEfficiencyChange: +3.2,
  effectiveLoadRate: 74.8,
  effectiveLoadRateChange: +1.5,
  vehicleRate: 83.2,
  vehicleRateChange: +2.1,
  co2Monthly: 1248,
  co2MonthlyChange: -4.8,
};

// 拠点別積載効率
export const WAREHOUSE_PERFORMANCE = [
  { warehouseId: 'W01', name: '東京', loadRate: 74.8, vehicleRate: 85.2, loadEfficiency: 63.7, co2: 420 },
  { warehouseId: 'W02', name: '名古屋', loadRate: 78.2, vehicleRate: 82.1, loadEfficiency: 64.2, co2: 312 },
  { warehouseId: 'W03', name: '大阪', loadRate: 71.5, vehicleRate: 81.5, loadEfficiency: 58.3, co2: 285 },
  { warehouseId: 'W04', name: '静岡', loadRate: 76.3, vehicleRate: 83.8, loadEfficiency: 63.9, co2: 158 },
  { warehouseId: 'W05', name: '福岡', loadRate: 69.8, vehicleRate: 79.4, loadEfficiency: 55.4, co2: 73 },
];

// 車両別積載効率（散布図用）
export const VEHICLE_SCATTER = VEHICLES.map((v, i) => ({
  vehicleId: v.id,
  vehicleNumber: v.number,
  type: v.type,
  loadRate: [74.8, 68.2, 82.1, 79.5, 65.3, 71.2, 77.8, 83.4, 70.1, 62.5][i],
  vehicleRate: [85.2, 79.8, 87.3, 84.1, 76.5, 80.3, 83.7, 88.2, 78.4, 72.1][i],
  loadEfficiency: [63.7, 54.5, 71.7, 66.9, 49.9, 57.2, 65.1, 73.5, 55.0, 45.1][i],
}));

// ヒートマップデータ（拠点 × 月次）
export const HEATMAP_DATA = WAREHOUSES.map(w => ({
  warehouse: w.name,
  data: MONTHLY_KPI.map(m => ({
    month: m.label,
    value: Math.round((WAREHOUSE_PERFORMANCE.find(wp => wp.warehouseId === w.id)?.loadEfficiency || 60) +
      (m.loadEfficiency - 62.3) + (Math.random() * 6 - 3)),
  })),
}));

// アラートデータ
export const ALERTS = [
  { id: 'A01', type: 'warning', message: 'XX-1010 積載率62.5%（閾値65%以下）', vehicle: 'XX-1010', date: '2025-03-14', read: false },
  { id: 'A02', type: 'danger', message: 'W05 福岡倉庫 先月比-3.2pt低下', warehouse: 'W05', date: '2025-03-13', read: false },
  { id: 'A03', type: 'info', message: 'CO2レポート 2025年2月分 生成完了', date: '2025-03-12', read: true },
  { id: 'A04', type: 'warning', message: '商品マスタ 重量未設定 12件', date: '2025-03-11', read: false },
  { id: 'A05', type: 'info', message: 'traevo連携 最終同期: 2025-03-14 06:00', date: '2025-03-14', read: true },
];

// 施策管理データ
export const MEASURES = [
  { id: 'M01', title: '大阪-福岡便の統合検討', status: '実行中', priority: 'high', assignee: '山田太郎', deadline: '2025-04-30', effect: '+5.2pt', description: '週3便を週2便に集約し積載効率を改善' },
  { id: 'M02', title: '10t車→4t車の置換検討（W05）', status: '検討中', priority: 'medium', assignee: '鈴木一郎', deadline: '2025-05-15', effect: '+3.8pt', description: '福岡倉庫の輸送量に対して車両サイズ過剰の可能性' },
  { id: 'M03', title: '荷姿標準化プロジェクト', status: '起案中', priority: 'low', assignee: '佐藤花子', deadline: '2025-06-30', effect: '+2.1pt', description: '製品ごとの荷姿を標準化し容積積載率を向上' },
  { id: 'M04', title: 'デジタコ連携精度向上', status: '完了', priority: 'high', assignee: '田中次郎', deadline: '2025-02-28', effect: '+1.5pt', description: 'traevo APIの連携精度を向上させデータ欠損を解消' },
  { id: 'M05', title: '共配ルート最適化（東京）', status: '完了', priority: 'high', assignee: '山田太郎', deadline: '2025-03-15', effect: '+4.3pt', description: '東京都内の共配ルートを再設計し実車率を改善' },
];

// 商品マスタ
export const PRODUCTS = [
  { id: 'P001', code: 'SKU-001', name: '食パン 6枚切り', category: '食料品', unit: '箱', packagingType: '段ボール箱', weight: 0.8, volume: 0.003, qtyPerBox: 12 },
  { id: 'P002', code: 'SKU-002', name: '自動車部品 ブレーキパッド', category: '自動車部品', unit: '個', packagingType: 'プラスチックケース', weight: 2.5, volume: 0.002, qtyPerBox: 24 },
  { id: 'P003', code: 'SKU-003', name: '家電製品 電子レンジ', category: '家電', unit: '台', packagingType: '段ボール箱', weight: 15.0, volume: 0.05, qtyPerBox: 1 },
  { id: 'P004', code: 'SKU-004', name: '飲料水 2Lペットボトル', category: '食料品', unit: 'ケース', packagingType: 'シュリンク', weight: 24.0, volume: 0.015, qtyPerBox: 1 },
  { id: 'P005', code: 'SKU-005', name: '衣料品 Tシャツ', category: 'アパレル', unit: '枚', packagingType: 'ポリ袋', weight: 0.2, volume: 0.0005, qtyPerBox: 50 },
];

// データ連携ステータス
export const DATA_CONNECTIONS = [
  { id: 'DC01', name: 'traevo連携（デジタコ）', type: 'api', status: 'active', lastSync: '2025-03-14 06:00', recordCount: 1842, errorCount: 0 },
  { id: 'DC02', name: 'SVF Archiver（納品データ）', type: 'api', status: 'active', lastSync: '2025-03-14 01:30', recordCount: 5621, errorCount: 3 },
  { id: 'DC03', name: 'ファイル連携（CSV）', type: 'file', status: 'warning', lastSync: '2025-03-10 12:00', recordCount: 234, errorCount: 12 },
  { id: 'DC04', name: 'AI-OCR（紙データ）', type: 'ocr', status: 'inactive', lastSync: '2025-02-28 09:00', recordCount: 89, errorCount: 0 },
];

// 取込み履歴
export const IMPORT_HISTORY = [
  { id: 'IH01', date: '2025-03-14 06:00', type: 'デジタコデータ', records: 245, status: 'success', errors: 0 },
  { id: 'IH02', date: '2025-03-14 01:30', type: '納品データ', records: 1823, status: 'warning', errors: 3 },
  { id: 'IH03', date: '2025-03-13 23:00', type: '車両マスタ', records: 10, status: 'success', errors: 0 },
  { id: 'IH04', date: '2025-03-13 18:00', type: 'CSVファイル', records: 120, status: 'error', errors: 15 },
  { id: 'IH05', date: '2025-03-12 06:00', type: 'デジタコデータ', records: 238, status: 'success', errors: 0 },
];

// CO2算定データ
export const CO2_DATA = {
  total: 1248,
  byMethod: {
    fuel: 1248,
    improvedTonKm: 1235,
    tonKm: 1268,
  },
  byWarehouse: WAREHOUSE_PERFORMANCE.map(w => ({ name: w.name, value: w.co2 })),
  trend: MONTHLY_KPI.map(m => ({ month: m.label, value: m.co2 })),
  perProduct: [
    { product: '食パン 6枚切り', co2: 0.12, unit: 'kg-CO2/個' },
    { product: 'ブレーキパッド', co2: 0.45, unit: 'kg-CO2/個' },
    { product: '電子レンジ', co2: 2.82, unit: 'kg-CO2/台' },
    { product: '飲料水 2L', co2: 0.89, unit: 'kg-CO2/ケース' },
  ],
};

// シミュレーション用基本値
export const SIMULATION_BASE = {
  currentLoadEfficiency: 62.3,
  currentCo2Monthly: 1248,
  currentCostMonthly: 28500000, // 円
  currentVehicleCount: 10,
  currentTripCount: 450,
};
