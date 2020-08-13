const db = require("../../../config/Database_config/db");

const new_section = (division, section, secshort, res) => {
  const sql =
    "INSERT INTO sections (divid, section, secshort, active) VALUES ?";
  const values = [[division, section, secshort, 1]];
  db().query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = new_section;
