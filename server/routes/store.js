const express = require('express');

const router = express.Router();

const storeController = require('../controllers/store');
const authorizers = require('../middleware/authorizers');

router.get('/:productType/:productId', authorizers.isLoggedIn, storeController.getProduct);
router.get('/:productType', storeController.getProductType);
router.get('/', storeController.getIndex);


module.exports = router;