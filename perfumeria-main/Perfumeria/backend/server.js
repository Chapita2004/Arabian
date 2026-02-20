const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
    next();
});

// Configuración de CORS
const whiteList = [process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5000',
    'https://arabianexclusive.com',
    'https://www.arabianexclusive.com'
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Servir archivos estáticos del frontend en producción
// Se asume que el build de React está en ../frontend/dist
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Rutas de API no encontradas → 404 JSON (no devolver el index.html de React)
    app.use('/api', (req, res) => {
        res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
    });

    // Cualquier otra ruta → devolver el index.html del frontend
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
    });
} else {
    // Rutas de API no encontradas en desarrollo
    app.use('/api', (req, res) => {
        res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
    });

    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
