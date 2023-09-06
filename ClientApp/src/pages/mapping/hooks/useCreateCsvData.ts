import { useCallback } from 'react';

import { useSnakeCase } from '../../../hooks/useSnakeCase';
import { DateFormat } from '../../../helpers/date-format';

export const useCreateCsvData = () => {
  const { convertToSnakeCase } = useSnakeCase();
  const createCsvData = useCallback(
    (data) => {
      const ifd = JSON.parse(JSON.stringify(data));
      ifd.forEach((el: any) => {
        for (var key in el) {
          if (
            key === 'loadDate' ||
            key === 'reportingDate' ||
            key === 'loadDate' ||
            key === 'reportingDate' ||
            key === 'validFrom' ||
            key === 'validTo'
          ) {
            el[convertToSnakeCase(key)] = DateFormat(el[key]);
          } else {
            el[convertToSnakeCase(key)] = el[key];
          }
          delete el[key];
          delete el['ID'];
          delete el['id'];
        }
      });
      return ifd;
    },
    [convertToSnakeCase]
  );

  return {
    createCsvData,
  };
};
