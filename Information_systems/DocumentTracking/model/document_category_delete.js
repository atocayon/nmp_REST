const db = require("../../../config/Database_config/db");

const document_category_delete = (doc_category_id, res) => {
  const sql = "DELETE FROM doc_category WHERE id = ?";
  connection.query(sql, [parseInt(doc_category_id)], function (err, result) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = document_category_delete;
