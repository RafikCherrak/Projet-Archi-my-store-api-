const express = require('express');

const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.getProducts);
router.get('/filtered-products', productController.getProductFiltered);
router.get('/:id', productController.getProduct);
router.post('/interested', productController.postForm);

module.exports = router;
