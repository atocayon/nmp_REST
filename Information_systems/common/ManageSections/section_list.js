const db = require("../../../config/Database_config/db");

const sections_list = (res) => {
  let sql = "";
  sql += "SELECT a.divid AS divid, ";
  sql += "a.secid AS secid, ";
  sql += "a.section AS section, ";
  sql += "a.secshort AS secshort, ";
  sql += "b.department AS department, ";
  sql += "b.depshort AS depshort ";
  sql += "FROM sections a ";
  sql += "LEFT JOIN divisions b ";
  sql += "ON a.divid = b.depid ";
  sql += "ORDER BY a.section ASC ";
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    return res.status(200).send(rows);
  });
};

module.exports = sections_list;
