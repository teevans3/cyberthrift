const db = require('../util/database').knex;

module.exports = class ProductTypes {

    static fetchById(idOfProductType) {
        return db.select().table('productTypes').where({ id: idOfProductType }).first();
    }

    static fetchByTypeName(nameOfProductType) {
        return db.select().table('productTypes').where({ type: nameOfProductType}).first();
    }

    static fetchAll() {
        return db.select().table('productTypes');
    }
}