const db = require("../../../config/Database_config/db");
const get_date = require("../../common/Get_CurrentDate");
const new_job_request = (
  requisitioner_id,
  task_secid,
  dateNeeded,
  typeOfWork,
  otherTypeOfWork,
  scopeOfWork,
  res
) => {
  const date = new Date();
  const current_year = date.getFullYear();

  let check_year = "";
  check_year += "SELECT ";
  check_year += "id FROM work_queue_task ";
  check_year += "ORDER BY id DESC LIMIT 1";

  db.query(check_year, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (rows.length > 0) {
      const result = rows[0].id;
      const getFirstFourChar = result.substring(0, 4);
      if (current_year.toString() !== getFirstFourChar) {
        const new_task_id = current_year + "000";
        insert_work_queue_task(
          new_task_id,
          requisitioner_id,
          task_secid,
          dateNeeded,
          scopeOfWork,
          otherTypeOfWork,
          typeOfWork,
          res
        );

        return res.status(200).send("success");
      } else {
        const increment_task_id = parseInt(result) + 1;

        insert_work_queue_task(
          increment_task_id,
          requisitioner_id,
          task_secid,
          dateNeeded,
          scopeOfWork,
          otherTypeOfWork,
          typeOfWork,
          res
        );
      }
    } else {
      const new_task_id = current_year + "000";
      insert_work_queue_task(
        new_task_id,
        requisitioner_id,
        task_secid,
        dateNeeded,
        scopeOfWork,
        otherTypeOfWork,
        typeOfWork,
        res
      );
    }
  });
};

const insert_work_queue_task = (
  task_id,
  requisitioner_id,
  task_secid,
  dateNeeded,
  scopeOfWork,
  otherTypeOfWork,
  typeOfWork,
  res
) => {
  let insert_task_queury = "";
  insert_task_queury += "INSERT INTO work_queue_task ";
  insert_task_queury +=
    "(id, requisitioner, scope_of_work, section, deadline, date) VALUES ?";
  const task = [
    [
      task_id,
      requisitioner_id,
      scopeOfWork !== "" ? scopeOfWork : null,
      task_secid,
      dateNeeded !== "" ? get_date(dateNeeded) : null,
      get_date(Date.now())
    ],
  ];
  db.query(insert_task_queury, [task], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    insert_work_queue_type_of_work(task_id, typeOfWork, otherTypeOfWork, res);
  });
};

const insert_work_queue_type_of_work = (
  task_id,
  typeOfWork,
  otherTypeOfWork,
  res
) => {
  if (otherTypeOfWork === "") {
    let arr = [];
    for (let i = 0; i < typeOfWork.length; i++) {
      arr.push([task_id, typeOfWork[i]]);
    }

    let insert_type_of_work_query = "";
    insert_type_of_work_query += "INSERT INTO work_queue_type_of_work ";
    insert_type_of_work_query += "(task_id, task) VALUES ?";

    db.query(insert_type_of_work_query, [arr], (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).send("success");
    });
  } else {
    let insert_type_of_work_query = "";
    insert_type_of_work_query += "INSERT INTO work_queue_type_of_work ";
    insert_type_of_work_query += "(task_id, task) VALUES ?";
    const value = [[task_id, otherTypeOfWork]];
    db.query(insert_type_of_work_query, [value], (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).send("success");
    });
  }
};

module.exports = new_job_request;
