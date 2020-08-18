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
      sql1 += "position = ?, ";
      sql1 += "role = ? ";
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
          data.role_id,
          data.user_id,
        ],
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }

          return res.status(200).send("success");
        }
      );
    }
  });
};

module.exports = update_user;
