import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { newMappingType } from '../../../types/mapping';

import { failedRequest } from '../../../store/app/actions';
// import { AppStateType } from '../../../store';

export const useValidateLeSfsCode = () => {
  const dispatch = useDispatch();
  //   const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  //   const { selectedCof } = dataMappingState;
  const validateLeSfsCode = useCallback(
    (nM: newMappingType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (element.logicCds === '' || !element.logicCds) {
          dispatch(failedRequest('Invalid Logic Cds input!'));
          return true;
        } else if (!element.statement || element.statement === '') {
          dispatch(failedRequest('Invalid Statement input!'));
          return true;
        } else if (!element.kpi || element.kpi === '') {
          dispatch(failedRequest('Invalid KPI input!'));
          return true;
        } else if (element.validFrom === '') {
          dispatch(
            failedRequest('Please select valid from date (YYYY-MM-DD)!')
          );
          return true;
        } else if (element.validTo === '') {
          dispatch(failedRequest('Please select valid to date (YYYY-MM-DD)!'));
          return true;
        } else if (new Date(element.validTo) < new Date(element.validFrom)) {
          dispatch(
            failedRequest('validTo date should be grater than validFrom date!')
          );
          return true;
        }
        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );
  return { validateLeSfsCode };
};
