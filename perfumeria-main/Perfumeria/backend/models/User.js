const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' } // Por si después querés un panel de admin para cargar perfumes
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);