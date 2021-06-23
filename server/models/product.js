const db = require('../util/database');

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
        return db.execute(
            'INSERT INTO products (name, productTypeId, price, size, sellerId, image, description, sold) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.name, this.productTypeId, this.price, this.size, this.sellerId, this.image, this.description, this.sold]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static fetchByTypeId(typeOfProductId) {
        return db.execute('SELECT * FROM products WHERE products.productTypeId = ?', [typeOfProductId]);
    }

    static fetchBySeller(idOfSeller) {
        return db.execute('SELECT * FROM products WHERE products.sellerId = ?', [idOfSeller]);
    }

    static fetchOne(idOfProduct) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [idOfProduct]);
    }

    static soldOut(idOfProduct) {
        return db.execute('UPDATE products SET sold = ? WHERE products.id = ?', [true, idOfProduct]);
    }

    static update(nameOfProduct, productTypeIdOfProduct, priceOfProduct, sizeOfProduct, imageOfProduct, descriptionOfProduct, soldOfProduct, idOfProduct) {
        return db.execute(
            'UPDATE products SET name = ?, productTypeId = ?, price = ?, size = ?, image = ?, description = ?, sold = ? WHERE products.id = ?',
            [nameOfProduct, productTypeIdOfProduct, priceOfProduct, sizeOfProduct, imageOfProduct, descriptionOfProduct, soldOfProduct, idOfProduct]
        );
    }

    static delete(idOfProduct) {
        return db.execute('DELETE FROM products WHERE id = ?', [idOfProduct])
    }
}