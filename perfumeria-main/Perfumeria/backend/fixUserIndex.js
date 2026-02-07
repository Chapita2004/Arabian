// Run this script to fix the duplicate key error
// This removes the old username index that's causing conflicts

const mongoose = require('mongoose');
require('dotenv').config();

async function fixUserIndex() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // Get all indexes
        const indexes = await usersCollection.indexes();
        console.log('Current indexes:', indexes);

        // Drop the username index if it exists
        try {
            await usersCollection.dropIndex('username_1');
            console.log('✅ Successfully dropped username_1 index');
        } catch (err) {
            if (err.code === 27) {
                console.log('ℹ️  username_1 index does not exist (already fixed)');
            } else {
                throw err;
            }
        }

        // Verify remaining indexes
        const remainingIndexes = await usersCollection.indexes();
        console.log('Remaining indexes:', remainingIndexes);

        console.log('\n✅ Database index fix complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error fixing index:', error);
        process.exit(1);
    }
}

fixUserIndex();
