const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");

const document_category_new = (user_id, category, res) => {
  const fetchSection = "SELECT a.section FROM users a WHERE a.user_id = ?";
  db.query(fetchSection, [user_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    const sql = "INSERT INTO doc_category(section_id, category) VALUES ?";
    const value = [[rows[0].section, category]];
    db.query(sql, [value], function (err, result) {
      if (err) {
        console.log(err);
        return report(err, res);
      }
      return res.status(200).send("inserted");
    });
  });
};

module.exports = document_category_new;
