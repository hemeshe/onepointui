import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as CS from '../common-styles';

import { setCurrentNav } from '../../../../store/app/actions';
import {
  setCsvTemplate,
  setDataIngestionQueryParams,
  setSearchIngestionData,
  successGetDataIngestionData,
} from '../../../../store/data-ingestion/actions';

import { useGetDataIngestion } from '../../hooks/useGetDataIngestion';

import { Pagination } from '../../../../components/pagination';
import { useIngestionList } from '../../hooks/useIngestionList';

export const UpdateList = () => {
  const dispatch = useDispatch();
  const { getDataIngestion } = useGetDataIngestion();

  let { cob, cobid, dif, difid, year, quarter, month }: any = useParams();

  const { data, Table, loadData } = useIngestionList();

  useEffect(() => {
    dispatch(setCurrentNav('/data-ingestion', 'Edit'));
    dispatch(
      setDataIngestionQueryParams(cob, cobid, dif, difid, year, quarter, month)
    );
    getDataIngestion(cob, cobid, dif, difid, 1, 20, '', month, year);

    return () => {
      dispatch(successGetDataIngestionData([]));
      dispatch(setSearchIngestionData([]));
      dispatch(setCsvTemplate([]));
    };
  }, [
    dispatch,
    cob,
    cobid,
    dif,
    difid,
    year,
    month,
    quarter,
    getDataIngestion,
  ]);

  if (!data || !Array.isArray(data) || data.length <= 0) {
    return null;
  }

  return (
    <CS.Container flexDirection='column'>
      {Table}
      {data && <Pagination loadData={loadData} pageData={data} pageSize={20} />}
    </CS.Container>
  );
};
