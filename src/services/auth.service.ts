import apiClient from '@/lib/axios';
import { signInSchema, signUpSchema } from '@/schemas/auth.schema';
import { z } from 'zod';

type SignInPayload = z.infer<typeof signInSchema>;
type SignUpPayload = z.infer<typeof signUpSchema>;

interface SignInResponse {
    status: string;
    message: string;
    user: string;
    token: string;
}

interface SignUpResponse {
    id: string;
    status: string;
    message: string;
}

export const signUpService = async (data: SignUpPayload): Promise<SignUpResponse> => {
    try {
        const response = await apiClient.post<SignUpResponse>('/auth/sign-up', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const signInService = async (data: SignInPayload): Promise<SignInResponse> => {
    try {
        // temporary endpoint api
        const response = await apiClient.post<SignInResponse>('/auth/sign-in', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// export const registerService = async (data: RegisterPayload) => { ... };
// export const getProfileService = async () => { ... };