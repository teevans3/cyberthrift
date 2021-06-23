const Product = require('../models/product');
const Order = require('../models/order');

exports.getCheckout = async (req, res, next) => {
    // TODO - show different page if product is sold out
    try {
        const [[product]] = await Product.fetchOne(req.params.productId);
        if (!product) {
            return res.status(404).json({
                message: "Product does not exist!",
            });
        }
        return res.status(200).json({
            message: "Product successfully fetched!",
            product: JSON.stringify(product)
        });
    } catch(err) {
        console.log(err);
        throw err;
    }
}

exports.postCheckout = async (req, res, next) => {
    const cardNumber = req.body.cardNumber;
    const cardExpiration = req.body.cardExpiration;
    const svcNumber = req.body.svcNumber;

    const errors = [];

    if (cardNumber.length !== 16) {
        errors.push("Card number must be 16 numbers long.")
    }
    if (cardExpiration.length !== 4) {
        errors.push("Card expiration must follow format: MM/YY.")
    }
    if (svcNumber.length !== 3) {
        errors.push("Card number must be 3 numbers long.")
    }
    if (errors.length > 0) {
        return res.status(400).json({
            message: "Invalid credit card information",
            errors: errors
        })
    }

    try {
        // create a new order object, change product to "sold out"
        const order = new Order(
            req.body.buyer,
            req.body.sellerId,
            req.body.productId,
            req.body.cardNumber,
            req.body.cardExpiration,
            req.body.svcNumber
        );
        await order.save()
        await Product.soldOut(req.body.productId);
        return res.status(200).json({
            message: "PRODUCT SOLD",
            errors: []
        })
    } catch(err) {
        console.log(err);
        throw err;
    }
}