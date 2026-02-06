const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String
    },
    image: {
        type: String // URL to image
    },
    category: {
        type: String,
        required: true
    },
    notes: {
        head: [String],
        heart: [String],
        base: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
