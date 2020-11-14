const db = require("../../../config/Database_config/db");

const work_logs = () => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.id AS task_id, ";
  sql += "a.scope_of_work, ";
  sql += "DATE_FORMAT(a.deadline, '%Y-%b-%d') AS deadline, ";
  sql += "DATE_FORMAT(a.start, '%Y-%b-%d') AS start, ";
  sql += "DATE_FORMAT(a.end, '%Y-%b-%d') AS end, ";
  sql += "DATE_FORMAT(a.date, '%Y-%b-%d') AS date_created, ";
  sql += "b.name AS requisitioner, ";
  sql += "c.secshort, ";
  sql += "d.name AS inspector ";
  sql += "FROM work_queue_task a ";
  sql += "LEFT JOIN users b ON a.requisitioner = b.user_id ";
  sql += "LEFT JOIN sections c ON a.section = c.secid ";
  sql += "LEFT JOIN users d ON a.inspector = d.user_id ";
  sql += "ORDER BY a.id DESC";

  db.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }

    io.emit("work_logs", rows);
  });
};

module.exports = work_logs;
