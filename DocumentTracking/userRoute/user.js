const express = require('express');
const router = express.Router();
const db = require("../../db");


router.get("/", (req, res) => {
    let sql = "";
    sql += "SELECT * FROM users";
    db().query(sql, (err, rows, fields) => {
        if (err){
            console.log(err);
        }
        res.json(rows);
    });
});


module.exports = router;