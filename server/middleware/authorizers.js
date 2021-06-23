const e = require('express');
const jwt = require('jsonwebtoken');

// show errors for any of these????

// gets a user's info - specifically for profile page
// (need SOMETHING for username, whether it be a string or null)
// need this because users should be able to view profiles without being logged in
exports.getUserInfo = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'SECRETSECRETSECRET');
        req.userId = decodedToken.userId;
        req.username = decodedToken.username;
        req.userEmail = decodedToken.userEmail

    } catch(err) {
        req.userId = null;
        req.username = null;
        req.userEmail = null;
    }

    next();
}

// checks if user is logged in, for create/edit-product, product page,
exports.isLoggedIn = (req, res, next) => {
    
    // assume user is already logged in
    let loggedIn = true;
    let decodedToken;
    const token = req.get('Authorization').split(' ')[1];

    try {
        decodedToken = jwt.verify(token, 'SECRETSECRETSECRET');
    } catch(err) {
        loggedIn = false;
        return res.status(401).json({
            message: 'User is not logged in.'
        })
    }
    // if not verified
    if (!decodedToken || !loggedIn) {
        const error = new Error('Not authenticated - User not logged in.');
        error.statusCode = 401;
        throw error;

    }
    
    req.userId = decodedToken.userId;
    req.username = decodedToken.username;
    req.userEmail = decodedToken.userEmail

    next();

}

exports.isMyProfile = (req, res, next) => {
    if (req.params.username !== req.username) {
        const error = new Error('Not authenticated - This is not your profile.');
        error.statusCode = 401;
        throw error;
    }
    next();
}

exports.isMyProduct = (req, res, next) => {
    if (req.body.sellerId.toString() !== req.userId.toString()) {
        const error = new Error('Not authenticated - This is not your product.');
        error.statusCode = 401;
        throw error;
    }
    next();
}
