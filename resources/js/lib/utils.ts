import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleString('en-UK', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
    });
}

export function truncateText(text: string, maxLength: number = 100): string {
    if (!text || text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
}
