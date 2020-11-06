const db = require("../../../config/Database_config/db");
const email = require("../../common/Error_Rerports");

const fetch_task_year = (inspector, res) => {
  let sql = "SELECT ";
  // sql += "a.id, ";
  sql += "DATE_FORMAT(a.end, '%Y') AS task_year ";
  sql += "FROM work_queue_task a ";
  sql += "WHERE a.inspector = ? AND a.end IS NOT NULL";

  db.query(sql, [inspector], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return email(err, res);
    }

    return res.status(200).send(rows);
  });
};

const fetch_month_in_task_year = (task_year, res) => {
  let sql = "SELECT ";
  sql += "DATE_FORMAT(a.end, '%b') AS month_in_task_year ";
  sql += "FROM work_queue_task a ";
  sql += "WHERE DATE_FORMAT(a.end, '%Y') = ? AND a.end IS NOT NULL";
  db.query(sql, [task_year], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return email(err, res);
    }

    return res.status(200).send(rows);
  });
};

const fetch_tasks_per_month_in_task_year = (month, res) => {
  let sql = "SELECT ";
  sql += "a.id ";
  sql += "FROM work_queue_task a ";
  sql += "WHERE DATE_FORMAT(a.end, '%b') = ? AND a.end IS NOT NULL";
  db.query(sql, [month], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return email(err, res);
    }

    return res.status(200).send(rows);
  });
};

module.exports.fetch_task_year = fetch_task_year;
module.exports.fetch_month_in_task_year = fetch_month_in_task_year;
module.exports.fetch_tasks_per_month_in_task_year = fetch_tasks_per_month_in_task_year;
