const db = require("../../../config/Database_config/db");

const total_pending_documents = (user_id, socket) => {
  const sql =
    "SELECT * FROM documentlogs WHERE user_id = ? AND status = ? AND notification = ?";
  db().query(sql, [user_id, "1", "0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }
    socket.emit("total_pendings", rows.length);
  });
};

module.exports = total_pending_documents;
