const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        // Get user from database using ID from authMiddleware
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if user has superadmin role
        if (user.role !== 'superadmin') {
            return res.status(403).json({ msg: 'Access denied. Superadmin privileges required.' });
        }

        // User is superadmin, proceed to next middleware/route
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
