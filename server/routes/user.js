const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const authorizers = require('../middleware/authorizers');

router.get('/get-username', authorizers.getUserInfo, userController.getUsername);
router.get('/create-product', authorizers.isLoggedIn, userController.getCreateProduct);
router.post('/create-product', authorizers.isLoggedIn, userController.postCreateProduct);
router.patch('/edit-product', authorizers.isLoggedIn, authorizers.isMyProduct, userController.editProduct);
router.delete('/delete-product', authorizers.isLoggedIn, authorizers.isMyProduct, userController.deleteProduct);
router.get('/:username/profile', authorizers.getUserInfo, userController.getProfile);
router.get('/:username/my-products', userController.getMyProducts);
router.get('/:username/my-orders', authorizers.isLoggedIn, authorizers.isMyProfile, userController.getMyOrders);

module.exports = router;