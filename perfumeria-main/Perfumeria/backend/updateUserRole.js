// Script to update user role to superadmin
// Run this with: node updateUserRole.js

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

const updateUserRole = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB');

        // Update user with specific email to superadmin
        const email = 'castrogarciasantiagodaniel@gmail.com';

        const user = await User.findOneAndUpdate(
            { email: email },
            { role: 'superadmin' },
            { new: true }
        );

        if (user) {
            console.log(`✓ User ${user.email} updated to superadmin role`);
            console.log(`  Name: ${user.name}`);
            console.log(`  Role: ${user.role}`);
        } else {
            console.log(`✗ User with email ${email} not found`);
        }

        // Disconnect
        await mongoose.disconnect();
        console.log('✓ Disconnected from MongoDB');
    } catch (error) {
        console.error('Error updating user role:', error);
        process.exit(1);
    }
};

updateUserRole();
