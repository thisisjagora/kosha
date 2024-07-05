import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateWithEllipsis = (text: string, maxLength: number) => {
  if (typeof text !== 'string') throw new TypeError('Expected a string as the first argument');
  if (typeof maxLength !== 'number' || maxLength < 0) throw new TypeError('Expected a non-negative number as the second argument');

  if (text.length > maxLength) return text.slice(0, maxLength - 3) + '...';
  return text;
}

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function mergeArrays(...arrays: any[]) {
  const length = arrays.reduce((minLength, arr) => Math.min(minLength, arr.length), Infinity);

  return Array.from({ length }, (_, index) =>
    arrays.reduce((mergedObj, arr) => ({
      ...mergedObj,
      ...arr[index]
    }), {})
  );
}

function abbreviateNumber(value: number): string {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;
  let num = value;

  while (num >= 1000 && suffixIndex < suffixes.length - 1) {
    num /= 1000;
    suffixIndex++;
  }

  return `${num.toFixed(2)}${suffixes[suffixIndex]}`;
}

export function formatCurrency(value: number, locale: string = 'en-US', currency: string = 'USD'): string {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  if (value >= 1000000) {
    return abbreviateNumber(value);
  }

  return formattedValue;
}

