const db = require("../../../config/Database_config/db");

const division_info = (div_id, res) => {
  const sql = "SELECT * FROM divisions WHERE depid= ?";
  db.query(sql, [parseInt(div_id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows[0]);
  });
};

module.exports = division_info;
