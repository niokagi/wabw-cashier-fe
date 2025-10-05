import apiClient from '@/lib/axios';
import { type SignInPayload, type SignUpPayload } from '@/schemas/auth.schema';

// interfaces
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

// 
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

// export const getProfileService = async () => { ... };