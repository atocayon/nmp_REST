const db = require("../../../config/Database_config/db");

const section_users = (sec_id, res) => {
  let sql = "";
  sql += "SELECT a.user_id AS user_id, ";
  sql += "a.employeeId AS employeeId, ";
  sql += "a.name AS name, ";
  sql += "a.username AS username, ";
  sql += "a.password AS password, ";
  sql += "a.contact AS contact, ";
  sql += "a.email AS email, ";
  sql += "a.section AS secid, ";
  sql += "a.position AS position, ";
  sql += "d.dts_role AS dts_role, ";
  sql += "d.work_queue_role AS work_queue_role, ";
  sql += "a.status AS status, ";
  sql += "b.section AS section, ";
  sql += "b.secshort AS secshort, ";
  sql += "c.department AS department, ";
  sql += "c.depshort AS depshort ";
  sql += "FROM users a ";
  sql += "LEFT JOIN sections b ";
  sql += "ON a.section = b.secid ";
  sql += "LEFT JOIN divisions c ";
  sql += "ON b.divid = c.depid ";
  sql += "LEFT JOIN users_role d ON a.user_id = d.user_id ";
  sql += "WHERE a.section = ? ORDER BY a.name ASC ";
  db().query(sql, [sec_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    console.log(rows);
    return res.status(200).send(rows);
  });
};

module.exports = section_users;
