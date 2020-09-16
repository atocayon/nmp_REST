const get_date = (date) => {
  let today = new Date(date);
  const dateToday =
    (today.getMonth() + 1) >= 10
      ? (today.getMonth() + 1)
      : "0" + (today.getMonth() + 1);
  let format = today.getFullYear() + "-" + dateToday + "-" + today.getDate();

  return format;
};

module.exports = get_date;
