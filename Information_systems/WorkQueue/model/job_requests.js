const db = require("../../../config/Database_config/db");

const job_requests = (user_id, res) => {
  let fetch_section = "SELECT a.section FROM users a WHERE user_id = ? ";
  db().query(fetch_section, [user_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    let sql = "";
    sql += "SELECT ";
    sql += "a.id AS ticket, ";
    sql += "DATE_FORMAT(a.date,'%M %d, %Y ')  AS date_requested, ";
    sql += "a.scope_of_work, ";
    sql += "DATE_FORMAT(a.deadline,'%M %d, %Y ') AS deadline, ";
    sql += "b.name AS requisitioner, ";
    sql += "b.position, ";
    sql += "GROUP_CONCAT(c.task) AS type_of_work "
    sql += "FROM work_queue_task a ";
    sql += "LEFT JOIN users b ON a.requisitioner = b.user_id ";
    sql += "LEFT JOIN work_queue_type_of_work c ON a.id = c.task_id ";
    sql += "WHERE a.section = ? AND a.inspector IS NULL GROUP BY a.id ORDER BY a.id";

    db().query(sql, [rows[0].section], (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).send(rows);
    });
  });
};

module.exports = job_requests;
