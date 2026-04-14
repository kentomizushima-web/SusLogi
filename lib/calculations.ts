import { CO2_EMISSION_FACTOR } from './constants';

// 重量積載率
export const weightLoadRate = (cargoWeight: number, maxWeight: number): number =>
  maxWeight > 0 ? (cargoWeight / maxWeight) * 100 : 0;

// 容積積載率
export const volumeLoadRate = (cargoVolume: number, maxVolume: number): number =>
  maxVolume > 0 ? (cargoVolume / maxVolume) * 100 : 0;

// 実効積載率
export const effectiveLoadRate = (weightRate: number, volumeRate: number): number =>
  Math.max(weightRate, volumeRate);

// 共配の平均積載率（距離加重平均）
export const avgLoadRateShared = (
  segments: { loadRate: number; distance: number }[]
): number => {
  const totalWeighted = segments.reduce((sum, s) => sum + s.loadRate * s.distance, 0);
  const totalDistance = segments.reduce((sum, s) => sum + s.distance, 0);
  return totalDistance > 0 ? totalWeighted / totalDistance : 0;
};

// 実車率
export const actualVehicleRate = (loadedDistance: number, totalDistance: number): number =>
  totalDistance > 0 ? (loadedDistance / totalDistance) * 100 : 0;

// 空車率
export const emptyVehicleRate = (emptyDistance: number, totalDistance: number): number =>
  totalDistance > 0 ? (emptyDistance / totalDistance) * 100 : 0;

// 積載効率
export const loadEfficiency = (loadRate: number, vehicleRate: number): number =>
  (loadRate / 100) * (vehicleRate / 100) * 100;

// CO2排出量（燃費法）
export const co2ByFuel = (fuelLiters: number, co2Factor: number = CO2_EMISSION_FACTOR): number =>
  fuelLiters * co2Factor;

// CO2排出量（改良トンキロ法）
export const co2ByTonKm = (
  tonKm: number,
  loadRate: number,
  baseEmissionFactor: number
): number =>
  loadRate > 0 ? tonKm * baseEmissionFactor * (1 / (loadRate / 100)) : 0;

// 1製品あたりのCO2排出量（CFP）
export const co2PerProduct = (
  totalCo2: number,
  totalWeight: number,
  productWeight: number
): number =>
  totalWeight > 0 ? (totalCo2 * productWeight) / totalWeight : 0;

// 積載率の評価ラベル
export const getLoadRateLabel = (rate: number): { label: string; color: string } => {
  if (rate >= 80) return { label: '優良', color: '#92D050' };
  if (rate >= 65) return { label: '良好', color: '#00C09A' };
  if (rate >= 50) return { label: '要改善', color: '#FFEC47' };
  return { label: '要対応', color: '#FF4D4F' };
};

// 数値フォーマット
export const formatPercent = (value: number, decimals: number = 1): string =>
  `${value.toFixed(decimals)}%`;

export const formatTons = (value: number): string =>
  value >= 1000
    ? `${(value / 1000).toFixed(1)}千t`
    : `${value.toFixed(0)}t`;

export const formatCo2 = (value: number): string =>
  `${value.toLocaleString('ja-JP', { maximumFractionDigits: 0 })} t-CO2`;
