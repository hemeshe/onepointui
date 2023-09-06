import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { newMappingType } from '../../../types/mapping';

import { failedRequest } from '../../../store/app/actions';

export const useValidateMethodMap = () => {
  const dispatch = useDispatch();
  const validateMethodMap = useCallback(
    (nM: newMappingType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (element.reportingLine === '' || !element.reportingLine) {
          dispatch(failedRequest('Invalid ReportingLine input!'));
          return true;
        } else if (element.entityNm === '' || !element.entityNm) {
          dispatch(failedRequest('Invalid Entity Name input!'));
          return true;
        } else if (!element.method || element.method === '') {
          dispatch(failedRequest('Invalid Method input!'));
          return true;
        } else if (!element.cob || element.cob === '') {
          dispatch(failedRequest('Invalid Cob input!'));
          return true;
        } else if (element.actualPlanFlg === '') {
          dispatch(failedRequest('Invalid Actual Plan Flag input!'));
          return true;
        } else if (element.negAdminMarginFlg === '') {
          dispatch(failedRequest('Invalid Neg Admin Margin Flag input!'));
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
        }
        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );
  return { validateMethodMap };
};
