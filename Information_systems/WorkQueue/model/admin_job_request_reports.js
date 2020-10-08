const db = require("../../../config/Database_config/db");

const admin_job_request_reports = (user_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.id AS task_id, ";
  sql += "a.scope_of_work, ";
  sql += "DATE_FORMAT(a.deadline,'%M %d, %Y ') AS deadline, ";
  sql += "DATE_FORMAT(a.start,'%M %d, %Y @ %h:%i:%s %p ') AS start, ";
  sql += "DATE_FORMAT(a.start, '%M') AS month_start, ";
  sql += "DATE_FORMAT(a.start, '%Y') AS year_start, ";
  sql += "DATE_FORMAT(a.end,'%M %d, %Y @ %h:%i:%s %p ') AS end, ";
  sql += "DATE_FORMAT(a.date,'%M %d, %Y ') AS dateRequested, ";
  sql += "b.name AS requisitioner, ";
  sql += "c.section ";
  sql += "FROM work_queue_task a ";
  sql += "LEFT JOIN users b ON a.requisitioner = b.user_id ";
  sql += "LEFT JOIN sections c ON b.section = c.secid ";
  sql +=
    "WHERE a.inspector = ? AND a.start IS NOT NULL AND a.end IS NOT NULL ORDER BY a.id DESC ";

  db.query(sql, [user_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = admin_job_request_reports;
