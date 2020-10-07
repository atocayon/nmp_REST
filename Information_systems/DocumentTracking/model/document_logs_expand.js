const db = require("../../../config/Database_config/db");

const document_logs_expand = (doc_id, status, res) => {
    let sql = "";
    sql += "SELECT a.document_id AS trans_id, ";
    sql += "c.name AS name, ";
    sql += "a.remarks AS remarks,  ";
    sql += "a.destinationType AS destinationType, ";
    sql += "a.destination AS destination, ";
    sql += "d.status AS status, ";
    sql += "DATE_FORMAT(a.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time ";
    sql += "FROM documentlogs a ";
    sql += "JOIN documents b ";
    sql += "ON a.document_id = b.documentID ";
    sql += "JOIN users c ";
    sql += "ON a.user_id = c.user_id ";
    sql += "JOIN documentstatus d ";
    sql += "ON a.status = d.statid ";
    sql += "WHERE a.document_id = ? AND d.status != ?";
    sql += "ORDER BY a.date_time ASC ";
    db.query(sql, [doc_id, status], function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      
      return res.status(200).send(rows);
    });
};

module.exports = document_logs_expand;