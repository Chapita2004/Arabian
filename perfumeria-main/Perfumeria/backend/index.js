const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', authRoutes);

// Conexión a MongoDB (Asegurate de tener tu URL en el archivo .env)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a la base de datos"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));