const mysql = require("mysql");
require("dotenv/config");

const db = mysql.createPool({
  connectionLimit: parseInt(process.env.CONNECTION_LIMIT),
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

module.exports = db;
