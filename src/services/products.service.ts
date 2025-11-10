import type { ProductPayload } from './../schemas/products.schema';
import apiClient from '@/lib/axios';

export interface Product {
    // id: number;
    id: string;
    name: string;
    price: string;
    category: 'Food' | 'Beverage' | 'Dessert' | string;
    stock: string;
    description?: string;
    // image_url?: string;
    created_at: string;
    updated_at: string;
}

interface GetProductsResponse {
    status: 'success' | string;
    data: {
        products: Product[];
    };
}

interface GetProductResponse {
    status: 'success' | string;
    message: string;
    data: {
        product: Product;
    };
}

interface CreateProductResponse {
    status: 'success' | string;
    message: string;
    data: {
        productId: string;
    };
}

interface GetCategoriesResponse {
    status: 'success' | string,
    data: {
        categories: string[]
    }
}

interface UpdateProductResponse {
    status: 'success' | string;
    message: string;
    data: {
        productId: string;
    };
}

// 
export interface UpdateProductPayload {
    id: string; 
    payload: FormData;
}

// 
export const getProductsService = async (): Promise<GetProductsResponse> => {
    const response = await apiClient.get<GetProductsResponse>('/products');
    return response.data;
};

export const getProductCategoriesService = async (): Promise<GetCategoriesResponse> => {
    const response = await apiClient.get<GetCategoriesResponse>('/products/categories');
    return response.data;
}

export const getProductByIdService = async (id: number): Promise<GetProductResponse> => {
    const response = await apiClient.get<GetProductResponse>(`/products/${id}`);
    return response.data;
};

export const createProductService = async (data: ProductPayload): Promise<CreateProductResponse> => {
    const response = await apiClient.post<CreateProductResponse>('/products', data);
    return response.data;
};

export const updateProductService = async (id: string, data: FormData): Promise<UpdateProductResponse> => {
    const response = await apiClient.put<UpdateProductResponse>(`/products/${id}`, data);
    return response.data;
};

export const deleteProductService = async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
};

