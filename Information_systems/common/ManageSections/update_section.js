const db = require("../../../config/Database_config/db");

const update_section = (sec_id, div_id, section, secshort, res) => {
  const sql =
    "UPDATE sections SET divid = ?, section = ?, secshort = ? WHERE secid = ?";
  db.query(
    sql,
    [parseInt(div_id), section, secshort, parseInt(sec_id)],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).send("success");
    }
  );
};

module.exports = update_section;
