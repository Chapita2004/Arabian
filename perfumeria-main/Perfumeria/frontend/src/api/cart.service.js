import api from './api';

const CartService = {
    getCart: async () => {
        const response = await api.get('/cart');
        return response.data;
    },

    updateCart: async (productId, quantity, productData) => {
        const response = await api.post('/cart', {
            productId,
            quantity,
            name: productData?.name,
            price: productData?.price,
            img: productData?.img
        });
        return response.data;
    },
};

export default CartService;
