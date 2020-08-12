const db = require("../../../config/Database_config/db");

const document_current_status = (doc_id, res) => {
  let sql = "";
  sql +=
    "SELECT a.status FROM documentLogs a WHERE document_id = ? ORDER BY trans_id DESC LIMIT 1";
  db().query(sql, [docId], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows[0].status);
  });
};

module.exports = document_current_status;
