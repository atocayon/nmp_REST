const get_dateTime = () => {
  let today = new Date();
  const dateToday =
    (today.getMonth() + 1) >= 10
      ? (today.getMonth() + 1)
      : "0" + (today.getMonth() + 1);
  let date = today.getFullYear() + "-" + dateToday + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
};

module.exports = get_dateTime;
