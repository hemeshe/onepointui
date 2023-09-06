import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
  Ccpn,
} from '../../../helpers/ingestion-tables-constants';

import { DataFileHeadings } from '../constants';
import {
  SopusTable,
  VolumeNumeratorTable,
  TaWorkingCapitalTable,
  CcpnTable,
} from '../components/data-table';

import { AppStateType } from '../../../store';

import { useGetDataIngestion } from './useGetDataIngestion';

export const useIngestionList = () => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const appState = useSelector((state: AppStateType) => state.app);
  const { ingestionFileData, searchedIngestionFileData, csvUploadErrorField } =
    dataIngestionState;
  const { srchInput } = appState;
  let { cob, cobid, dif, difid, year, month }: any = useParams();
  const { getDataIngestion } = useGetDataIngestion();

  const loadData = useCallback(
    (pageNumber, pageSize) => {
      if (srchInput && srchInput.length > 0) {
        getDataIngestion(
          cob,
          cobid,
          dif,
          difid,
          pageNumber,
          pageSize,
          srchInput,
          month,
          year
        );
      } else {
        getDataIngestion(
          cob,
          cobid,
          dif,
          difid,
          pageNumber,
          pageSize,
          '',
          month,
          year
        );
      }
    },
    [getDataIngestion, cob, cobid, dif, difid, year, month, srchInput]
  );

  const data = useMemo(() => {
    return searchedIngestionFileData &&
      Array.isArray(searchedIngestionFileData) &&
      searchedIngestionFileData.length > 0
      ? searchedIngestionFileData
      : ingestionFileData;
  }, [searchedIngestionFileData, ingestionFileData]);

  const Table = useMemo(() => {
    switch (dif) {
      case SopusO1F:
        return (
          <SopusTable
            headings={DataFileHeadings}
            ingestionData={data}
            errorFieldName={csvUploadErrorField}
          />
        );

      case VolumeNumerator:
        return (
          <VolumeNumeratorTable
            headings={DataFileHeadings}
            ingestionData={data}
            errorFieldName={csvUploadErrorField}
          />
        );

      case TaWorkingCapital:
        return (
          <TaWorkingCapitalTable
            headings={DataFileHeadings}
            ingestionData={data}
            errorFieldName={csvUploadErrorField}
          />
        );

      case Ccpn:
        return (
          <CcpnTable
            headings={DataFileHeadings}
            ingestionData={data}
            errorFieldName={csvUploadErrorField}
          />
        );

      default:
        return '';
    }
  }, [dif, data, csvUploadErrorField]);

  return {
    data,
    Table,
    loadData,
  };
};
