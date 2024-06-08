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