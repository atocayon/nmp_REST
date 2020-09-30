const { check } = require("prettier");
const db = require("../../../config/Database_config/db");

const update_user = (data, res) => {
  const sql = "SELECT * FROM users WHERE user_id = ?";
  db().query(sql, [parseInt(data.user_id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (rows.length > 0) {
      let sql1 = "";
      sql1 += "UPDATE users ";
      sql1 += "SET employeeId = ? , ";
      sql1 += "name = ?, ";
      sql1 += "username = ?, ";
      sql1 += "contact = ?, ";
      sql1 += "email = ?, ";
      sql1 += "section = ?, ";
      sql1 += "position = ? ";
      sql1 += "WHERE user_id = ? ";
      db().query(
        sql1,
        [
          data.employeeId,
          data.name,
          data.username,
          data.contact,
          data.email,
          data.secid,
          data.position,
          data.user_id,
        ],
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }

          let check_role_table = "";
          check_role_table += "SELECT * FROM users_role WHERE user_id = ? ";

          db().query(check_role_table, [data.user_id], (err, rows, fields) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }

            if (rows.length > 0) {
              let sql2 = "";
              sql2 +=
                "UPDATE users_role SET dts_role = ?, work_queue_role = ? WHERE user_id = ?";
              db().query(
                sql2,
                [data.dts_role, data.work_queue_role, data.user_id.toString()],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                  }
                  return res.status(200).send("success");
                }
              );
            } else {
              let sql3 = "";
              sql3 +=
                "INSERT INTO users_role (user_id, dts_role, work_queue_role) VALUES ?";
              const val_role = [
                [data.user_id, data.dts_role, data.work_queue_role],
              ];
              db().query(sql3, [val_role], (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send(err);
                }
                return res.status(200).send("success");
              });
            }
          });
        }
      );
    }
  });
};

module.exports = update_user;
