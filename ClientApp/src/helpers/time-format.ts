export const timeFormat = (d: string | Date) => {
  let nd = new Date(d);
  return nd.toLocaleTimeString();
};
