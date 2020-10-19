const db = require("../../../config/Database_config/db");
const email = require("../../common/Error_Rerports");

const fetch_total_task_rendered_office = (inspector, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "b.secshort, ";
  sql += "GROUP_CONCAT(a.id) AS task_id ";
  sql += "FROM work_queue_task a ";
  sql += "LEFT JOIN sections b ON a.section = b.secid  WHERE a.inspector = ? AND a.end IS NOT NULL ";
  sql += "GROUP BY a.section ";
  db.query(sql, [inspector], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return email(err, res);
    }

    return res.status(200).send(rows);
  });
};

module.exports = fetch_total_task_rendered_office;
