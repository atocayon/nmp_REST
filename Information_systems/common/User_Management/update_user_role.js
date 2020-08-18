const db = require("../../../config/Database_config/db");

const update_user_role = (role, user_id, sec_id, res) => {
  const sql = "UPDATE users SET role = ? WHERE user_id = ?";
  db().query(sql, [role, parseInt(user_id)], function (err, result) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = update_user_role;
