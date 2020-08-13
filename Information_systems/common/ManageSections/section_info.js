const db = require("../../../config/Database_config/db");

const section_info = (section_id, res) => {
  let sql = "";
  sql += "SELECT a.secid AS secid, ";
  sql += "a.divid AS divid, ";
  sql += "a.section AS section, ";
  sql += "a.secshort AS secshort, ";
  sql += "b.department AS department, ";
  sql += "b.depshort AS depshort ";
  sql += "FROM sections a ";
  sql += "JOIN divisions b ";
  sql += "ON a.divid = b.depid ";
  sql += "WHERE a.secid = ? ORDER BY a.section ASC";
  db().query(sql, [parseInt(section_id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows[0]);
  });
};

module.exports = section_info;
