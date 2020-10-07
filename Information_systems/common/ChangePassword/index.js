const db = require("../../../config/Database_config/db");
const bcrypt = require("bcrypt");
require("dotenv/config");

const changePassword = (user_id, new_password, res) => {
  bcrypt.hash(new_password, process.env.SALT_ROUNDS, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    let update = "";
    update += "UPDATE users SET password = ? WHERE user_id = ? ";
    db.query(update, [hash, user_id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).send("success");
    });
  });
};

module.exports = changePassword;
