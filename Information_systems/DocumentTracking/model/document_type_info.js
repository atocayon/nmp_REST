const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_type_info = (doc_type_id, res) => {
  const sql = "SELECT * FROM document_type WHERE id = ?";
  db.query(sql, [parseInt(docTypeId)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send(rows[0]);
  });
};

module.exports = document_type_info;
