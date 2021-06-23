const Product = require('../models/product');
const ProductType = require('../models/productType');

exports.getProductsByType = async (typeOfProduct) => {
    try {
        const [[productType]] = await ProductType.fetchByTypeName(typeOfProduct);
        const [products] = await Product.fetchByTypeId(productType.id);
        return products;
    } catch(err) {
        // TODO
        console.log(err);
    }
}

// updated list to include productTypeName, not just TypeId
exports.updateProductsList = (products, productTypes) => {
    return products.map((p, index) => {
        let pType;
        productTypes.forEach(t => {
            if (t.id === p.productTypeId) {
                pType = t.type;
            }
        })
        return {
            ...p,
            productTypeName: pType
        }
    })
}
