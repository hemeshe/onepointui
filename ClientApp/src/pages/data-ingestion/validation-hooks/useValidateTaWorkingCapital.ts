import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { failedRequest } from '../../../store/app/actions';

import { IngestionFileDataType } from '../../../types/data-ingestion';

export const useValidateTaWorkingCapital = () => {
  const dispatch = useDispatch();
  const validateTaWorkingCapital = useCallback(
    (nM: IngestionFileDataType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (!element.reportingDate || element.reportingDate === '') {
          dispatch(failedRequest('Invalid Reporting Date input!'));
          return true;
        } else if (!element.entityNm || element.entityNm === '') {
          dispatch(failedRequest('Invalid Entity Name input!'));
          return true;
        } else if (!element.businessUnit || element.businessUnit === '') {
          dispatch(failedRequest('Invalid Business Unit input!'));
          return true;
        } else if (element.actualPlanLeFlg && isNaN(element.actualPlanLeFlg)) {
          dispatch(failedRequest('Invalid Actual Plan LeFlg input!'));
          return true;
        } else if (!element.reportingLine || element.reportingLine === '') {
          dispatch(failedRequest('Invalid Reporting Line input!'));
          return true;
        }

        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );
  return { validateTaWorkingCapital };
};

export const useValidateTaWorkingCapitalConfig = () => {
  const dispatch = useDispatch();
  const validateTaWorkingCapital = useCallback(
    (nM: IngestionFileDataType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (!element.entityNm || element.entityNm === '') {
          dispatch(failedRequest('Invalid Entity Name input!'));
          return true;
        } else if (!element.reportingLine || element.reportingLine === '') {
          dispatch(failedRequest('Invalid Reporting Line input!'));
          return true;
        }

        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );
  return { validateTaWorkingCapital };
};
