const db = require("../../../config/Database_config/db");

const document_tracking = (document_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.documentID AS document_id, ";
  sql += "a.subject, ";
  sql += "a.note, ";
  sql +=
    "DATE_FORMAT(a.date_time_created, '%M %d, %Y @ %h:%i:%s %p') AS date_time, ";
  sql += "b.name AS name, ";
  sql += "d.secshort AS section, ";
  sql += "c.type AS type ";
  sql += "FROM documents a ";
  sql += "JOIN users b ON a.creator = b.user_id ";
  sql += "JOIN document_type c ON a.doc_type = c.id ";
  sql += "JOIN sections d ON b.section = d.secid ";
  sql += "WHERE a.documentID = ?";
  db.query(sql, [document_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_tracking;
