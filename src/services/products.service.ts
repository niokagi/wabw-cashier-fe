import type { ProductPayload } from './../schemas/products.schema';
import apiClient from '@/lib/axios';

export interface Product {
    id: number;
    name: string;
    price: string;
    category: 'FOOD' | 'BEVERAGE' | 'DESSERT';
    stock: number;
    created_at: string;
    updated_at: string;
}

interface GetProductsResponse {
    status: 'success';
    data: {
        products: Product[];
    };
}

interface GetProductResponse {
    status: 'success';
    data: {
        product: Product;
    };
}

interface CreateProductResponse {
    status: 'success';
    message: string;
    data: {
        productId: number;
    };
}

interface GetCategoriesResponse {
    status: 'success',
    data: {
        categories: string[]
    }
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

// 
export const getProductTypes = async (): Promise<any> => {
    const response = await apiClient.get<any>('product-types');
    return response.data;
}

export const createProductService = async (data: ProductPayload): Promise<CreateProductResponse> => {
    const response = await apiClient.post<CreateProductResponse>('/products', data);
    return response.data;
};