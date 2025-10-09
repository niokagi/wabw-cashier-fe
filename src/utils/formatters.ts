import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (
    date: Date | string | number,
    formatString = 'dd MMMM yyyy'
): string => {
    return format(new Date(date), formatString, { locale: id });
};

export const formatIDR = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

export const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

// case
export const toPascalCase = (str: string | null | undefined): string => {
    if (!str) {
        return '';
    }

    return str
        .replace(/[-_]+/g, ' ')
        .replace(/\w\S*/g, (word) =>
            word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        )
        .replace(/\s/g, '');
};