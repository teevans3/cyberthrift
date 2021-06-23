const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.postSignup = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const errors = [];

    // form validation
    const [[existingUsername]] = await User.fetchByUsername(username);
    if (existingUsername) {
        errors.push("Username is taken.");
    }
    if (username.length < 5) {
        errors.push("Username must be at least 5 characters long.")
    }
    const [[existingEmail]] = await User.fetchByEmail(email);
    if (existingEmail) {
        errors.push("Email is taken.");
    }
    if (password !== confirmPassword) {
        errors.push("Passwords must match.")
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    // check for any form errors
    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Invalid signup information',
            errors: errors
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User(
            username, 
            email,
            hashedPassword
        );
        await user.save();
        return res.status(200).json({
            message: 'Successfully signed up!',
            errors: errors
        });
    } catch(err) {
        console.log(err);
        throw err;
    }    
}

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const errors = [];

    try {
        const [[user]] = await User.fetchByEmail(email);
        if (!user) {
            errors.push("No account exists for this user.");
        } else {
            const doMatch = await bcrypt.compare(password, user.password);
            if (!doMatch) {
                errors.push("Password is incorrect.");
            }
        }
        
        // check for any form errors
        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Invalid login information',
                errors: errors
            })
        }
        // log user in; create authorization token for requests; user stays logged in for 1 hour

        const token = jwt.sign(
            {
                userEmail: user.email,
                username: user.username,
                userId: user.id.toString()
            },
            'SECRETSECRETSECRET',
            { expiresIn: '1h'}
        );
        // don't think we need all this in json response...
        return res.status(200).json({
            message: "User successfully logged in!",
            auth: true,
            token: token,
            user: user,
            userId: user.id.toString(),
            errors: []
        });

    } catch(err) {
        console.log(err);
        throw err;
    }
}

exports.getToken = (req, res, next) => {
    return res.status(200).json({
        token: token
    })
}