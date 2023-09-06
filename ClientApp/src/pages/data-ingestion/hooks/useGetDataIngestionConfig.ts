import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
} from '../../../helpers/ingestion-tables-constants';

import {
  setSearchIngestionData,
  successGetDataIngestionData,
} from '../../../store/data-ingestion/actions';
import {
  startRequest,
  failedRequest,
  finishLoading,
} from '../../../store/app/actions';

import { useGetData } from '../../../hooks/useGetData';

export const useGetDataIngestionConfig = () => {
  const dispatch = useDispatch();
  const { Get } = useGetData();

  const getDataIngestionConfig = useCallback(
    (cob, cobid, dif, difid, PageNumber, PageSize, searchValue = '') => {
      let queryParams =
        searchValue && searchValue !== ''
          ? `${searchValue}?PageNumber=${PageNumber}&PageSize=${PageSize}`
          : `?PageNumber=${PageNumber}&PageSize=${PageSize}`;
      let getPromise;
      try {
        switch (dif) {
          case SopusO1F:
            getPromise = Get.bind(
              null,
              `/DataIngestion/Config/SopusO1F/${cob}/${queryParams}`
            );
            break;

          case VolumeNumerator:
            getPromise = Get.bind(
              null,
              `/DataIngestion/Config/VolNumerator/${cob}/${queryParams}`
            );
            break;

          case TaWorkingCapital:
            getPromise = Get.bind(
              null,
              `/DataIngestion/Config/WorkingCapital/${cob}/${queryParams}`
            );
            break;

          default:
            break;
        }

        if (getPromise) {
          dispatch(startRequest());
          getPromise().then((data) => {
            if (searchValue && searchValue !== '') {
              dispatch(setSearchIngestionData(data));
            } else {
              dispatch(successGetDataIngestionData(data));
            }
            dispatch(finishLoading());
          });
        }
      } catch (error: any) {
        dispatch(failedRequest(error.message));
      }
    },
    [dispatch, Get]
  );

  return { getDataIngestionConfig };
};
