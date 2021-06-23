const db = require('../util/database');

module.exports = class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    save() {
        return db.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [this.username, this.email, this.password]
        );
    }

    static fetchByEmail(emailOfUser) {
        return db.execute('SELECT * FROM users WHERE users.email = ?', [emailOfUser]);
    }

    static fetchById(idOfUser) {
        return db.execute('SELECT * FROM users WHERE users.id = ?', [idOfUser]);
    }

    static fetchByUsername(nameOfUser) {
        return db.execute('SELECT * FROM users WHERE users.username = ?', [nameOfUser]);
    }
}