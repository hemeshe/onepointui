import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
} from '../../../helpers/ingestion-tables-constants';

import { successSaveIngestionConfig } from '../../../store/data-ingestion/actions';
import { AppStateType } from '../../../store';

import { SaveSopusConfig } from '../api/save-sopus-config';
import { SaveVolumeNumeratorConfig } from '../api/save-volume-numerator-config';
import { SaveTaWorkingCapitalConfig } from '../api/save-ta-working-capital-config';

import {
  startRequest,
  failedRequest,
  successRequest,
} from '../../../store/app/actions';

import { AckM } from '../../../helpers/constants';
import { IngestionFileDataType } from '../../../types/data-ingestion';
import { handleResponse } from '../../../helpers/handleResponse';

import { useValidateSopus } from '../validation-hooks/useValidateSopus';
import { useValidateVolumeNumerator } from '../validation-hooks/useValidateVolumeNumerator';
import { useValidateTaWorkingCapitalConfig } from '../validation-hooks/useValidateTaWorkingCapital';

export const useSaveDataIngestionConfig = () => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const dispatch = useDispatch();
  const { selectedDif, selectedCof } = dataIngestionState;

  const { validateSopusConfig } = useValidateSopus();
  const { validateVolumeNumeratorConfig } = useValidateVolumeNumerator();
  const { validateTaWorkingCapital } = useValidateTaWorkingCapitalConfig();

  const handleValidate = useCallback(
    (nM) => {
      switch (selectedDif) {
        case SopusO1F:
          return validateSopusConfig(nM);

        case VolumeNumerator:
          return validateVolumeNumeratorConfig(nM);

        case TaWorkingCapital:
          return validateTaWorkingCapital(nM);

        default:
          return true;
      }
    },
    [
      selectedDif,
      validateSopusConfig,
      validateVolumeNumeratorConfig,
      validateTaWorkingCapital,
    ]
  );

  const postPromise = useCallback(
    (nM) => {
      switch (selectedDif) {
        case SopusO1F:
          return SaveSopusConfig(nM, selectedCof);

        case VolumeNumerator:
          return SaveVolumeNumeratorConfig(nM, selectedCof);

        case TaWorkingCapital:
          return SaveTaWorkingCapitalConfig(nM, selectedCof);

        default:
          return Promise.reject(null);
      }
    },
    [selectedCof, selectedDif]
  );

  const saveDataIngestionConfig = useCallback(
    (nM: IngestionFileDataType[]) => {
      let isInvalid = handleValidate(nM);
      if (isInvalid) {
        return;
      }
      dispatch(startRequest());
      if (!isInvalid) {
        postPromise(nM)
          .then(handleResponse)
          .then((data: any) => {
            if (data.ErrorMessage) {
              dispatch(failedRequest(data.ErrorMessage));
            } else {
              dispatch(successSaveIngestionConfig(AckM));
              dispatch(successRequest(AckM));
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch(failedRequest(error.message));
          });
      }
    },
    [dispatch, handleValidate, postPromise]
  );
  return { saveDataIngestionConfig };
};
