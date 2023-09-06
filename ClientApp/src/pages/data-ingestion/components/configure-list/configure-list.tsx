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

import { useGetDataIngestionConfig } from '../../hooks/useGetDataIngestionConfig';

import { useIngestionConfigList } from '../../hooks/useIngestionConfigList';

import { Pagination } from '../../../../components/pagination';

export const ConfigureList = () => {
  const dispatch = useDispatch();

  let { cob, cobid, dif, difid, year, quarter, month }: any = useParams();
  const { getDataIngestionConfig } = useGetDataIngestionConfig();

  const { data, Table, loadData } = useIngestionConfigList();

  useEffect(() => {
    dispatch(setCurrentNav('/data-ingestion', 'Configure'));
    dispatch(
      setDataIngestionQueryParams(cob, cobid, dif, difid, year, quarter, month)
    );
    getDataIngestionConfig(cob, cobid, dif, difid, 1, 20);

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
    getDataIngestionConfig,
  ]);

  // commented to show add new button in configure page
  // if (!data || !Array.isArray(data) || data.length <= 0) {
  //   return null;
  // }

  return (
    <CS.Container flexDirection='column'>
      {Table}
      {data && <Pagination loadData={loadData} pageData={data} pageSize={20} />}
    </CS.Container>
  );
};
