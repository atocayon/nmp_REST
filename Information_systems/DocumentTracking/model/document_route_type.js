const db = require("../../../config/Database_config/db");

const document_route_type = (doc_id, res) => {
  let sql = "";
  sql +=
    "SELECT a.creator AS creator, a.subject AS subject, a.doc_type AS doc_type, a.note AS note ";
  sql += "FROM documents a WHERE a.ref = ? ";
  db.query(sql, [docId], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_route_type;
