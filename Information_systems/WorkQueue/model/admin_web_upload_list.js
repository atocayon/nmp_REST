const db = require("../../../config/Database_config/db");

const admin_web_upload_list = (res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.id, ";
  sql += "a.upload_title, ";
  sql += "a.validator, ";
  sql += "b.name AS requisitioner, ";
  sql +=
    "DATE_FORMAT(a.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time_requested ";
  sql += "FROM web_upload a ";
  sql += "LEFT JOIN users b ON a.requisitioner = b.user_id ";
  sql += "WHERE a.validator IS NOT NULL ORDER BY a.id DESC";
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = admin_web_upload_list;
