const db = require("../../../config/Database_config/db");

const document_action_taken = (receiver_id, doc_id, res) => {
  const sql =
    "SELECT remarks FROM documentlogs WHERE user_id = ? AND document_id = ? AND (status = ? || status = ?)";
  db.query(sql, [receiver_id, doc_id, "2", "4"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(rows[0]);
  });
};

module.exports = document_action_taken;
