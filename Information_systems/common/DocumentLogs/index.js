const db = require("../../../config/Database_config/db");

const documentLogs = () => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.documentID, ";
  sql += "a.subject, ";
  sql += "a.note, ";
  sql +=
    "DATE_FORMAT(a.date_time_created, '%M %d, %Y @ %h:%i:%s %p ') as date_time_created, ";
  sql += "b.name AS creator, ";
  sql += "c.type AS doc_type ";
  sql += "FROM documents a ";
  sql += "LEFT JOIN users b ON a.creator = b.user_id ";
  sql += "LEFT JOIN document_type c ON a.doc_type = c.id ";
  sql += "ORDER BY a.documentID DESC";

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }

    io.emit("doc_logs", rows);
  });
};

module.exports = documentLogs;
