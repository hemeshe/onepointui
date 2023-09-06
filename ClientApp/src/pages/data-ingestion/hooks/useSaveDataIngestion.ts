import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
} from '../../../helpers/ingestion-tables-constants';

import { successDataIngestionUpdate } from '../../../store/data-ingestion/actions';
import { AppStateType } from '../../../store';

import { PostEditedSopus } from '../api/post-edited-sopus';
import { PostEditedVolumeNumerator } from '../api/post-edited-volume-numerator';
import { PostEditedTaWorkingCapital } from '../api/post-edited-ta-working-capital';

import {
  startRequest,
  failedRequest,
  successRequest,
} from '../../../store/app/actions';

import { EditAckM } from '../../../helpers/constants';
import { handleResponse } from '../../../helpers/handleResponse';
import { IngestionFileDataType } from '../../../types/data-ingestion';

import { useValidateSopus } from '../validation-hooks/useValidateSopus';
import { useValidateVolumeNumerator } from '../validation-hooks/useValidateVolumeNumerator';
import { useValidateTaWorkingCapital } from '../validation-hooks/useValidateTaWorkingCapital';

export const useSaveDataIngestion = () => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const dispatch = useDispatch();
  const { selectedDif, selectedDifId, selectedCof } = dataIngestionState;

  const { validateSopus } = useValidateSopus();
  const { validateVolumeNumerator } = useValidateVolumeNumerator();
  const { validateTaWorkingCapital } = useValidateTaWorkingCapital();

  const handleValidate = useCallback(
    (nM) => {
      switch (selectedDif) {
        case SopusO1F:
          return validateSopus(nM);

        case VolumeNumerator:
          return validateVolumeNumerator(nM);

        case TaWorkingCapital:
          return validateTaWorkingCapital(nM);

        default:
          return true;
      }
    },
    [
      selectedDif,
      validateSopus,
      validateVolumeNumerator,
      validateTaWorkingCapital,
    ]
  );

  const postPromise = useCallback(
    (nM) => {
      switch (selectedDif) {
        case SopusO1F:
          return PostEditedSopus(nM, selectedDifId, selectedCof);

        case VolumeNumerator:
          return PostEditedVolumeNumerator(nM, selectedDifId, selectedCof);

        case TaWorkingCapital:
          return PostEditedTaWorkingCapital(nM, selectedDifId, selectedCof);

        default:
          return Promise.reject(null);
      }
    },
    [selectedCof, selectedDif, selectedDifId]
  );

  const saveDataIngestion = useCallback(
    (nM: IngestionFileDataType[]) => {
      let isInvalid = handleValidate(nM);
      if (isInvalid) {
        return;
      }
      dispatch(startRequest());
      if (!isInvalid) {
        postPromise(nM)
          .then(handleResponse)
          .then((resp) => resp.json())
          .then((data: any) => {
            console.log(data);
            if (data && data.fileName) {
              dispatch(successDataIngestionUpdate(EditAckM));
              dispatch(successRequest(EditAckM));
            } else if (data.ErrorMessage) {
              dispatch(failedRequest(data.ErrorMessage));
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch(failedRequest(error.message));
          });
      }
    },
    [dispatch, postPromise, handleValidate]
  );
  return { saveDataIngestion };
};
