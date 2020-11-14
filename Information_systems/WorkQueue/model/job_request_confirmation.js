const db = require("../../../config/Database_config/db");
const dateTime = require("../../common/Get_CurrentDateTime");
const job_request_confirmation = (task_id, status, remarks, res) => {
  let sql = "";
  sql += "INSERT INTO work_queue_logs ";
  sql += "(task_id, status, remarks, date_time) VALUES ? ";
  const val = [[task_id, status, remarks, dateTime()]];
  db.query(sql, [val], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    let sql1 = "";
    sql1 += "UPDATE work_queue_task SET confirmed = ? WHERE id = ?";
    db.query(sql1, ["1", task_id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).send("success");
    });
  });
};

module.exports = job_request_confirmation;
