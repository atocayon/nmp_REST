const db = require("../../../config/Database_config/db");
const dateTime = require("../../common/Get_CurrentDateTime");
const job_request_action = (inspector_id, task_id, status, remarks, res) => {
  let sql = "";
  sql +=
    "UPDATE work_queue_task SET inspector = ?, start = ?, end = ? WHERE id = ?";
  db().query(
    sql,
    [
      inspector_id,
      dateTime(),
      status === "Reject" ? dateTime() : null,
      task_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      let sql1 = "";
      sql1 += "INSERT INTO work_queue_logs (task_id, status, remarks, date_time) VALUES ?";
      const val = [[task_id, status, remarks, dateTime()]];

      db().query(sql1, [val], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        return res.status(200).send("success");
      });
    }
  );
};

module.exports = job_request_action;
