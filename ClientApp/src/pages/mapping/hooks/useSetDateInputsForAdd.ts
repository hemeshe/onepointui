import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { updateLocalMappingRow } from '../../../store/mapping/actions';
import { failedRequest } from '../../../store/app/actions';
import { MappingFileDataType } from '../../../types/mapping';

type DateType = Date | [Date, Date] | null;

export const useSetDateInputs = () => {
  const dispatch = useDispatch();
  const setCommonDateField = useCallback(
    (date: DateType, id: number | string, fieldName: string) => {
      dispatch(updateLocalMappingRow(date, fieldName, id));
    },
    [dispatch]
  );

  const setValidFromDate = useCallback(
    (date: DateType, id: number | string) => {
      dispatch(updateLocalMappingRow(date, 'validFrom', id));
    },
    [dispatch]
  );

  const setValidToDate = useCallback(
    (
      date: DateType,
      id: number | string,
      validFrom: Date | [Date, Date] | null | string
    ) => {
      if (validFrom) {
        dispatch(updateLocalMappingRow(date, 'validTo', id));
      } else {
        dispatch(failedRequest('Select validFrom date first'));
      }
    },
    [dispatch]
  );

  const setStartDate = useCallback(
    (date: DateType, id: number | string) => {
      dispatch(updateLocalMappingRow(date, 'startDate', id));
    },
    [dispatch]
  );

  const setEndDate = useCallback(
    (
      date: Date | [Date, Date] | null,
      id: number | string,
      startDate: Date | [Date, Date] | null | string
    ) => {
      if (startDate) {
        dispatch(updateLocalMappingRow(date, 'endDate', id));
      } else {
        dispatch(failedRequest('Select start date first'));
      }
    },
    [dispatch]
  );

  const setYear = useCallback(
    (
      date: Date | [Date, Date] | null,
      key: keyof MappingFileDataType,
      id: number | string
    ) => {
      dispatch(updateLocalMappingRow(date, key, id));
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
