/**
 *  sort function
 */
export const sortByKey = <T>(
  data: T[],
  fieldName: string,
  sorted: boolean
): T[] => {
  if (sorted) {
    data.sort((a: any, b: any) => {
      if (a[fieldName] < b[fieldName]) {
        return -1;
      }
      if (a[fieldName] > b[fieldName]) {
        return 1;
      }
      return 0;
    });
  } else {
    data.sort((a: any, b: any) => {
      if (a[fieldName] < b[fieldName]) {
        return 1;
      }
      if (a[fieldName] > b[fieldName]) {
        return -1;
      }
      return 0;
    });
  }

  return data;
};
