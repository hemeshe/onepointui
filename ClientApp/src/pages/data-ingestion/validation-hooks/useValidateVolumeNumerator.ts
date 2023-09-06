import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { failedRequest } from '../../../store/app/actions';

import { IngestionFileDataType } from '../../../types/data-ingestion';

export const useValidateVolumeNumerator = () => {
  const dispatch = useDispatch();
  const validateVolumeNumerator = useCallback(
    (nM: IngestionFileDataType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {

        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );

  const validateVolumeNumeratorConfig = useCallback(
    (nM: IngestionFileDataType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (!element.entityNm || element.entityNm === '') {
          dispatch(failedRequest('Invalid Entity Name input!'));
          return true;
        } else if (!element.cob || element.cob === '') {
          dispatch(failedRequest('Invalid Cob input!'));
          return true;
        }
        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );
  return { validateVolumeNumerator, validateVolumeNumeratorConfig };
};
