const db = require("../../../config/Database_config/db");
const date = new Date();
const current_year = date.getFullYear();

const document_trackingNumber = () => {
  const sql = "SELECT * FROM documents ORDER BY documentID DESC LIMIT 1";
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }

    if (rows.length > 0) {
      const str = rows[0].documentID.split("-", 1);
      const convert = str.toString();
      const getFirstFourChar = convert.substring(0, 4);
      const new_year = current_year + "000";
      if (getFirstFourChar !== current_year.toString()) {
        io.emit("documentId", { documentID: parseInt(new_year) });
      } else {
        io.emit("documentId", { documentID: parseInt(str) + 1 });
      }
    } else {
      const new_year = current_year + "000";
      io.emit("documentId", { documentID: parseInt(new_year) });
    }
  });
};

module.exports = document_trackingNumber;
