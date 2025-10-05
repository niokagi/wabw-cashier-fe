import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

type ApiService<T, P> = (payload: P) => Promise<T>;

interface ExecuteReturn<T> {
    data: T | null;
    successMessage: string | null;
    error: string | null;
}

interface UseApiReturn<T, P> {
    execute: (payload: P) => Promise<ExecuteReturn<T>>;
    data: T | null;
    successMessage: string | null;
    error: string | null;
    isLoading: boolean;
}

export const useApi = <T, P>(service: ApiService<T, P>): UseApiReturn<T, P> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const execute = useCallback(async (payload: P): Promise<ExecuteReturn<T>> => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const result = await service(payload);
            setData(result);
            const message = (result as any)?.message || null;
            if (message) { setSuccessMessage(message); }
            return { data: result, error: null, successMessage: message };
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            const errorMessage = axiosError.response?.data?.message || 'an unexpected error occurred.';
            setError(errorMessage);
            return { data: null, error: errorMessage, successMessage: null };
        } finally {
            setIsLoading(false);
        }
    }, [service]);

    return { execute, data, error, isLoading, successMessage };
};