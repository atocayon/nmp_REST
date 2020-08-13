const db = require("../../../config/Database_config/db");

const delete_section = (sec_id, res) => {
  const sql = "DELETE FROM sections WHERE secid = ?";
  db().query(sql, [parseInt(secid)], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send("success");
  });
};

module.exports = delete_section;
