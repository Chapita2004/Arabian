const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const olfactoryFamilies = ['Amaderada', 'Oriental', 'Floral', 'Frutal', 'Cítrica', 'Gourmand', 'Cuero', 'Especiada'];
const concentrations = ['Eau de Parfum', 'Extrait de Parfum', 'Aceite Perfumado'];
const genders = ['Hombre', 'Mujer', 'Unisex'];

async function updateProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const products = await Product.find({});
        console.log(`Found ${products.length} products to update.`);

        for (const product of products) {
            // Assign random values if they don't exist or are default
            if (!product.olfactoryFamily) {
                product.olfactoryFamily = olfactoryFamilies[Math.floor(Math.random() * olfactoryFamilies.length)];
            }
            // Randomly assign gender if it's default 'Unisex' (just for variety in testing)
            if (product.gender === 'Unisex') {
                product.gender = genders[Math.floor(Math.random() * genders.length)];
            }
            // Randomly assign concentration if it's default
            if (product.concentration === 'Eau de Parfum') {
                product.concentration = concentrations[Math.floor(Math.random() * concentrations.length)];
            }

            await product.save();
            console.log(`Updated ${product.name}: ${product.gender}, ${product.olfactoryFamily}, ${product.concentration}`);
        }

        console.log('All products updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating products:', error);
        process.exit(1);
    }
}

updateProducts();
