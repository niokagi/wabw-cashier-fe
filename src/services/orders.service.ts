import apiClient from '@/lib/axios';

interface OrderItemPayload {
    productId: string;
    quantity: number;
}

export interface CreateOrderPayload {
    items: OrderItemPayload[];
    customerName?: string;
    paymentMethod: 'CASH' | 'QRIS' | string;
}

//   GET /orders
export interface Order {
    id: string;
    total_amount: string;
    payment_method: 'CASH' | 'QRIS' | string;
    customer_name: string;
    cashier_email: string;
    user_id: string;
    created_at: string;
}

export interface OrderDetail extends Order {
    items: Array<{
        quantity: number;
        price: string;
        product_name: string;
    }>;
}

// GET /orders
interface GetOrdersResponse {
    status: 'success';
    data: {
        orders: Order[];
    };
}

// GET /orders/{id}
interface GetOrderByIdResponse {
    status: 'success';
    data: {
        order: OrderDetail;
    };
}

// POST /orders
interface CreateOrderResponse {
    status: 'success';
    message: string;
    data: {
        orderId: string;
    };
}

// service func's
export const createOrderService = async (data: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const response = await apiClient.post<CreateOrderResponse>('/orders', data);
    return response.data;
};

export const getOrdersService = async (): Promise<GetOrdersResponse> => {
    const response = await apiClient.get<GetOrdersResponse>('/orders');
    return response.data;
};

export const getOrderByIdService = async (id: string): Promise<GetOrderByIdResponse> => {
    const response = await apiClient.get<GetOrderByIdResponse>(`/orders/${id}`);
    return response.data;
};

export const deleteOrderService = async (id: string): Promise<void> => {
    await apiClient.delete(`/orders/${id}`);
};

export const updateOrderService = async (orderId: string, payload: { isPaid: boolean }): Promise<void> => {
    await apiClient.patch(`/orders/${orderId}`, payload);
};