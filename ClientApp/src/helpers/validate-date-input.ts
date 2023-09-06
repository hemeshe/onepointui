export const ValidateDateInput = (date: string) => {
  let length = date.length;
  if (!length || length !== 10 || date[4] !== "-" || date[7] !== "-")
    return false;

  let splitted = date.split("-");
  if (splitted) {
    let y = splitted[0],
      m = splitted[1],
      d = splitted[2];
    if (y.length !== 4 || isNaN(Number(y))) {
      return false;
    } else if (m.length !== 2 || isNaN(Number(m)) || Number(m) > 12) {
      return false;
    } else if (d.length !== 2 || isNaN(Number(d))) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};
