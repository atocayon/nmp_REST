const db = require("../../../config/Database_config/db");

const user_list = (res) => {
    let sql = "";
    sql += "SELECT a.user_id AS user_id, ";
    sql += "a.employeeId AS employeeId, ";
    sql += "a.name AS name, ";
    sql += "a.username AS username, ";
    sql += "a.contact AS contact, ";
    sql += "a.email AS email, ";
    sql += "a.section AS secid, ";
    sql += "a.position AS position, ";
    sql += "d.dts_role, ";
    sql += "d.work_queue_role, ";
    sql += "b.section AS section, ";
    sql += "b.secshort AS secshort, ";
    sql += "c.department AS department, ";
    sql += "c.depshort AS depshort, ";
    sql += "e.status AS accnt_status ";
    sql += "FROM users a ";
    sql += "LEFT JOIN sections b ";
    sql += "ON a.section = b.secid ";
    sql += "LEFT JOIN divisions c ";
    sql += "ON b.divid = c.depid ";
    sql += "LEFT JOIN users_role d ";
    sql += "ON a.user_id = d.user_id ";
    sql += "LEFT JOIN users_status e ";
    sql += "ON a.status = e.status_id ";
    sql += "ORDER BY a.user_id ASC ";
    db.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).send(rows);
    });
};

module.exports = user_list;