const db = require('../util/database');

module.exports = class ProductTypes {

    static fetchById(idOfProductType) {
        return db.execute('SELECT * FROM productTypes WHERE productTypes.id = ?', [idOfProductType])
    }

    static fetchByTypeName(nameOfProductType) {
        return db.execute('SELECT * FROM productTypes WHERE productTypes.type = ?', [nameOfProductType])
    }

    static fetchAll() {
        return db.execute('SELECT * FROM productTypes');
    }
}