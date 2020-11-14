const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_types = (res) => {
  const sql = "SELECT id, type FROM document_type";
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return report(err, res);
    }
    return res.status(200).send(rows);
  });
};

module.exports = document_types;
