import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as CS from '../common-styles';

import { setCurrentNav } from '../../../../store/app/actions';
import { setDataIngestionQueryParams } from '../../../../store/data-ingestion/actions';

import { useGetDataIngestion } from '../../hooks/useGetDataIngestion';

import { Pagination } from '../../../../components/pagination';
import { useIngestionList } from '../../hooks/useIngestionList';

export const ViewList = () => {
  const dispatch = useDispatch();
  let { cob, cobid, dif, difid, year, quarter, month }: any = useParams();
  const { getDataIngestion } = useGetDataIngestion();

  const { data, Table, loadData } = useIngestionList();

  useEffect(() => {
    dispatch(setCurrentNav('/data-ingestion', 'View'));
    console.log('inside view list use effect', quarter, year);
    dispatch(
      setDataIngestionQueryParams(cob, cobid, dif, difid, year, quarter, month)
    );
    getDataIngestion(cob, cobid, dif, difid, 1, 20, '', '', year);
  }, [dispatch, cob, cobid, dif, difid, year, quarter, getDataIngestion]);

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
