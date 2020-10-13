const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_subject_search = (subj, res) => {
  let sql = "";
  sql += "SELECT a.documentId AS documentId, a.subject AS subject, ";
  sql += "b.name AS creator, ";
  sql += "b.position AS creatorPosition, ";
  sql += "d.secshort AS creatorSection ";
  sql += "FROM documents a ";
  sql += "JOIN users b ";
  sql += "ON a.creator = b.user_id ";
  sql += "JOIN sections d ";
  sql += "ON b.section = d.secid ";
  sql += "WHERE a.subject LIKE ? ORDER BY a.date_time_created DESC";

  db.query(sql, ["%" + subj + "%"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_subject_search;
