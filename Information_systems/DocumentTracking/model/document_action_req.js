const db = require("../../../config/Database_config/db");
const report = require("../../common/Error_Rerports");
const document_action_req = (doc_id, res) => {
  const sql = "SELECT * FROM document_action_req WHERE documentID = ?";
  db.query(sql, [doc_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return report(err, res);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_action_req;
