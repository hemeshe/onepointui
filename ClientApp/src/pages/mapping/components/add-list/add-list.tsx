import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as CS from '../common-styles';

import {
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Trading_Allocation_Methodology_Mapping,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../../helpers/mapping-tables-constants';

import { useGetMappping } from '../../hooks/useGetMapping';
import { useList } from '../../hooks/useList';

import {
  MethodMapTable,
  UsdBblTable,
  LeSfsCodesTable,
  ReportFreezeMapTable,
} from './components/data-table';
import { AppStateType } from '../../../../store';
import { setCurrentNav, setCurrentPage } from '../../../../store/app/actions';
import {
  setCsvTemplate,
  setMappingQueryParams,
  setSearchMappingData,
  successGetMappingData,
} from '../../../../store/mapping/actions';
import { Pagination } from '../../../../components/pagination';

export const AddList = () => {
  const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  const dispatch = useDispatch();
  const { mappingData } = dataMappingState;
  let { cob, cobid, mt, mtid }: any = useParams();
  const { getMapping } = useGetMappping();

  const { loadData, data } = useList();

  useEffect(() => {
    dispatch(setCurrentNav('/mapping', 'Add'));
    dispatch(setMappingQueryParams(cob, cobid, mt, mtid));
    dispatch(setCurrentPage(1));
    getMapping(cob, mt, 1, 20);

    return () => {
      dispatch(setSearchMappingData(null));
      dispatch(successGetMappingData([]));
      dispatch(setCsvTemplate([]));
    };
  }, [getMapping, cob, cobid, mt, mtid, dispatch]);

  const Table = useMemo(() => {
    switch (mt) {
      case Trading_Allocation_Methodology_Mapping:
        return <MethodMapTable Data={data} />;

      case Trading_Allocation_Dollar_Per_Barrel_USD:
        return <UsdBblTable Data={data} />;

      case Le_Sfs_Codes:
        return <LeSfsCodesTable Data={data} />;

      case Report_Freeze_Map:
        return <ReportFreezeMapTable Data={data} />;

      default:
        return '';
    }
  }, [mt, data]);

  // if (!data || !Array.isArray(data) || data.length <= 0) {
  //   return null;
  // } // commented so that user can add initial first record if there is no data

  return (
    <CS.Container flexDirection='column'>
      {Table}
      {mappingData && (
        <Pagination loadData={loadData} pageData={mappingData} pageSize={20} />
      )}
    </CS.Container>
  );
};
