const db = require("../../../config/Database_config/db");

const admin_job_list = (user_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.id AS task_id, ";
  sql += "a.scope_of_work, ";
  sql += "DATE_FORMAT(a.deadline,'%M %d, %Y ') AS deadline, ";
  sql += "a.deadline AS dateNeeded, ";
  sql += "DATE_FORMAT(a.start,'%M %d, %Y ') AS start, ";
  sql += "DATE_FORMAT(a.end,'%M %d, %Y ') AS end, ";
  sql += "DATE_FORMAT(a.date,'%M %d, %Y ') AS dateRequested, ";
  sql += "b.status, ";
  sql += "c.name AS requisitioner, ";
  sql += "GROUP_CONCAT(d.task) AS type_of_work ";
  sql += "FROM work_queue_task a ";
  sql +=
    "LEFT JOIN work_queue_logs b ON a.id = b.task_id AND b.id = (SELECT MAX(id) FROM work_queue_logs bb WHERE bb.task_id = b.task_id) ";
  sql += "LEFT JOIN users c ON a.requisitioner = c.user_id ";
  sql += "LEFT JOIN work_queue_type_of_work d ON a.id = d.task_id ";
  sql += "WHERE a.inspector = ? GROUP BY a.id  ORDER BY a.id DESC";
  db.query(sql, [user_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = admin_job_list;
