import api from './api';

const ProductService = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Admin functions
    create: async (productData) => {
        const token = localStorage.getItem('token');
        const response = await api.post('/products', productData, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    },

    update: async (id, productData) => {
        const token = localStorage.getItem('token');
        const response = await api.put(`/products/${id}`, productData, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    },

    delete: async (id) => {
        const token = localStorage.getItem('token');
        const response = await api.delete(`/products/${id}`, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    }
};

export default ProductService;

