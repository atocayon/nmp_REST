const mysql = require('mysql');
require("dotenv/config");
const db = () => {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    });

    db.connect((err) => {
        if (err){
            console.log(err);
        }else{
            console.log("MySQL Data fetched successfully...");
        }
    });

    return db;
};

module.exports = db;