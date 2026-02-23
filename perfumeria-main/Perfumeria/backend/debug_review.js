const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('./models/Review');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const run = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // Find a valid user and product
        const user = await User.findOne();
        const product = await Product.findOne();

        if (!user || !product) {
            console.log('User or Product not found, cannot test.');
            process.exit(1);
        }

        console.log(`Testing with User: ${user._id} and Product: ${product._id}`);

        // Clean up any existing review for this pair
        await Review.findOneAndDelete({ user: user._id, product: product._id });

        console.log('Creating review...');
        const review = await Review.create({
            user: user._id,
            product: product._id,
            rating: 5,
            comment: 'Debug review'
        });

        console.log('Review created successfully:', review);

        // Test update product rating manually
        console.log('Testing updateProductRating logic...');
        const reviews = await Review.find({ product: product._id });
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        const avg = sum / reviews.length;
        console.log(`New Average: ${avg}`);

    } catch (error) {
        console.error('ERROR:', error);
    } finally {
        await mongoose.disconnect();
    }
};

run();
