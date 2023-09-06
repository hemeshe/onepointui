export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthArray = monthNames.map((m, i) => {
  let count = i + 1;
  return {
    id: String(count++),
    name: m,
  };
});
