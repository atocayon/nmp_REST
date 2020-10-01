const mysql = require('mysql');
require("dotenv/config");
const db = () => {
    const db = mysql.createConnection({
        connectionLimit: parseInt(process.env.CONNECTION_LIMIT),
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    });

    db.connect((err) => {
        if (err){
            console.log(err);
        }else{
            console.log("======= mysql query successful =======");
        }
    });

    return db;
};

module.exports = db;