const db = require("./db_conf.js");

module.exports.all = () => {
    const stmt = db.prepare("SELECT id,firstname,surname, email FROM users WHERE is_coach = 1");
    return stmt.all();
};