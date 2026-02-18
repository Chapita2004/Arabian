import api from './api';

const OrderService = {
    // Obtener mis órdenes (usuario autenticado)
    getMyOrders: async () => {
        const response = await api.get('/orders/my-orders');
        return response.data;
    },

    // Obtener orden por ID
    getOrderById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Admin: Obtener todas las órdenes
    getAllOrders: async (params = {}) => {
        const response = await api.get('/orders', { params });
        return response.data;
    },

    // Admin: Actualizar estado de orden
    updateOrderStatus: async (id, status, notes = '') => {
        const response = await api.put(`/orders/${id}/status`, { status, notes });
        return response.data;
    },

    // Admin: Obtener estadísticas
    getOrderStats: async () => {
        const response = await api.get('/orders/stats');
        return response.data;
    }
};

export default OrderService;
