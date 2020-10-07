const db = require("../../../config/Database_config/db");

const division_list = (res) => {
  const sql = "SELECT * FROM divisions";
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(rows);
  });
};

module.exports = division_list;
