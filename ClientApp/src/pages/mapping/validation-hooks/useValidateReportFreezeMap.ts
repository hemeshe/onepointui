import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { newMappingType } from '../../../types/mapping';

import { failedRequest } from '../../../store/app/actions';
// import { AppStateType } from '../../../store';

export const useValidateReportFreezeMap = () => {
  const dispatch = useDispatch();
  //   const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  //   const { selectedCof } = dataMappingState;
  const validateReportFreezeMap = useCallback(
    (nM: newMappingType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (element.year === '' || !element.year) {
          dispatch(failedRequest('Invalid Year input!'));
          return true;
        } else if (!element.reportingMonth || element.reportingMonth === '') {
          dispatch(failedRequest('Invalid Reporting Month input!'));
          return true;
        } else if (!element.rptNm || element.rptNm === '') {
          dispatch(failedRequest('Invalid Report Name input!'));
          return true;
        } else if (element.frzDt === '') {
          dispatch(failedRequest('Please select Freeze Date (YYYY-MM-DD)!'));
          return true;
        } else if (!element.frzTme || element.frzTme === '') {
          dispatch(
            failedRequest(
              'Invalid Freeze Time input! Correct Format HH:MM:SS 24H'
            )
          );
          return true;
        } else if (!element.frzTmeZne || element.frzTmeZne === '') {
          dispatch(failedRequest('Please select Freeze Time Zone input!'));
          return true;
        }
        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );
  return { validateReportFreezeMap };
};
