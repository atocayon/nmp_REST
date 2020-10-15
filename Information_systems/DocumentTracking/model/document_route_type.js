const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_route_type = (doc_id, res) => {
  let sql = "";
  sql +=
    "SELECT a.creator AS creator, a.subject AS subject, a.doc_type AS doc_type, a.note AS note ";
  sql += "FROM documents a WHERE a.ref = ? ";
  db.query(sql, [doc_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_route_type;
