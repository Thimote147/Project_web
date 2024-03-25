const db = require("./db_conf.js");

module.exports.all = () => {
    const stmt = db.prepare("SELECT id, name, flooring FROM courts");
    return stmt.all();
};

module.exports.findById = (id) => {
    const stmt = db.prepare("SELECT * FROM courts WHERE id = ?");
    return stmt.get(id);
};

module.exports.add = (name, flooring, location, picture) => {
    const stmt = db.prepare("INSERT INTO courts (name, flooring, location, picture) VALUES (?, ?, ?, ?)");
    const info = stmt.run(name, flooring, location, picture);
};

module.exports.update = (id, name, flooring, location, picture) => {
    const stmt = db.prepare("UPDATE courts SET name = ?, flooring = ?, location = ?, picture = ? WHERE id = ?");
    const info = stmt.run(name, flooring, location, picture, id);
};