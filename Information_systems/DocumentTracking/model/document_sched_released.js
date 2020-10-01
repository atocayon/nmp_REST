const db = require("../../../config/Database_config/db");

const document_sched_released = (receiver_id, doc_id, res) => {
  let sql = "";
  sql +=
    "SELECT DATE_FORMAT(date_time, '%c/%d/%y %h:%i %p') AS date_time_released ";
  sql += "FROM documentlogs ";
  sql += "WHERE user_id = ? AND document_id = ? AND (status = ? || status =?)";
  db().query(sql, [receiver_id, doc_id, "2", "4"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows[0]);
  });
};

module.exports = document_sched_released;
