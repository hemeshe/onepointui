import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Trading_Allocation_Methodology_Mapping,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../helpers/mapping-tables-constants';

import { useGetMappping } from './useGetMapping';

import {
  MethodMapTable,
  UsdBblTable,
  LeSfsCodesTable,
  ReportFreezeMapTable,
} from '../components/data-table';
import { AppStateType } from '../../../store';

import { ParamsType } from '../../../types/app';

export const useList = () => {
  const appState = useSelector((state: AppStateType) => state.app);
  const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  const { mappingData, searchedMappingData } = dataMappingState;
  const { srchInput } = appState;
  const { getMapping } = useGetMappping();
  let { cob, mt }: ParamsType = useParams();

  const loadData = useCallback(
    (pageNumber, pageSize) => {
      if (srchInput && srchInput.length > 0) {
        getMapping(cob, mt, pageNumber, pageSize, srchInput);
      } else {
        getMapping(cob, mt, pageNumber, pageSize);
      }
    },
    [getMapping, cob, mt, srchInput]
  );

  const data = useMemo(() => {
    return searchedMappingData &&
      Array.isArray(searchedMappingData) &&
      searchedMappingData.length > 0
      ? searchedMappingData
      : mappingData;
  }, [searchedMappingData, mappingData]);

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

  return { loadData, data, Table };
};
