import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  handleMappingDataChange,
  handleSearchedMappingDataChange,
} from '../../../store/mapping/actions';
import { failedRequest } from '../../../store/app/actions';
import { MappingFileDataType } from '../../../types/mapping';
import { AppStateType } from '../../../store';

export type DateType = Date | [Date, Date] | null;

export const useSetDateInputs = () => {
  const dispatch = useDispatch();
  const MappingState = useSelector((state: AppStateType) => state.mapping);

  const { searchedMappingData } = MappingState;

  const setCommonDateField = useCallback(
    (date: Date, id: number | string, fieldName: string) => {
      const offsetDate: DateType = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      if (searchedMappingData && searchedMappingData.length > 0) {
        dispatch(handleSearchedMappingDataChange(id, fieldName, offsetDate));
      } else {
        dispatch(handleMappingDataChange(id, fieldName, offsetDate));
      }
    },
    [dispatch]
  );

  const setValidFromDate = useCallback(
    (date: Date, id: number | string) => {
      const offsetDate: DateType = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      if (searchedMappingData && searchedMappingData.length > 0) {
        dispatch(handleSearchedMappingDataChange(id, 'validFrom', offsetDate));
      } else {
        dispatch(handleMappingDataChange(id, 'validFrom', offsetDate));
      }
    },
    [dispatch, searchedMappingData]
  );

  const setValidToDate = useCallback(
    (date: Date, id: number | string, validFrom: DateType | string) => {
      const offsetDate: DateType = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      if (validFrom) {
        if (searchedMappingData && searchedMappingData.length > 0) {
          dispatch(handleSearchedMappingDataChange(id, 'validTo', offsetDate));
        } else {
          dispatch(handleMappingDataChange(id, 'validTo', offsetDate));
        }
      } else {
        dispatch(failedRequest('Select validFrom date first'));
      }
    },
    [dispatch, searchedMappingData]
  );

  const setStartDate = useCallback(
    (date: Date, id: number | string) => {
      const offsetDate: DateType = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      if (searchedMappingData && searchedMappingData.length > 0) {
        dispatch(handleSearchedMappingDataChange(id, 'startDate', offsetDate));
      } else {
        dispatch(handleMappingDataChange(id, 'startDate', offsetDate));
      }
    },
    [dispatch, searchedMappingData]
  );

  const setEndDate = useCallback(
    (date: Date, id: number | string, startDate: DateType | string) => {
      const offsetDate: DateType = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      if (startDate) {
        if (searchedMappingData && searchedMappingData.length > 0) {
          dispatch(handleSearchedMappingDataChange(id, 'endDate', offsetDate));
        } else {
          dispatch(handleMappingDataChange(id, 'endDate', offsetDate));
        }
      } else {
        dispatch(failedRequest('Select start date first'));
      }
    },
    [dispatch, searchedMappingData]
  );

  const setYear = useCallback(
    (date: DateType, key: keyof MappingFileDataType, id: number | string) => {
      dispatch(handleMappingDataChange(id, key, date));
    },
    [dispatch]
  );

  return {
    setCommonDateField,
    setValidFromDate,
    setValidToDate,
    setStartDate,
    setEndDate,
    setYear,
  };
};
