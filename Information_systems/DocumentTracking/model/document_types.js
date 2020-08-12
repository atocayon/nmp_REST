const db = require("../../../config/Database_config/db");

const document_type = (res) => {
  const sql = "SELECT * FROM document_type";
  db().query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_type;
