const db = require("../../../config/Database_config/db");
const { request } = require("express");

const client_job_request = (user_id, res) => {
  let sql = "";
  sql += "SELECT ";
    sql += "a.id AS task_id, ";
    sql += "a.start AS task_start, ";
    sql += "a.end AS task_end, "; 
    sql += "b.name AS inspector, ";
    sql += "c.status AS status ";
    sql += "FROM work_queue_task a ";
    sql += "LEFT JOIN users b ON a.inspector = b.user_id ";
    sql += "LEFT JOIN (SELECT id,task_id, status FROM work_queue_logs ORDER BY id DESC LIMIT 1) c ON a.id = c.task_id ";
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
