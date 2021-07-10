const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const authorizers = require('../middleware/authorizers');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/get-token', authorizers.isLoggedIn, authController.getToken);

module.exports = router;