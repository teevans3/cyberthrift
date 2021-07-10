const db = require('../util/database').knex;

module.exports = class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    save() {
        return db.insert({
            username: this.username,
            email: this.email,
            password: this.password
        }).into('users');
    }

    static fetchByEmail(emailOfUser) {
        return db.select().table('users').where({ email: emailOfUser }).first();
    }

    static fetchById(idOfUser) {
        return db.select().table('users').where({ id: idOfUser }).first();
    }

    static fetchByUsername(nameOfUser) {
        return db.select().table('users').where({ username: nameOfUser }).first();
    }
}