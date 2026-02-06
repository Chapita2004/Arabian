import api from './api';

const PaymentService = {
    createPreference: async (items) => {
        // items should be an array of { id, title, quantity, price }
        const response = await api.post('/payment/create-preference', { items });
        return response.data; // Should return { id: 'preference_id' }
    },
};

export default PaymentService;
