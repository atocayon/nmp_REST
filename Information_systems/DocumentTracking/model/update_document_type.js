const db = require("../../../config/Database_config/db");

const update_document_type = (doc_type_id, doc_type, res) => {
  const sql = "UPDATE document_type SET type = ? WHERE id = ?";
  db.query(sql, [doc_type, parseInt(doc_type_id)], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = update_document_type;
