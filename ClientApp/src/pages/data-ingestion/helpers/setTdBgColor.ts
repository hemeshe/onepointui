export const setTdBgColor = (
  errFieldName: string | undefined,
  errFieldVal: string
) => {
  return errFieldName === errFieldVal ? 'rgb(255,0,0, 0.1)' : 'inherit';
};
