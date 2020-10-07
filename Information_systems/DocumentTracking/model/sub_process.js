const db = require("../../../config/Database_config/db");

const sub_process = (document_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.trans_id AS trans_id, ";
  sql += "a.remarks AS remarks, ";
  sql += "a.destinationType AS destinationType, ";
  sql += "a.destination AS destination, ";
  sql += "b.name AS name, ";
  sql += "c.status AS status, ";
  sql += "DATE_FORMAT(a.date_time, '%M %d, %Y @ %h:%i:%s %p') AS date_time ";
  sql += "FROM documentlogs a ";
  sql += "JOIN users b ON  a.user_id = b.user_id ";
  sql += "JOIN documentstatus c ON a.status = c.statid ";
  sql += "WHERE a.document_id = ?";
  db.query(sql, [document_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = sub_process;
