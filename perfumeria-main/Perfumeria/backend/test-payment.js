const axios = require('axios');

const testData = {
    items: [{
        id: 'test123',
        title: 'Test Product',
        quantity: 1,
        price: 1000,
        currency_id: 'ARS'
    }],
    payer: {
        name: 'Test',
        surname: 'User',
        email: 'test@test.com',
        phone: '1234567890',
        identification: '12345678'
    }
};

axios.post('http://localhost:5000/api/payment/create-preference', testData)
    .then(response => {
        console.log('SUCCESS:', JSON.stringify(response.data, null, 2));
    })
    .catch(error => {
        console.log('ERROR STATUS:', error.response?.status);
        console.log('ERROR DATA:', JSON.stringify(error.response?.data, null, 2));
    });
