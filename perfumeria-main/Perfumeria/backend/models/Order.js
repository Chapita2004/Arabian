const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Puede ser null si es compra de invitado
    },
    customerInfo: {
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        dni: {
            type: String,
            required: true
        }
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        image: {
            type: String
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentInfo: {
        mercadoPagoId: {
            type: String
        },
        status: {
            type: String
        },
        paymentType: {
            type: String
        }
    },
    deliveryType: {
        type: String,
        enum: ['pickup', 'shipping'],
        default: 'pickup'
    },
    notes: {
        type: String
    }
}, { timestamps: true });

// Generar número de orden antes de guardar
OrderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        // Formato: ORD-YYYYMMDD-XXXX
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `ORD-${dateStr}-${String(count + 1).padStart(4, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Order', OrderSchema);
