const mysql = require('mysql');

const db = () => {
    const db = mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: "",
        database: process.env.DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
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