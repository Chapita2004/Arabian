const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const superadmin = require('../middlewares/superadminMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', auth, superadmin, upload.single('image'), productController.createProduct);
router.put('/:id', auth, superadmin, upload.single('image'), productController.updateProduct);
router.delete('/:id', auth, superadmin, productController.deleteProduct);

module.exports = router;
