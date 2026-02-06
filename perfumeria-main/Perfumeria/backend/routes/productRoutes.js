const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// const auth = require('../middlewares/authMiddleware'); // Uncomment for protected routes later

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct); // Protect this route
router.put('/:id', productController.updateProduct); // Protect this route
router.delete('/:id', productController.deleteProduct); // Protect this route

module.exports = router;
