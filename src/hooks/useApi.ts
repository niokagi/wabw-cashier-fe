import { useState } from 'react';
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

    const execute = async (payload: P) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await service(payload);
            setData(result);
            const message = (result as any)?.message || null;
            if (message) {
                setSuccessMessage(message);
            }
            return { data: result, successMessage: message, error: null };
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            const errorMessage = axiosError.response?.data?.message || 'an unexpected error occurred.';
            setError(errorMessage);
            return { data: null, successMessage: null, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return { execute, data, successMessage, error, isLoading };
};