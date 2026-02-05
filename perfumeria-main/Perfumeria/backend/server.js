// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Conectado'))
    .catch(err => console.log('❌ Error:', err));

// Modelo de Usuario
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// RUTA: REGISTRO
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar' });
    }
});

// RUTA: LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user._id }, 'secreto_super_pro', { expiresIn: '1h' });
        // Enviamos el username para que el frontend lo use
        res.json({ token, user: { username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

app.listen(5000, () => console.log('🚀 Servidor en puerto 5000'));