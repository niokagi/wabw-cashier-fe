import apiClient from "@/lib/axios";

interface OrderItemPayload {
    productId: number;
    quantity: number;
}

export interface CreateOrderPayload {
    items: OrderItemPayload[];
    customerName?: string;
    paymentMethod: string;
}

// Interface for the expected SUCCESS response FROM the backend
interface CreateOrderResponse {
    status: string; // Should be 'success'
    message: string;
    data: {
        orderId: number; // Backend returns the ID of the created order
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
