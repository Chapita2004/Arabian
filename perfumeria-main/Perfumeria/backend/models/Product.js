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
        type: String // URL to image (deprecated, use images array)
    },
    images: {
        type: [String], // Array of image URLs
        default: function () {
            return this.image ? [this.image] : [];
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['Perfumes árabes', 'Perfumes de nicho', 'Desodorantes árabes']
    },
    gender: {
        type: String,
        enum: ['Hombre', 'Mujer', 'Unisex'],
        default: 'Unisex'
    },
    olfactoryFamily: {
        type: String, // e.g., 'Amaderada', 'Floral', 'Oriental'
    },
    concentration: {
        type: String,
        enum: ['Eau de Parfum', 'Eau de Toilette', 'Extrait de Parfum', 'Aceite Perfumado', 'Desodorante'],
        default: 'Eau de Parfum'
    },
    size: {
        type: String, // e.g., '100ml'
        default: '100ml'
    },
    notes: {
        head: [String],
        heart: [String],
        base: [String]
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
