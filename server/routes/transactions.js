const express = require('express');

const router = express.Router();

const transactionsController = require('../controllers/transactions');
const authorizers = require('../middleware/authorizers');

router.get('/:productType/:productId/checkout', authorizers.isLoggedIn, transactionsController.getCheckout);
router.post('/:productType/:productId/checkout', authorizers.isLoggedIn, transactionsController.postCheckout);

module.exports = router;