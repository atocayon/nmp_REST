const db = require("../../../config/Database_config/db");

const delete_user_accnt = (user_id, res) => {
  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [user_id], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("deleted");
  });
};

module.exports = delete_user_accnt;
