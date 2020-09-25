const db = require("../../../config/Database_config/db");
const { request } = require("express");

const client_job_request = (user_id, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.id AS task_id, ";
  sql += "DATE_FORMAT(a.start,'%M %d, %Y @ %h:%i:%s %p ') AS task_start, ";
  sql += "DATE_FORMAT(a.end,'%M %d, %Y @ %h:%i:%s %p ') AS task_end, ";
  sql += "a.scope_of_work, ";
  sql += "DATE_FORMAT(a.deadline,'%M %d, %Y ') AS date_needed, ";
  sql += "DATE_FORMAT(a.date,'%M %d, %Y ') AS date_requested, ";

  sql += "b.name AS inspector, ";
  sql += "c.status AS status ";
  sql += "FROM work_queue_task a ";
  sql += "LEFT JOIN users b ON a.inspector = b.user_id ";
  sql +=
    "LEFT JOIN (SELECT id,task_id, status FROM work_queue_logs ORDER BY id DESC LIMIT 1) c ON a.id = c.task_id ";
  sql += "WHERE a.requisitioner = ?";

  db().query(sql, [parseInt(user_id)], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(rows);
  });
};

module.exports = client_job_request;
