const db = require("../../../config/Database_config/db");
const dateTime = require("../../common/Get_CurrentDateTime");
const insert_inspection = (task_id, findings, recommendations, res) => {
  let insert_inspection = "";
  insert_inspection += "INSERT INTO work_queue_inspection ";
  insert_inspection += "(task_id, findings, recommendations) VALUES ? ";
  const val_insert_inspection = [[task_id, findings, recommendations]];
  db.query(insert_inspection, [val_insert_inspection], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    let insert_logs = "";
    insert_logs +=
      "INSERT INTO work_queue_logs (task_id, status, remarks, date_time) VALUES ?";
    const insert_val_logs = [[task_id, "Done", "Done", dateTime()]];
    db.query(insert_logs, [insert_val_logs], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.status(200).send("success");
    });
  });
};

const done_job_action = (
  task_id,
  item_no,
  serial_no,
  brand,
  memory_capacity,
  item_model,
  color,
  measurement,
  location,
  system_interface,
  functional_capabilities,
  data_structure,
  reliability,
  security,
  quality,
  contraints,
  findings,
  recommendations,
  specific_job,
  res
) => {
  if (specific_job === "normal_job") {
    let insert_1 = "";
    insert_1 += " INSERT INTO work_queue_specification_descriptions ";
    insert_1 +=
      "(task_id, item_no, serial_no, brand, memory_capacity, item_model, color, measurement, location) ";
    insert_1 += "VALUES ? ";

    const val_1 = [
      [
        task_id,
        item_no,
        serial_no,
        brand,
        memory_capacity,
        item_model,
        color,
        measurement,
        location,
      ],
    ];

    db.query(insert_1, [val_1], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return insert_inspection(task_id, findings, recommendations, res);
    });
  }

  if (specific_job === "info_system_job") {
    let insert_2 = "";
    insert_2 += "INSERT INTO work_queue_info_system_specifications ";
    insert_2 +=
      "(task_id, system_interface, functional_capabilities, data_structure, reliability, security, quality, contraints) ";
    insert_2 += "VALUES  ?";

    const val_2 = [
      [
        task_id,
        system_interface,
        functional_capabilities,
        data_structure,
        reliability,
        security,
        quality,
        contraints,
      ],
    ];

    db.query(insert_2, [val_2], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return insert_inspection(task_id, findings, recommendations, res);
    });
  }
};

module.exports = done_job_action;
