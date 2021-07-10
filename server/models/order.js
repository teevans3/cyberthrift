const db = require('../util/database').knex;

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
        return db.insert({
            buyerId: this.buyerId,
            sellerId: this.sellerId,
            productId: this.productId,
            cardNumber: this.cardNumber,
            cardExpiration: this.cardExpiration,
            svcNumber: this.svcNumber
        }).into('orders');
    }

    static async fetchSomeByBuyer(idOfBuyer) {
        const limitedOrders = await db.select().table('orders').where({ buyerId: idOfBuyer }).limit(6);
        let moreOrders = false;
        const allOrders = await this.fetchAllByBuyer(idOfBuyer);
        if (limitedOrders.length < allOrders.length) {
            moreOrders = true;
        }
        return {
            orders: limitedOrders,
            moreOrders: moreOrders
        }
    }

    static fetchAllByBuyer(idOfBuyer) {
        return db.select().table('orders').where({ buyerId: idOfBuyer });
    }
}