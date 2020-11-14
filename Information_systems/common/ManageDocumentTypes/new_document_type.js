const db = require("../../../config/Database_config/db");
const report = require("../Error_Rerports");

const new_document_type = (doc_type, res) => {
  const sql = "INSERT INTO document_type (type) VALUES ?";
  const values = [[doc_type]];
  db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send("success");
  });
};

module.exports = new_document_type;
