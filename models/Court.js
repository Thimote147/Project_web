const db = require("./db_conf.js");

module.exports.all = () => {
    const stmt = db.prepare("SELECT id, name, flooring FROM courts");
    return stmt.all();
};

module.exports.findById = (id) => {
    const stmt = db.prepare("SELECT * FROM courts WHERE id = ?");
    return stmt.get(id);
};