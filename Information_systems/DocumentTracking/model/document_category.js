const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_category = (user_id, res) => {
  const fetchSection = "SELECT a.section FROM users a WHERE a.user_id = ?";
  db.query(fetchSection, [user_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }
    const fetchSectionCategory =
      "SELECT a.category AS category, a.id AS id FROM doc_category a WHERE a.section_id = ?";

    db.query(fetchSectionCategory, [rows[0].section], function (
      err,
      rows,
      fields
    ) {
      if (err) {
        console.log(err);
        return report(err, res);
      }

      return res.status(200).send(rows);
    });
  });
};

module.exports = document_category;
