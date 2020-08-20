const db = require("../../../config/Database_config/db");
const listOfActiveUsers = require("../ListOfActiveUsers/users");

const usersLogout = (userId, io, res) => {
    const sql = "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
    db().query(sql, ["1", userId], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result) {
            await listOfActiveUsers(io);
            return res.status(200).send("logout success");
        }
    });
};

module.exports = usersLogout;