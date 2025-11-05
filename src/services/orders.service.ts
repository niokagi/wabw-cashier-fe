import apiClient from "@/lib/axios";

interface OrderItemPayload {
    productId: string;
    quantity: number;
}

export interface CreateOrderPayload {
    items: OrderItemPayload[];
    customerName?: string;  
    paymentMethod: string;
}

interface CreateOrderResponse {
    status: string;
    message: string;
    data: {
        orderId: string;
    };
}

export const createOrderService = async (data: CreateOrderPayload): Promise<CreateOrderResponse> => {
    try {
        const response = await apiClient.post<CreateOrderResponse>('/orders', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
