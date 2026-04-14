// カラー定数
export const COLORS = {
  primary: '#0F2B4C',
  primaryLight: '#1A3D6B',
  primaryDark: '#091E36',
  accent: '#00C09A',
  accentLight: '#33D4B3',
  accentDark: '#009B7D',
  warning: '#FFEC47',
  warningDark: '#E6D43F',
  success: '#92D050',
  danger: '#FF4D4F',
  info: '#1890FF',
  bgPrimary: '#F8FAFB',
  bgSecondary: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  darkBg: '#0B1929',
  darkCard: '#132F4C',
  darkBorder: '#1E3A5F',
} as const;

// グラフ用カラーパレット（色覚多様性対応）
export const CHART_COLORS = [
  '#00C09A',
  '#1890FF',
  '#FFEC47',
  '#FF4D4F',
  '#722ED1',
  '#FA8C16',
  '#13C2C2',
  '#EB2F96',
  '#52C41A',
  '#F5222D',
] as const;

// 積載率の閾値
export const LOAD_RATE_THRESHOLDS = {
  excellent: 80,
  good: 65,
  warning: 50,
  critical: 0,
} as const;

// CO2排出係数（燃費法）
export const CO2_EMISSION_FACTOR = 2.62; // kg-CO2/L

// トンキロ法 排出係数（kg-CO2/トンキロ）
export const TON_KM_EMISSION_FACTORS = {
  large: 0.0522,    // 大型車
  medium: 0.0761,   // 中型車
  small: 0.1340,    // 小型車
} as const;

// 算定方式
export const CALCULATION_METHODS = {
  fuel: '燃費法',
  improvedTonKm: '改良トンキロ法',
  tonKm: 'トンキロ法',
} as const;
