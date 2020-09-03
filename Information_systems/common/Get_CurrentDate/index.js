const get_date = (date) => {
  let today = new Date(date);
  let format =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  return format;
};

module.exports = get_date;
