const db = require("./db_conf.js");

/* Create a user */
module.exports.register = (firstname, surname, email, password, is_coach) => {
    const stmt = db.prepare("INSERT INTO users (firstname, surname, email, password, is_coach) values (?, ?, ?, ?, ?)");
    const info = stmt.run(firstname, surname, email, password, is_coach);
};

/* Return encrypted password for login */
module.exports.login = (email) => {
    const stmt = db.prepare("SELECT password FROM users WHERE email = ?");
    return stmt.get(email).password;
};

/* Return all informations about the user */
module.exports.data = (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
}