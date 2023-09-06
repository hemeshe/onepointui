export const DateFormat = (date: Date | string | undefined | null) => {
  if (date) {
    let nd = new Date(date);
    let splitted = nd.toLocaleDateString('en-GB').split('/'); // British English uses day-month-year order;
    let dd = splitted[0].length === 1 ? `0${splitted[0]}` : splitted[0];
    let mm = splitted[1].length === 1 ? `0${splitted[1]}` : splitted[1];
    let yyyy = splitted[2];
    let f = `${yyyy}-${mm}-${dd}`;
    return f;
  }
  return '';
};

export const getYear = (date: Date | string | undefined | null) => {
  let d = DateFormat(date);
  return d.split('-')[0];
};

export const getCurrentDate = () => {
  let newDate = new Date();
  let date_raw = newDate.getDate();
  let month_raw = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  var date, month;

  if (date_raw < 10) {
    date = '0' + date_raw.toString();
  } else {
    date = date_raw.toString();
  }
  if (month_raw < 10) {
    month = '0' + month_raw.toString();
  } else {
    month = month_raw.toString();
  }

  return `${year}-${month}-${date}`;
};
