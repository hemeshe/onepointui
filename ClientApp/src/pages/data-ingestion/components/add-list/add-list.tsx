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

export const AddList = () => {
  const dispatch = useDispatch();

  let { cob, cobid, dif, difid, year, quarter, month }: any = useParams();
  const { getDataIngestion } = useGetDataIngestion();

  const { data, Table, loadData } = useIngestionList();

  useEffect(() => {
    dispatch(setCurrentNav('/data-ingestion', 'Add'));
    console.log('inside add list use effect', quarter, year);
    dispatch(
      setDataIngestionQueryParams(cob, cobid, dif, difid, year, quarter, month)
    );
    console.log('after inside add list use effect', quarter, year);
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
    month,
    year,
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
