const db = require("../../../config/Database_config/db");

const validateCode = (user_id, code, res) => {
    let sql = "";
  sql += "SELECT * ";
  sql += "FROM users_code a ";
  sql += " WHERE a.user_id  = ?  AND a.code = ? ORDER BY id DESC LIMIT 1";

  db().query(sql, [user_id, code], (err, rows, fields) => {
    if(err){
        console.log(err);
        return res.status(200).send(err);
    }

    if(rows.length < 1 || rows.length === 0){
        return res.status(200).send("failed");
    }

    return res.status(200).send("success");
  });
};

module.exports = validateCode;