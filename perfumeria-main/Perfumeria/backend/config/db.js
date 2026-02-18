const mongoose = require('mongoose');

const connectDB = async () => {
    if (process.env.MONGO_URI.includes('cluster0.mongodb.net')) {
        console.warn('⚠️  WARNING: Using placeholder MongoDB URI. Database features will NOT work.');
        console.warn('⚠️  Please update backend/.env with your real MongoDB connection string.');
        return; // Stop here, do not attempt to connect or retry
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);

        // Fallback: If ENOTFOUND (DNS issue) and using +srv, try standard connection
        if (err.code === 'ENOTFOUND' && process.env.MONGO_URI.includes('+srv')) {
            console.log('Attempting fallback to standard connection format...');
            try {
                const fallbackUri = process.env.MONGO_URI.replace('+srv', '');
                const conn = await mongoose.connect(fallbackUri);
                console.log(`MongoDB Connected (Fallback): ${conn.connection.host}`);
                return;
            } catch (fallbackErr) {
                console.error(`Fallback Error: ${fallbackErr.message}`);
            }
        }

        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000); // Retry logic
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    // Mongoose handles auto-reconnect for established connections usually.
    // If we manually call connectDB() here, we might create a loop if the connection is flapping.
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = connectDB;
