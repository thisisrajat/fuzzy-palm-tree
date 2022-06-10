const env = process.env.NODE_ENV;
const dbConf = require("../../knexfile")[env];
const db = require("knex")(dbConf);

module.exports = db;
