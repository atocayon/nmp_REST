const db = require("../../../config/Database_config/db");
const dateTime = require("../../common/Get_CurrentDateTime");
const document_action = (
  documentId,
  user_id,
  remarks,
  destinationType,
  destination,
  status,
  res
) => {
  const level =
    "SELECT * FROM documentlogs WHERE document_id = ? AND status = ? AND user_id = ? AND notification = ?";
  db.query(level, [documentId, "1", user_id, "0"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (status === "2") {
      if (typeof destination === "string") {
        const insertLogs2 =
          "INSERT INTO documentlogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
        const valInsertLogs2 = [
          [
            documentId,
            user_id,
            remarks,
            destinationType,
            destination,
            status,
            "0",
            dateTime(),
          ],
        ];
        db.query(insertLogs2, [valInsertLogs2], function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          let updateLogs2 = "";
          updateLogs2 += "UPDATE documentlogs SET ";
          updateLogs2 += "notification   = ? ";
          updateLogs2 += "WHERE document_id = ? ";
          updateLogs2 += "AND user_id = ? ";
          updateLogs2 += "AND status = ? ";
          db.query(updateLogs2, ["1", documentId, user_id, "1"], function (
            err,
            result
          ) {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }

            return res.status(200).send(result);
          });
        });
      } else {
        if (destination.length > 1) {
          const sql =
            "SELECT a.documentID AS documentId, a.subject AS subject, a.doc_type AS doc_type, a.note AS note FROM documents a WHERE a.documentID =?";
          db.query(sql, documentId, function (err, doc, fields) {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            let forwardArr = [];
            let insertLogsVal = [];
            for (let i = 0; i < destination.length; i++) {
              let inc = i + 1;
              forwardArr.push([
                documentId + "-" + inc,
                user_id,
                doc[0].subject,
                doc[0].doc_type,
                doc[0].note,
                "1",
                documentId,
              ]);

              insertLogsVal.push([
                documentId + "-" + inc,
                user_id,
                remarks,
                destinationType,
                destination[i],
                status,
                "0",
                dateTime(),
              ]);
            }

            const insert =
              "INSERT INTO documents(documentID, creator, subject,doc_type, note, status, ref) VALUES ?";

            db.query(insert, [forwardArr], function (err, result) {
              if (err) {
                console.log(err);
                return res.status(500).send(err);
              }

              const insertLogs =
                "INSERT INTO documentlogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";

              db.query(insertLogs, [insertLogsVal], function (
                err,
                result
              ) {
                if (err) {
                  console.log(err);
                  return res.status(500).send(err);
                }
                let updateLogs = "";
                updateLogs += "UPDATE documentlogs SET ";
                updateLogs += "notification   = ? ";
                updateLogs += "WHERE document_id = ? ";
                updateLogs += "AND user_id = ? ";
                updateLogs += "AND status = ? ";
                db.query(
                  updateLogs,
                  ["1", documentId, user_id, "1"],
                  function (err, result) {
                    if (err) {
                      console.log(err);
                      return res.status(500).send(err);
                    }

                    return res.status(200).send(result);
                  }
                );
              });
            });
          });
        }
      }
    } else {
      const insertLogs3 =
        "INSERT INTO documentlogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
      const values = [
        [
          documentId,
          user_id,
          remarks,
          destinationType,
          destination,
          status,
          "0",
          dateTime(),
        ],
      ];

      db.query(insertLogs3, [values], function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        let updateLogs3 = "";
        updateLogs3 += "UPDATE documentlogs SET ";
        updateLogs3 += "notification   = ? ";
        updateLogs3 += "WHERE document_id = ? ";
        updateLogs3 += "AND user_id = ? ";
        updateLogs3 += "AND status = ? ";
        db.query(updateLogs3, ["1", documentId, user_id, "1"], function (
          err,
          result
        ) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }

          return res.status(200).send(result);
        });
      });
    }
  });
};

module.exports = document_action;
