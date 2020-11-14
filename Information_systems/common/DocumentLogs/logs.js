const db = require("../../../config/Database_config/db");

const logs = (document_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.remarks, ";
  sql += "a.destination, ";
  sql += "DATE_FORMAT(a.date_time, '%M %d, %Y @ %h:%i:%s %p ') AS date_time, ";
  sql += "b.name AS user, ";
  sql += "c.status ";
  sql += "FROM documentlogs a ";
  sql += "LEFT JOIN users b ON a.user_id = b.user_id ";
  sql += "LEFT JOIN documentstatus c ON a.status = c.statid ";
  sql += "WHERE a.document_id = ? ";
  sql += "ORDER BY a.trans_id DESC ";

  db.query(sql, [document_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = logs;
