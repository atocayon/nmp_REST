const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_destination = (doc_id, res) => {
  let sql = "";
  sql += "SELECT a.remarks AS remarks, a.document_id AS document_id, ";
  sql += "DATE_FORMAT(a.date_time, '%c/%d/%y %h:%i %p') AS date_time_receive, ";
  sql += "b.name AS receiver, ";
  sql += "a.user_id AS receiver_id, ";
  sql += "c.secshort AS section ";
  sql += "FROM documentlogs a ";
  sql += "JOIN users b ";
  sql += "ON a.user_id = b.user_id ";
  sql += "JOIN sections c ";
  sql += "ON b.section = c.secid ";
  sql += "WHERE a.document_id = ? ";
  sql += "AND a.status in (?, ?) AND a.notification = ?";

  db.query(sql, [doc_id, "2", "4", "1"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_destination;
