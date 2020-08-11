const db = require("../../../config/Database_config/db");
const document_trackingNumber = (io) => {
  const sql = "SELECT * FROM documents";
  db().query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }

    if (rows.length > 0) {
      const sql1 =
        "SELECT DISTINCT documentID as documentID FROM documents ORDER BY documentID DESC LIMIT 1";
      db().query(sql1, function (err, rows, fields) {
        if (err) {
          console.log(err);
          throw err;
        }

        let str = rows[0].documentID.split("-", 1);
        let convert = parseInt(str);
        io.emit("documentId", { documentID: convert + 1 });
      });
    } else {
      console.log(rows);
      const defaultValue = 1000000000;
      io.emit("documentId", { documentID: defaultValue });
    }
  });
};

module.exports = document_trackingNumber;
