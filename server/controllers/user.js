const path = require('path');
const fs = require('fs');

const Product = require('../models/product');
const ProductType = require('../models/productType');
const User = require('../models/user');
const Order = require('../models/order');
const helpers = require('../util/helpers');

exports.getProfile = async (req, res, next) => {
    const [[user]] = await User.fetchByUsername(req.params.username);
    if (!user) {
        return res.status(404).json({
            message: "This user does not exist.",
            profileName: null,
            username: null
        })
    }
    return res.status(200).json({
        message: "Profile for user found!",
        profileName: req.params.username,
        username: req.username
    })
}

exports.getMyProducts = async (req, res, next) => {
    // TODO get actual profile's username
    const username = req.params.username;
    try {
        const [[user]] = await User.fetchByUsername(username);
        if (!user) {
            return res.status(404).json({
                message: "This user does not exist, thus has no products."
            })
        }
        const [products] = await Product.fetchBySeller(user.id);
        const [productTypes] = await ProductType.fetchAll();
        const updatedProducts = helpers.updateProductsList(products, productTypes);
        return res.status(200).json({
            message: "User's products fetched successfully!",
            products: JSON.stringify(updatedProducts),
            profileName: JSON.stringify(username),
        })
    } catch(err) {
        console.log(err);
        throw err;
    }   
}


exports.getCreateProduct = async (req, res, next) => {
    try {
        const [productTypes] = await ProductType.fetchAll();
        return res.status(200).json({
            productTypes: JSON.stringify(productTypes),
        })
    } catch(err) {
          console.log(err);
          throw err;
    }
}

exports.postCreateProduct = async (req, res, next) => {

    const name = JSON.parse(req.body.name);
    const productTypeId = JSON.parse(req.body.productTypeId);
    const price = JSON.parse(req.body.price);
    const size = JSON.parse(req.body.size);
    const imageFile = req.file;
    const description = JSON.parse(req.body.description);

    const errors = [];

    if (!name || name.length < 3) {
        errors.push("Name must be at least 3 characters long.")
    }
    if (!price || price.length < 1) {
        errors.push("Please enter a valid price.");
    }
    if (!productTypeId) {
        errors.push("Select a product type.");
    }
    if (!size || size.length < 1) {
        errors.push("Please add an appropriate size.");
    }
    if (!imageFile) {
        errors.push("Please add an image.");
    }
    if (!description || description.length < 5) {
        errors.push("Provide some description, with at least 5 characters.");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Invalid product information",
            errors: errors
        })
    }

    try {
        const product = new Product(
            name,
            productTypeId,
            price,
            size,
            req.userId,
            imageFile.path,
            description
        );
        console.log(product);
        await product.save()
        const [[creator]] = await User.fetchById(req.userId);
        return res.status(201).json({
            message: 'Product successfully created!',
            sellerName: creator.username,
            errors: errors
        })
    } catch(err) {
        // TODO
        console.log(err);
        throw err;
    }
}

exports.editProduct = async (req, res, next) => {
    // if there's a new image, replace old image with it
    let imagePath = req.body.oldImage;
    if (req.file) {
        const filePath = path.join(__dirname, '..', imagePath);
        fs.unlink(filePath, err => console.log(err));
        imagePath = req.file.path;
    }

    try {
        await Product.update(
            req.body.name,
            req.body.productTypeId,
            req.body.price,
            req.body.size,
            imagePath,
            req.body.description,
            req.body.soldOut,
            req.body.productId
        )
        return res.status(201).json({
            message: 'Product successfully updated!',
        })
    } catch(err) {
        console.log(err);
        throw err;
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        await Product.delete(req.body.productId);
        return res.status(200).json({
            message: 'Product successfully deleted!',
        })
    } catch(err) {
        console.log(err);
        throw err;
    }
}

exports.getMyOrders = async (req, res, next) => {
    try {
        const [[user]] = await User.fetchByUsername(req.params.username);
        if (!user) {
            return res.status(404).json({
                message: "This user does not exist, thus has no orders."
            })
        }
        const [orders] = await Order.fetchAllByBuyer(user.id);
        const productList = await Promise.all(orders.map(async (order) => {
            const [[product]] = await Product.fetchOne(order.productId);
            return product;
        }));
        const orderList = productList.map((p, index) => {
            return {
                ...p,
                orderId: orders[index].id
            }
        });
        return res.status(200).json({
            orders: JSON.stringify(orderList),
            profileName: JSON.stringify(user.username),
        })
    } catch(err) {
        console.log(err);
        throw err;
    }
}

// need this for 'My Profile' navigation link at start of app
exports.getUsername = (req, res, next) => {
    return res.status(200).json({
        username: req.username
    })
}