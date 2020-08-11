const db = require("../../../config/Database_config/db");

const document_action_req = (doc_id, res) => {
  const sql = "SELECT * FROM document_action_req WHERE documentID = ?";
  db().query(sql, [docId], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_action_req;
