const db = require("../../../config/Database_config/db");

const delete_division = (div_id, res) => {
  const sql = "DELETE FROM divisions WHERE depid = ?";
  db().query(sql, [parseInt(div_id)], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = delete_division;
