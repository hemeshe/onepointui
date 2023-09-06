import { useCallback } from 'react';

import { useSnakeCase } from '../../../hooks/useSnakeCase';
import { DateFormat } from '../../../helpers/date-format';

export const useCreateCsvData = () => {
  const { convertToSnakeCase } = useSnakeCase();
  const createCsvData = useCallback(
    (data, selectedDif) => {
      const ifd = JSON.parse(JSON.stringify(data));
      ifd.forEach((el: any) => {
        for (var key in el) {
          if (key.includes('Date')) {
            el[convertToSnakeCase(key)] = DateFormat(el[key]);
          } else if (el[key] === null || el[key] === 'null') {
            el[convertToSnakeCase(key)] = '';
          } else {
            el[convertToSnakeCase(key)] = String(el[key]).replace(/\"/g, '');
          }
          delete el[key];
          delete el['ID'];
          delete el['id'];
          delete el['PBI_FILTER_ID'];
          delete el['PBI_RLS_USER_ACCESS_ID'];
          delete el['PBI_RLS_TEAM_ACCESS_ID'];
          if (selectedDif === 'Other Contributions Plan(Before Tax)') {
            delete el['Month'];
            delete el['MONTH'];
          }
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
