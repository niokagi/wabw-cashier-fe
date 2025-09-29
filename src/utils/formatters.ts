// src/utils/formatters.ts
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (
    date: Date | string | number,
    formatString = 'dd MMMM yyyy'
): string => {
    return format(new Date(date), formatString, { locale: id });
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};