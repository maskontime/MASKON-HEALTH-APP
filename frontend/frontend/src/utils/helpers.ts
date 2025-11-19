export const formatPrice = (amount: number, unit: string = 'KES'): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: unit === 'KES' ? 'KES' : 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Import default placeholder from assets
import { logoImg } from '../assets/assets';

export const getImageUrl = (image?: string): string => {
  if (!image) {
    return logoImg; // Use logo as placeholder
  }
  if (image.startsWith('http')) {
    return image;
  }
  return `${import.meta.env.VITE_UPLOAD_URL || 'http://localhost:5000/uploads'}/${image}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const calculateRating = (reviews?: Array<{ rating: number }>): number => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

