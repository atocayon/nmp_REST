const db = require("../../../config/Database_config/db");
const email = require("../../common/Error_Rerports");

const document_route = (doc_id, res) => {
  let sql = "";
  sql += "SELECT a.documentID ";
  sql += "FROM documents a ";
  sql += "WHERE  a.ref = ? ";
  db.query(sql, [doc_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return email(err, res);
    }

    if (rows.length > 0) {
      return res.status(200).send("multiple");
    } else {
      return res.status(200).send("single");
    }
  });
};

module.exports = document_route;
