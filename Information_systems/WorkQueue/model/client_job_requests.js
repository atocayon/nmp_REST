const db = require("../../../config/Database_config/db");
const { request } = require("express");

const client_job_request = (user_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.id AS task_id, ";
  sql += "DATE_FORMAT(a.start,'%M %d, %Y @ %h:%i:%s %p ') AS task_start, ";
  sql += "DATE_FORMAT(a.end,'%M %d, %Y @ %h:%i:%s %p ') AS task_end, ";
  sql += "DATE_FORMAT(a.start, '%Y-%m-%d') AS start, ";
  sql += "DATE_FORMAT(a.end, '%Y-%m-%d') AS end, ";
  sql += "a.scope_of_work, ";
  sql += "DATE_FORMAT(a.deadline,'%M %d, %Y ') AS date_needed, ";
  sql += "DATE_FORMAT(a.date,'%M %d, %Y ') AS date_requested, ";
  sql += " d.section, ";
  sql += "b.name AS inspector, ";
  sql += "c.status AS status ";
  sql += "FROM work_queue_task a ";
  sql += "LEFT JOIN users b ON a.inspector = b.user_id ";
  sql +=
    "LEFT JOIN work_queue_logs c ON a.id = c.task_id AND c.id = (SELECT MAX(id) FROM work_queue_logs cc WHERE cc.task_id = c.task_id)";
  sql += "LEFT JOIN sections d ON a.section = d.secid ";
  sql += "WHERE a.requisitioner = ?";

  db.query(sql, [parseInt(user_id)], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(rows);
  });
};

module.exports = client_job_request;
