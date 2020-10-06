const db = require("../../../config/Database_config/db");

const job_request_logs = (task_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.status, ";
  sql += "a.remarks, ";
  sql += "DATE_FORMAT(a.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS dateTime ";
  sql += "FROM work_queue_logs a ";
  sql += "WHERE a.task_id = ? ORDER BY a.id DESC";

  db().query(sql, [task_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    
    return res.status(200).send(rows);
  });
};

module.exports = job_request_logs;
