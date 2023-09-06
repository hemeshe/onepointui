import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Trading_Allocation_Methodology_Mapping,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../helpers/mapping-tables-constants';

import {
  requestGetMappingData,
  successGetMappingData,
  setSearchMappingData,
} from '../../../store/mapping/actions';
import {
  startRequest,
  failedRequest,
  finishLoading,
} from '../../../store/app/actions';

import { useGetData } from '../../../hooks/useGetData';

export const useGetMappping = () => {
  const dispatch = useDispatch();
  const { Get } = useGetData();

  const getMapping = useCallback(
    (cob, mt, PageNumber, PageSize, searchValue = '') => {
      let queryParams =
        searchValue && searchValue !== ''
          ? `PageNumber=${PageNumber}&PageSize=${PageSize}&searchValue=${searchValue}`
          : `PageNumber=${PageNumber}&PageSize=${PageSize}`;
      let getPromise;
      try {
        switch (mt) {
          case Trading_Allocation_Methodology_Mapping:
            getPromise = Get.bind(
              null,
              `/Mapping/View/MethodMapPaging/${cob}?${queryParams}`
            );
            break;

          case Trading_Allocation_Dollar_Per_Barrel_USD:
            getPromise = Get.bind(
              null,
              `/Mapping/View/UsdBblPaging/${cob}?${queryParams}`
            );
            break;

          case Le_Sfs_Codes:
            getPromise = Get.bind(
              null,
              `/Mapping/View/LeSfsCodePaging/${cob}?${queryParams}`
            );
            break;

          case Report_Freeze_Map:
            getPromise = Get.bind(
              null,
              `/Mapping/View/ControlFrzTimePaging/${cob}?${queryParams}`
            );
            break;

          default:
            break;
        }

        if (getPromise) {
          dispatch(requestGetMappingData());
          dispatch(startRequest());
          getPromise().then((data) => {
            if (searchValue && searchValue !== '') {
              dispatch(setSearchMappingData(data));
            } else {
              dispatch(successGetMappingData(data));
            }
            dispatch(finishLoading());
          });
        }
      } catch (error: any) {
        dispatch(failedRequest(error.message));
      }
    },
    [dispatch, Get]
  );

  return { getMapping };
};
