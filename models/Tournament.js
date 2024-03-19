const db = require("./db_conf.js");

module.exports.all = () => {
    const stmt = db.prepare("SELECT id, name, date, max_pers FROM tournaments");
    return stmt.all();
};

module.exports.findById = (id) => {
    const stmt = db.prepare("SELECT t.id, t.name, t.date, u.firstname AS coach, t.person, t.max_pers FROM tournaments t, users u WHERE t.coach = u.id AND t.id = ?");
    return stmt.get(id);
};