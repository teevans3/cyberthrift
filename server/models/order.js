const db = require('../util/database');

module.exports = class Order {
    // adding card info just in case (we may not need this)
    constructor(buyerId, sellerId, productId, cardNumber, cardExpiration, svcNumber) {
        this.buyerId = buyerId,
        this.sellerId = sellerId,
        this.productId = productId,
        this.cardNumber = cardNumber,
        this.cardExpiration = cardExpiration,
        this.svcNumber = svcNumber
    }

    save() {
        return db.execute('INSERT INTO orders (buyerId, sellerId, productId, cardNumber, cardExpiration, svcNumber) VALUES (?, ?, ?, ?, ?, ?)',
        [this.buyerId, this.sellerId, this.productId, this.cardNumber, this.cardExpiration, this.svcNumber]);
    }

    static fetchAllByBuyer(idOfBuyer) {
        return db.execute('SELECT * FROM orders WHERE orders.buyerId = ?', [idOfBuyer]);
    }
}