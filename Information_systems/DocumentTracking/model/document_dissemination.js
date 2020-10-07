const db = require("../../../config/Database_config/db");
const dateTime = require("../../common/Get_CurrentDateTime");

const insert_document_logs = (
  userId,
  doc_id,
  docInfo,
  remarks,
  destination,
  res
) => {
  let sql1 = "";
  sql1 += "INSERT INTO documentlogs ";
  sql1 += "(document_id, user_id, ";
  sql1 += "remarks, destinationType, destination, ";
  sql1 += "status, notification, date_time ) ";
  sql1 += "VALUES ? ";

  const values = [
    [doc_id, user_id, remarks, "Internal", destination, "2", "0", dateTime()],
  ];

  db.query(sql1, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).send("success");
  });
};

const insert_document_destination = (
  userId,
  doc_id,
  doc_info,
  destination,
  res
) => {
  let sql = "";
  sql += "INSERT INTO documents ";
  sql += "(documentID, creator, subject, doc_type, ";
  sql += "note, date_time_created, status, ref, category ) ";
  sql += "VALUES  ? ";
  const values = [
    [
      doc_id,
      userId,
      doc_info.subject,
      doc_info.docTypeId,
      doc_info.note,
      dateTime(),
      "1",
      "0",
      doc_info.category,
    ],
  ];

  db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (destination.des.length > 1) {
      for (let i = 0; i < destination.des.length; i++) {
        insert_document_logs(
          userId,
          doc_id,
          doc_info,
          destination.remarks,
          destination.des[i],
          res
        );
      }
    } else {
      insert_document_logs(
        userId,
        doc_id,
        doc_info,
        destination.remarks,
        destination.des[0],
        res
      );
    }
  });
};
const document_dissemination = (
  user_id,
  doc_id,
  doc_info,
  remarks,
  destination,
  res
) => {
  insert_document_destination(user_id, doc_id, doc_info, destination, res);
};

module.exports = document_dissemination;
