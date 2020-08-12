const db = require("../../../config/Database_config/db");

const new_document_type = (doc_type, res) => {
  const sql = "INSERT INTO document_type (type) VALUES ?";
  const values = [[type]];
  db().query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = new_document_type;
