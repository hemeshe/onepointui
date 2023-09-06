import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as CS from '../common-styles';

import {
  setCurrentNav,
  finishLoading,
  startRequest,
  failedRequest,
  setHistoryForCsv,
} from '../../../../store/app/actions';
import {
  setDataIngestionQueryParams,
  successGetIngestionHistory,
} from '../../../../store/data-ingestion/actions';

import { DataTable } from './data-table';
import { AppStateType } from '../../../../store';

import { GetHistoryForCSV } from '../../api/get-history';

import { useSnakeCase } from '../../../../hooks/useSnakeCase';
import { useGetData } from '../../../../hooks/useGetData';
import { Pagination } from '../../../../components/pagination';

export const History = () => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const dispatch = useDispatch();
  const { historyData } = dataIngestionState;
  const { convertToSnakeCase } = useSnakeCase();
  const { Get } = useGetData();

  const loadHistory = useCallback(
    (page, size) => {
      dispatch(startRequest());
      ///GetHistory(page, size)
      Get(
        `/History?PageNumber=${page}&PageSize=${size}&originFrom=dataingestion`
      )
        .then((data) => {
          if (data) {
            dispatch(successGetIngestionHistory(data));
            dispatch(finishLoading());
          } else {
            dispatch(failedRequest('No data found!'));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(failedRequest(error.message));
        });
    },
    [dispatch, Get]
  );

  const loadHistoryForCcv = useCallback(() => {
    GetHistoryForCSV()
      .then((data) => {
        if (data) {
          const ifd = JSON.parse(JSON.stringify(data));
          ifd.forEach((el: any) => {
            for (var key in el) {
              if (key.toUpperCase() !== key) {
                el[convertToSnakeCase(key)] = el[key];
                delete el[key];
                delete el['ID'];
                delete el['id'];
              }
            }
          });
          dispatch(setHistoryForCsv(ifd));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(failedRequest(error.message));
      });
  }, [dispatch, convertToSnakeCase]);

  useEffect(() => {
    dispatch(setCurrentNav('/data-ingestion', 'History'));
    dispatch(setDataIngestionQueryParams('', '', '', '', '', '', ''));
    loadHistory(1, 20);
    loadHistoryForCcv();

    return () => {
      dispatch(successGetIngestionHistory([]));
    };
  }, [dispatch, loadHistory, loadHistoryForCcv]);

  return (
    <CS.Container style={{ flexDirection: 'column' }}>
      <DataTable historyData={historyData ?? []} />
      {historyData && (
        <Pagination
          loadData={loadHistory}
          pageData={historyData}
          pageSize={20}
        />
      )}
    </CS.Container>
  );
};
