import api from './api';

const PaymentService = {
    createPreference: async (orderData) => {
        // orderData should be { items: [...], payer: {...} }
        const response = await api.post('/payment/create-preference', orderData);
        return response.data; // Should return { id: 'preference_id', init_point: '...' }
    },
};

export default PaymentService;
