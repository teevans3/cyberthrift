const db = require('../util/database').knex;

module.exports = class Product {
    constructor(name, productTypeId, price, size, sellerId, image, description) {
        this.name = name;
        this.productTypeId = productTypeId,
        this.price = price,
        this.size = size,
        this.sellerId = sellerId,
        this.image = image,
        this.description = description,
        // default value is the item is NOT already sold
        this.sold = false
    }

    save() {
        return db.insert({
            name: this.name,
            productTypeId: this.productTypeId,
            price: this.price,
            size: this.size,
            sellerId: this.sellerId,
            image: this.image,
            description: this.description,
            sold: this.sold
        }).into('products');
    }

    static fetchAll() {
        return db.select().table('products');
    }

    static fetchByTypeId(typeOfProductId) {
        return db.select().table('products').where({ productTypeId: typeOfProductId});
    }

    static async fetchSomeBySeller(idOfSeller) {
        const limitedProducts = await db.select().table('products').where({ sellerId: idOfSeller }).limit(6);
        let moreProducts = false;
        const allProducts = await this.fetchAllBySeller(idOfSeller);
        if (limitedProducts.length < allProducts.length) {
            moreProducts = true;
        }
        return {
            products: limitedProducts,
            moreProducts: moreProducts
        }
    }

    static fetchAllBySeller(idOfSeller) {
        return db.select().table('products').where({ sellerId: idOfSeller });
    }

    static fetchOne(idOfProduct) {
        return db.select().table('products').where({ id: idOfProduct }).first();
    }

    static soldOut(idOfProduct) {
        // return db.execute('UPDATE products SET sold = ? WHERE products.id = ?', [true, idOfProduct]);
        return db.update({ sold: true }).table('products').where({ id: idOfProduct });
    }

    static update(nameOfProduct, productTypeIdOfProduct, priceOfProduct, sizeOfProduct, imageOfProduct, descriptionOfProduct, soldOfProduct, idOfProduct) {
        return db.update({
            name: nameOfProduct,
            productTypeId: productTypeIdOfProduct,
            price: priceOfProduct,
            size: sizeOfProduct,
            image: imageOfProduct,
            description: descriptionOfProduct,
            sold: soldOfProduct,
        }).table('products').where({ id: idOfProduct })
    }

    static delete(idOfProduct) {
        return db('products').where({ id: idOfProduct }).del();
    }
}