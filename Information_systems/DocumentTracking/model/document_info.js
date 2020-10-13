const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_info = (doc_id, res) => {
  let sql = "";
  sql += "SELECT a.subject as subject, ";
  sql += "a.note, ";
  sql += "a.category, ";
  sql += "a.creator AS creator_id, ";
  sql += "a.doc_type AS docTypeId, ";
  sql +=
    "DATE_FORMAT(a.date_time_created, '%M %d, %Y @ %h:%i %p') AS date_time_created, ";
  sql += "b.id as docType_id, ";
  sql += "b.type as type, ";
  sql += "c.name AS creator, ";
  sql += "c.position AS creatorPosition, ";
  sql += "d.secshort AS creatorSection ";
  sql += "FROM documents a ";
  sql += "JOIN document_type b ";
  sql += "ON a.doc_type = b.id ";
  sql += "JOIN users c ";
  sql += "ON a.creator = c.user_id ";
  sql += "JOIN sections d ";
  sql += "ON c.section = d.secid ";
  sql += "WHERE a.documentID = ? ORDER BY a.documentID ASC LIMIT 1";
  db.query(sql, [doc_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send(rows[0]);
  });
};

module.exports = document_info;
