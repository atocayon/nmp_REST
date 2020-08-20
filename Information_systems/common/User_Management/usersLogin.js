const bcrypt = require("bcrypt");
const db = require("../../../config/Database_config/db");
const listOfActiveUsers = require("../ListOfActiveUsers/users");

const usersLogin = (usernameOrEmail, password, io, res) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.user_id AS user_id, ";
  sql += "a.name AS name, ";
  sql += "a.password AS password, ";
  sql += "b.role AS role ";
  sql += "FROM users a ";
  sql += "JOIN users_role b ";
  sql += "ON a.role = b.role_id ";
  sql += "WHERE email = ? OR username = ?";

  db().query(sql, [usernameOrEmail, usernameOrEmail], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (rows.length === 0) {
      return res.status(200).send("unrecognized email");
    }

    if (rows.length > 0) {
      bcrypt.compare(password, rows[0].password, function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        if (!result) {
          return res.status(200).send("incorrect password");
        }

        const id = rows[0].user_id;
        const role = rows[0].role;
        const name = rows[0].name;
        const data = { id, name };
        const check_session_query =
          "SELECT * FROM users_session WHERE userId = ?";
        db().query(check_session_query, [id], function (err, rows, fields) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }

          if (rows.length === 0) {
            const sql1 =
              "INSERT INTO users_session (userId, isDeleted) VALUES ?";
            const values = [[id, 0]];
            db().query(sql1, [values], function (err, result) {
              if (err) {
                console.log(err);
                return res.status(500).send(err);
              }
              listOfActiveUsers(io);
              console.log(data);
              return res.status(200).send(data);
            });
          }

          if (rows) {
            const update_session =
              "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
            db().query(update_session, [0, id], function (err, result) {
              if (err) {
                console.log(err);
                return res.status(500).send(err);
              }
              if (result) {
                listOfActiveUsers(io);
                console.log(data);
                return res.status(200).send(data);
              }
            });
          }
        });
      });
    }
  });
};

module.exports = usersLogin;
