const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_category_delete = (doc_category_id, res) => {
  const sql = "DELETE FROM doc_category WHERE id = ?";
  db.query(sql, [parseInt(doc_category_id)], function (err, result) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send("success");
  });
};

module.exports = document_category_delete;
