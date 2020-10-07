const db = require("../../../config/Database_config/db");

const document_barcode = (doc_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.documentID ";
  sql += "FROM documents a ";
  sql += "WHERE a.documentID = ? ";

  db.query(sql, [doc_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_barcode;
