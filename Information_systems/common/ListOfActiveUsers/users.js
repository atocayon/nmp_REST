const db = require("../../../config/Database_config/db");

const fetchUserActiveList = () => {
    let sql = "";
    sql += "SELECT  ";
    sql += "a.timeStamp AS timeStamp, ";
    sql += "b.position AS position, ";
    sql += "b.user_id AS user_id, ";
    sql += "CONVERT(b.user_id, CHAR) as user_id, b.name AS name ";
    sql += "FROM users_session a ";
    sql += "JOIN users b ";
    sql += "ON a.userId = b.user_id ";
    sql += "WHERE a.isDeleted = ? ";
    sql += "ORDER BY a.timeStamp ASC";

    db.query(sql, ["0"], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }

        io.emit("activeUsers", rows);
    });
};

module.exports = fetchUserActiveList;