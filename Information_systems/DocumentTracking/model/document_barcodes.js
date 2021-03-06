const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_barcodes = (doc_id, res) => {
  let sql = " ";
  sql += "SELECT ";
  sql += "a.documentID, ";
  sql += "b.destination ";
  sql += "FROM documents a ";
  sql += "JOIN documentlogs b ON a.documentID = b.document_id ";
  sql += "WHERE a.ref = ? AND b.status = ? ";
  db.query(sql, [doc_id, "2"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_barcodes;
