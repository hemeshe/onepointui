import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
  Ccpn,
} from '../../../helpers/ingestion-tables-constants';

import {
  successGetDataIngestionData,
  setSearchIngestionData,
} from '../../../store/data-ingestion/actions';
import {
  startRequest,
  failedRequest,
  finishLoading,
} from '../../../store/app/actions';

import { useGetData } from '../../../hooks/useGetData';

export const useGetDataIngestion = () => {
  const dispatch = useDispatch();
  const { Get } = useGetData();

  const getPromise = useCallback(
    (dif, cob, queryParams) => {
      switch (dif) {
        case SopusO1F:
          return Get(
            `/DataIngestion/View/SopusO1FPaging/${cob}/${queryParams}`
          );

        case VolumeNumerator:
          return Get(
            `/DataIngestion/View/VolNumeratorPaging/${cob}/${queryParams}`
          );

        case TaWorkingCapital:
          return Get(
            `/DataIngestion/View/WorkingCapitalPaging/${cob}/${queryParams}`
          );

        case Ccpn:
          return Get(`/DataIngestion/View/CcpnPaging/${queryParams}`);

        default:
          return Promise.resolve(null);
      }
    },
    [Get]
  );

  const getDataIngestion = useCallback(
    (
      cob,
      cobid,
      dif,
      difid,
      PageNumber,
      PageSize,
      searchValue,
      month = null,
      year = null,
      quarter = null
    ) => {
      let queryParams =
        searchValue && searchValue !== ''
          ? `${year}/${searchValue}?PageNumber=${PageNumber}&PageSize=${PageSize}`
          : `${year}/?PageNumber=${PageNumber}&PageSize=${PageSize}`;
      try {
        if (getPromise) {
          dispatch(startRequest());
          getPromise(dif, cob, queryParams).then((data) => {
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
    [dispatch, getPromise]
  );

  return { getDataIngestion };
};
