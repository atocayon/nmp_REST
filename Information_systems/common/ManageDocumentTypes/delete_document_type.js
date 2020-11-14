const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");
const delete_document_type = (doc_type_id, res) => {
  const sql = "DELETE FROM document_type WHERE id = ?";
  db.query(sql, [parseInt(doc_type_id)], function (err, result) {
    if (err) {
      console.log(err);

      return report(err, res);
    }

    return res.status(200).send("success");
  });
};

module.exports = delete_document_type;
