import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Api } from '../../../helpers/api';
import { Fetch } from '../../../helpers/fetch';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
  Ccpn,
} from '../../../helpers/ingestion-tables-constants';

import {
  startLoading,
  failedRequest,
  finishLoading,
} from '../../../store/app/actions';

export const useGetIngestionYears = () => {
  const dispatch = useDispatch();

  const getIngestionYears = useCallback(
    async (cob: any, cobid: any, dif: string, difid: any) => {
      try {
        console.log('dif: ' + dif);
        dispatch(startLoading());
        let response: any;
        if (dif === SopusO1F) {
          response = await Fetch(
            `${Api}/DataIngestion/Years/SopusO1F/${cob}`,
            'GET'
          );
        } else if (dif === VolumeNumerator) {
          response = await Fetch(
            `${Api}/DataIngestion/Years/VolNumerator/${cob}`,
            'GET'
          );
        } else if (dif === TaWorkingCapital) {
          response = await Fetch(
            `${Api}/DataIngestion/Years/WorkingCapital/${cob}`,
            'GET'
          );
        } else if (dif === Ccpn) {
          response = await Fetch(`${Api}/DataIngestion/Years/Ccpn`, 'GET');
        } else {
          return [];
        }

        if (!response.ok) {
          throw Error(response.statusText);
        }
        let json = await response.json();
        dispatch(finishLoading());
        json = json.map((y: number) => {
          return {
            id: y,
            name: y.toString(),
          };
        });
        return json;
      } catch (error: any) {
        dispatch(failedRequest(error.message));
        return [];
      }
    },
    [dispatch]
  );

  return { getIngestionYears };
};
