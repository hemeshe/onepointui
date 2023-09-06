import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { newMappingType } from '../../../types/mapping';

import { failedRequest } from '../../../store/app/actions';

import { getYear } from '../../../helpers/date-format';

export const useValidateUsdBbl = () => {
  const dispatch = useDispatch();
  const validateUsdBbl = useCallback(
    (nM: newMappingType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (element.entityNm === '' || !element.entityNm) {
          dispatch(failedRequest('Invalid Entity Name input!'));
          return true;
        } else if (!element.buySell || element.buySell === '') {
          dispatch(failedRequest('Invalid Buysell input!'));
          return true;
        } else if (element.year === '' || !element.year) {
          dispatch(failedRequest('Invalid Year input!'));
          return true;
        } else if (element.validFrom === '') {
          dispatch(
            failedRequest('Please select Valid from date (YYYY-MM-DD)!')
          );
          return true;
        } else if (element.validTo === '') {
          dispatch(failedRequest('Please select Valid to date (YYYY-MM-DD)!'));
          return true;
        } else if (new Date(element.validTo) < new Date(element.validFrom)) {
          dispatch(
            failedRequest('ValidTo date should be grater than ValidFrom date!')
          );
          return true;
        } else if (
          Number(getYear(element.validFrom)) < Number(element.year) ||
          Number(getYear(element.validFrom)) > Number(element.year)
        ) {
          dispatch(failedRequest('ValidFrom date should be of given year!'));
          return true;
        } else if (element.actualPlanFlgUsdBbl === '') {
          dispatch(failedRequest('Invalid Actual Plan Flag USDBBL input!'));
          return true;
        }
        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );
  return { validateUsdBbl };
};
