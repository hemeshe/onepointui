import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Trading_Allocation_Methodology_Mapping,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../helpers/mapping-tables-constants';

import { newMappingType } from '../../../types/mapping';
import { AppStateType } from '../../../store';

import { PostMethodMap } from '../api/post-method-map';
import { PostUsdBbl } from '../api/post-usd-bbl';
import { PostLeSfsCodes } from '../api/post-le-sfs-codes';
import { PostReportFreezeMap } from '../api/post-report-freeze-map';

import {
  successAddMapping,
  successMappingUpdate,
} from '../../../store/mapping/actions';
import {
  startRequest,
  failedRequest,
  successRequest,
} from '../../../store/app/actions';

import { AckM, EditAckM } from '../../../helpers/constants';
import { handleResponse } from '../../../helpers/handleResponse';

import { useValidateMethodMap } from '../validation-hooks/useValidateMethodMap';
import { useValidateUsdBbl } from '../validation-hooks/useValidateUsdBbl';
import { useValidateLeSfsCode } from '../validation-hooks/useValidateLeSfsCode';
import { useValidateReportFreezeMap } from '../validation-hooks/useValidateReportFreezeMap';

export const useSaveMappping = () => {
  const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  const dispatch = useDispatch();
  const { selectedMt, selectedCof, selectedMtId } = dataMappingState;

  const { validateMethodMap } = useValidateMethodMap();
  const { validateUsdBbl } = useValidateUsdBbl();
  const { validateLeSfsCode } = useValidateLeSfsCode();
  const { validateReportFreezeMap } = useValidateReportFreezeMap();

  const handleValidate = useCallback(
    (nM: newMappingType[]) => {
      switch (selectedMt) {
        case Trading_Allocation_Methodology_Mapping:
          return validateMethodMap(nM);

        case Trading_Allocation_Dollar_Per_Barrel_USD:
          return validateUsdBbl(nM);

        case Le_Sfs_Codes:
          return validateLeSfsCode(nM);

        case Report_Freeze_Map:
          return validateReportFreezeMap(nM);

        default:
          return true;
      }
    },
    [
      selectedMt,
      validateMethodMap,
      validateUsdBbl,
      validateLeSfsCode,
      validateReportFreezeMap,
    ]
  );

  const postPromise = useCallback(
    (nM: newMappingType[]) => {
      switch (selectedMt) {
        case Trading_Allocation_Methodology_Mapping:
          return PostMethodMap(nM, selectedMtId, selectedCof);

        case Trading_Allocation_Dollar_Per_Barrel_USD:
          return PostUsdBbl(nM, selectedMtId, selectedCof);

        case Le_Sfs_Codes:
          return PostLeSfsCodes(nM, selectedCof, selectedMtId);

        case Report_Freeze_Map:
          return PostReportFreezeMap(nM, selectedCof, selectedMtId);

        default:
          return Promise.reject(null);
      }
    },
    [selectedMt, selectedMtId, selectedCof]
  );

  const handleSave = useCallback(
    (nM: newMappingType[], operationType: string) => {
      let isInvalid = handleValidate(nM);
      if (isInvalid) {
        return;
      }
      dispatch(startRequest());
      if (!isInvalid) {
        postPromise(nM)
          .then(handleResponse)
          .then((resp: any) => resp.json())
          .then((data: any) => {
            if (data.ErrorMessage || data.errorMessage) {
              let err = data.ErrorMessage || data.errorMessage;
              dispatch(failedRequest(err + '(API Error)'));
            } else {
              if (operationType === 'add') {
                dispatch(successAddMapping(AckM));
                dispatch(successRequest(AckM));
              } else {
                dispatch(successMappingUpdate(EditAckM));
                dispatch(successRequest(EditAckM));
              }
            }
          })
          .catch((error: any) => {
            console.log(error);
            dispatch(failedRequest(error.message));
          });
      }
    },
    [dispatch, handleValidate, postPromise]
  );
  return { handleSave };
};
