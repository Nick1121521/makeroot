import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(Math.round(num));
}

export function formatCurrency(num: number): string {
  if (num >= 100000000) {
    const eok = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000);
    return `${eok}억 ${man > 0 ? man + '만' : ''}원`;
  }
  if (num >= 10000) {
    return `${Math.floor(num / 10000)}만원`;
  }
  return `${num}원`;
}
