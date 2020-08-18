const db = require("../../../config/Database_config/db");

const update_user_status = (status, user_id, sec_id, res) => {
  const sql = "UPDATE users SET status = ? WHERE user_id = ?";
  db().query(sql, [status, parseInt(user_id)], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = update_user_status;
