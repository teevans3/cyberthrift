const Product = require('../models/product');
const ProductType = require('../models/productType');
const User = require('../models/user');
const helpers = require('../util/helpers');

exports.getIndex = async (req, res, next) => {
    try {
        const [products] = await Product.fetchAll();
        const [productTypes] = await ProductType.fetchAll();
        // restructure the products array to include productType name (instead of id);
        const updatedProducts = helpers.updateProductsList(products, productTypes);

        return res.status(200).json({
            message: 'All products successfully fetched!',
            products: JSON.stringify(updatedProducts)
        })
    } catch(err) {
        console.log(err);
        throw err;
    }
}

exports.getProductType = async (req, res, next) => {
    try {
        const products = await helpers.getProductsByType(req.params.productType);
        const [productTypes] = await ProductType.fetchAll();
        const updatedProducts = helpers.updateProductsList(products, productTypes);
        return res.status(200).json({
            message: `${req.params.productType} successfully fetched!`,
            products: JSON.stringify(updatedProducts),
        });
    } catch(err) {
        console.log(err);
        throw err;
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const [[product]] = await Product.fetchOne(req.params.productId);
        if (!product) {
            return res.status(404).json({
                message: "Product could not be found."
            })
        }
        const [[seller]] = await User.fetchById(product.sellerId);
        const [productTypes] = await ProductType.fetchAll();

        return res.status(200).json({
            product: JSON.stringify(product),
            productTypes: JSON.stringify(productTypes),
            seller: JSON.stringify(seller),
            username: req.username,
        })
    } catch(err) {
        console.log(err);
        throw err;
    }
};
