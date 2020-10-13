const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_category_update = (data, user_id, res) => {
  for (let i = 0; i < data.length; i++) {
    const sql = "UPDATE doc_category SET category = ? WHERE id = ?";
    db.query(sql, [data[i].category, parseInt(data[i].id)], function (
      err,
      result
    ) {
      if (err) {
        return report(err, res);
      }
      return res.status(200).send("success");
    });
  }
};

module.exports = document_category_update;
