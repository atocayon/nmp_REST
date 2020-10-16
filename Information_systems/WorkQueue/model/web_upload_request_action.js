const db = require("../../../config/Database_config/db");
const email = require("../../common/Error_Rerports");
const dateTime = require("../../common/Get_CurrentDateTime");
const web_upload_request_action = (validator, web_upload_id, status, res) => {
  let sql = "";
  sql += "UPDATE web_upload SET validator = ? WHERE id = ? ";
  db.query(sql, [validator, web_upload_id], (err, result) => {
    if (err) {
      console.log(err);
      return email(err, res);
    }

    let insert = "";
    insert +=
      "INSERT INTO web_upload_logs (web_upload_id, status, date_time) VALUES ? ";
    const val = [[web_upload_id, status, dateTime()]];
    db.query(insert, [val], (err, result) => {
      if (err) {
        console.log(err);
        return email(err, res);
      }

      return res.status(200).send("success");
    });
  });
};

module.exports = web_upload_request_action;
