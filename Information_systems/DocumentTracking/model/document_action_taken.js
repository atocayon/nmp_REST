const db = require("../../../config/Database_config/db");

const document_action_taken = (doc_id, res) => {
  const sql =
    "SELECT remarks FROM documentlogs WHERE  document_id = ? AND status in (?, ?)  AND notification = ?";
  db.query(sql, [doc_id, "2", "4", "1"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    console.log(rows);
    return res.status(200).send(rows);
  });
};

module.exports = document_action_taken;
