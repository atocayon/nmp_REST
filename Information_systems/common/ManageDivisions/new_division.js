const db = require("../../../config/Database_config/db");

const new_division = (department, depshort, res) => {
  const sql =
    "INSERT INTO divisions (department, depshort) VALUES ?";
  const values = [[department, depshort]];
  db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = new_division;
