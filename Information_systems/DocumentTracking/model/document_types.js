const db = require("../../../config/Database_config/db");

const document_types = (res) => {
  const sql = "SELECT id, type FROM document_type";
  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(rows);
  });
};

module.exports = document_types;
