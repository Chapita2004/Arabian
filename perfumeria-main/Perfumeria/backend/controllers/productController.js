const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        // Graceful degradation: Return empty array instead of 500 error
        res.json([]);
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Product not found' });
        res.status(500).send('Server Error');
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Admin only - TODO: Add admin middleware check)
exports.createProduct = async (req, res) => {
    const {
        name, brand, price, stock, description,
        images, category, notes,
        gender, size, concentration, olfactoryFamily
    } = req.body;

    // If a file was uploaded via multer-cloudinary, use its URL; otherwise fall back to body
    const image = req.file ? req.file.path : req.body.image;

    try {
        const newProduct = new Product({
            name,
            brand,
            price,
            stock,
            description,
            image,
            images,
            category,
            notes,
            gender,
            size,
            concentration,
            olfactoryFamily
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // If a new file was uploaded via multer-cloudinary, update the image URL
        if (req.file) {
            product.image = req.file.path;
        }

        // Update remaining fields if they exist in body
        const fields = [
            'name', 'brand', 'price', 'stock', 'description',
            'image', 'images', 'category', 'notes',
            'gender', 'size', 'concentration', 'olfactoryFamily'
        ];
        fields.forEach(field => {
            if (req.body[field] !== undefined) product[field] = req.body[field];
        });

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        // Find by ID and delete
        const product = await Product.findOneAndDelete({ _id: req.params.id });

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Product not found' });
        res.status(500).send('Server Error');
    }
};

