const db = require("../../../config/Database_config/db");
const emailFunction = require("../../../config/Email_config/email_config");
require("dotenv/config");

const users_ChangePasswordCode = (user_id, email, res) => {
  const generatedCode = Math.ceil(1000 + Math.random() * 9000);
  const sql = "INSERT INTO users_code(user_id, code) VALUES ?";
  const values = [[user_id, generatedCode]];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    let mailOptions = {
      from: process.env.EMAIL_AUTH_USER,
      to: "atocayon27@gmail.com",
      subject: "NMP|Work Queue Information System",
      text: "Your code is " + generatedCode + ".",
    };

    emailFunction().sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send(err);
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).send("success");
      }
    });
  });
};

module.exports = users_ChangePasswordCode;
