const email = require("../../../config/Email_config/email_config");

const report = (err, res) => {
  let mailOptions = {
    from: process.env.EMAIL_AUTH_USER,
    to: "atocayon27@atocayon.com",
    subject: "NMP| Information System Error Report",
    text: err,
  };

  email().mailOptions(mailOptions, function (error, info) {
    if (error) {
      console.logs(error);
      return res.status(500).send(error);
    }

    return res.status(500).send(err);
  });
};

module.exports = report;
