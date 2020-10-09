const db = require("../../../config/Database_config/db");

const document_sched_released = (doc_id, res) => {
  let sql = "";
  sql +=
    "SELECT DATE_FORMAT(date_time, '%c/%d/%y %h:%i %p') AS date_time_released ";
  sql += "FROM documentlogs ";
  sql += "WHERE document_id = ? AND status in (?, ?) AND notification = ? ";
  db.query(sql, [doc_id, "2", "4", "1"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = document_sched_released;
