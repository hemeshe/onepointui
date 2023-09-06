import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
  Ccpn,
} from '../../../helpers/ingestion-tables-constants';

import { UploadError, AckM } from '../../../helpers/constants';

import {
  startRequest,
  failedRequest,
  successRequest,
} from '../../../store/app/actions';
import {
  successGetDataIngestionData,
  failedWithCsvErrorsCsvIngestionUpload,
} from '../../../store/data-ingestion/actions';
import { AppStateType } from '../../../store';

import { PostSopusFile } from './../api/post-sopus-file';
import { PostVolumeNumeratorFile } from './../api/post-volume-numerator-file';
import { PostTaWorkingCapitalFile } from '../api/post-ta-working-capital-file';
import { PostCcpnFile } from '../api/post-ccpn-file';

import { ConsistentIngestionDataKeys } from './../helpers/consistent-ingestion-data-keys';

export const useFileUpload = () => {
  const dispatch = useDispatch();
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const {
    selectedDifId,
    selectedDif,
    selectedYear,
    selectedMonth,
    selectedQuarter,
    companyCodeSel,
  } = dataIngestionState;

  const postPromise = useCallback(
    (file) => {
      switch (selectedDif) {
        case SopusO1F:
          return PostSopusFile(file, selectedDifId);

        case VolumeNumerator:
          return PostVolumeNumeratorFile(file, selectedDifId);

        case TaWorkingCapital:
          return PostTaWorkingCapitalFile(file, selectedDifId);

        case Ccpn:
          return PostCcpnFile(
            file,
            selectedDifId,
            selectedYear,
            selectedQuarter,
            companyCodeSel
          );

        default:
          return Promise.resolve(null);
      }
    },
    [selectedDif, selectedDifId, selectedYear, selectedQuarter]
  );
  const postfile = useCallback(
    (file) => {
      dispatch(startRequest());
      if (postPromise) {
        postPromise(file)
          .then((data: any) => {
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
                cD = ConsistentIngestionDataKeys(data.CsvData);
              dispatch(successGetDataIngestionData(cD));
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
          })
          .catch((error) => {
            dispatch(failedRequest(error.message));
          });
      }
    },
    [dispatch, postPromise]
  );
  return { postfile };
};
