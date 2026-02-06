const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, products: [] });
            await cart.save();
        }

        // Products are already embedded, just return them
        const formattedCart = cart.products.map(item => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            img: item.img,
            quantity: item.quantity
        }));

        res.json(formattedCart);
    } catch (err) {
        console.error('Error getting cart:', err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add/Update item in cart
// @route   POST /api/cart
// @access  Private
exports.updateCart = async (req, res) => {
    const { productId, quantity, name, price, img } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.productId === productId.toString());

        if (productIndex > -1) {
            // Product exists in cart, update quantity
            if (quantity <= 0) {
                // Remove if quantity is 0 or less
                cart.products.splice(productIndex, 1);
            } else {
                cart.products[productIndex].quantity = quantity;
            }
        } else if (quantity > 0) {
            // Add new product with snapshot data
            cart.products.push({
                productId: productId.toString(),
                name,
                price,
                img,
                quantity
            });
        }

        await cart.save();

        // Return updated cart formatted
        const formattedCart = cart.products.map(item => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            img: item.img,
            quantity: item.quantity
        }));

        res.json(formattedCart);
    } catch (err) {
        console.error('Error updating cart:', err.message);
        res.status(500).send('Server Error');
    }
};
