const db = require("better-sqlite3")("./models/gestion.db", { verbose: console.log });

module.exports = db;