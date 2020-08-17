const db = require("../../../config/Database_config/db");
const dateTime = require("../../common/Get_CurrentDateTime");
const document_dissemination = (
  user_id,
  doc_id,
  doc_info,
  remarks,
  destination,
  res
) => {
  let sql1 = "";
  sql1 += "INSERT INTO documentLogs ";
  sql1 += "(document_id, user_id, ";
  sql1 += "remarks, destinationType, destination, ";
  sql1 += "status, notification, date_time ) ";
  sql1 += "VALUES ? ";

  const values = [
    [doc_id, user_id, remarks, "Internal", destination, "2", "0", dateTime()],
  ];

  db().query(sql1, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).send("success");
  });
};

module.exports = document_dissemination;
