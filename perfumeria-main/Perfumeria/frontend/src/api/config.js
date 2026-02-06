export const config = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Default to localhost
    MERCADOPAGO_PUBLIC_KEY: import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || 'TEST-your-public-key',
};
