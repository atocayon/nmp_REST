const db = require("../../../config/Database_config/db");
const bcrypt = require("bcrypt");
require("dotenv/config");
const salt = process.env.SALT_ROUNDS;
const userRegistration = (
  role,
  employeeId,
  name,
  username,
  password,
  contact,
  email,
  section,
  position,
  res
) => {
  email = email.toLowerCase();
  email = email.trim();

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email, username], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (rows.length > 0) {
      console.log("email taken");
      return res.status(200).send("email taken");
    } else {
      const checkUsername = "SELECT * FROM users WHERE username = ?";
      db.query(checkUsername, [username], function (err, rows, fields) {
        if (err) {
          console.log(err);

          return res.status(500).send(err);
        }

        if (rows.length > 0) {
          return res.status(200).send("username taken");
        } else {
          bcrypt.hash(password, parseInt(salt), function (err, hash) {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            let sql1 = "";
            sql1 += "INSERT INTO users ";
            sql1 +=
              "(employeeId, name, username, password, contact, email, section, position, status) ";
            sql1 += "VALUES ?";

            const values = [
              [
                employeeId,
                name,
                username,
                hash,
                contact,
                email,
                section,
                position,
                "1",
              ],
            ];
            db.query(sql1, [values], function (err, result) {
              if (err) {
                console.log(err);
                res.status(500).send(err);
              }

              let select = "";
              select += "SELECT * FROM users WHERE username = ?";
              db.query(select, [username], (err, rows, fields) => {
                if (err) {
                  console.log(err);
                  res.status(500).send(err);
                }

                let insert_role =
                  "INSERT INTO users_role (user_id, dts_role) VALUES ?";
                const role_val = [[rows[0].user_id, role]];
                db.query(insert_role, [role_val], (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  }

                  console.log(result);
                  return res.status(200).send("success");
                });
              });
            });
          });
        }
      });
    }
  });
};

module.exports = userRegistration;
