import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Trading_Allocation_Methodology_Mapping,
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../helpers/mapping-tables-constants';

import { UploadError, AckM } from '../../../helpers/constants';

import {
  startRequest,
  failedRequest,
  successRequest,
} from '../../../store/app/actions';

import {
  failedWithCsvErrorsCsvIngestionUpload,
  successGetMappingData,
} from '../../../store/mapping/actions';

import { AppStateType } from '../../../store';

import { ConsistentDataKeys } from '../helpers/consistent-data-keys';

import { PostMethodMapFile } from '../api/post-method-map-file';
import { PostUsdBblFile } from '../api/post-usd-bbl-file';
import { PostLeSfsCodesFile } from '../api/post-le-sfs-codes-file';
import { PostReportFreezeMapFile } from '../api/post-report-freeze-map-file';

export const useFileUpload = () => {
  const dispatch = useDispatch();
  const MappingState = useSelector((state: AppStateType) => state.mapping);
  const { selectedMt, selectedMtId } = MappingState;

  const postPromise = useCallback(
    (file) => {
      switch (selectedMt) {
        case Trading_Allocation_Methodology_Mapping:
          return PostMethodMapFile(file, selectedMtId);

        case Trading_Allocation_Dollar_Per_Barrel_USD:
          return PostUsdBblFile(file, selectedMtId);

        case Le_Sfs_Codes:
          return PostLeSfsCodesFile(file, selectedMtId);

        case Report_Freeze_Map:
          return PostReportFreezeMapFile(file, selectedMtId);

        default:
          return Promise.reject(null);
      }
    },
    [selectedMt, selectedMtId]
  );

  const postfile = useCallback(
    async (file) => {
      dispatch(startRequest());
      try {
        if (postPromise) {
          const data = await postPromise(file);
          if (data && data.fileName) {
            dispatch(successRequest(AckM));
          } else if (
            data &&
            data.ColumnName &&
            data.ErrorType === 'Data' &&
            data.CsvData &&
            data.ErrorData &&
            data.ErrorMessage
          ) {
            let csvUploadErrorField = data.ColumnName,
              cD = ConsistentDataKeys(data.CsvData);
            dispatch(successGetMappingData(cD));
            dispatch(
              failedWithCsvErrorsCsvIngestionUpload(
                {
                  ErrorData: data.ErrorData,
                  ErrorMessage: data.ErrorMessage,
                },
                UploadError,
                csvUploadErrorField
              )
            );
            let newErMsg = `${UploadError} (${data.ErrorMessage})`;
            dispatch(failedRequest(newErMsg));
          } else if (data && data.ErrorMessage) {
            let newErMsg = `${UploadError} (${data.ErrorMessage})`;
            dispatch(failedRequest(newErMsg));
          } else {
            dispatch(failedRequest(UploadError));
          }
        }
      } catch (error: any) {
        dispatch(failedRequest(error.message));
      }
    },
    [dispatch, postPromise]
  );
  return { postfile };
};
