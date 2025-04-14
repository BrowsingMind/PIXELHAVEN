
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem, Purchase } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateOrderId(): string {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PH-${timestamp}-${random}`;
}

export function createPurchase(cartItems: CartItem[], total: number): Purchase {
  return {
    items: [...cartItems],
    total,
    purchaseDate: new Date().toISOString(),
    orderId: generateOrderId(),
  };
}
