const db = require("../../../config/Database_config/db");

const user_transfer_office = (sec_id, user_id, res) => {
  const sql = "UPDATE users SET section = ? WHERE user_id = ?";
  db().query(sql, [secid, parseInt(id)], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = user_transfer_office;
