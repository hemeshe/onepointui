import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import {
  failedRequest,
  setCurrentNav,
  setCurrentPage,
  setSearchInput,
} from '../../../../store/app/actions';
import { AppStateType } from '../../../../store';

import { Fetch } from '../../../../helpers/fetch';

import { DateFormat } from '../../../../helpers/date-format';

import { useGetProfiles } from '../hooks/useGetProfiles';
import { useGetHistory } from '../hooks/useGetHistory';
import { useSnakeCase } from '../../../../hooks/useSnakeCase';

import { setSearchData } from '../../../../store/admin/actions';
import { Api } from '../../../../helpers/api';

export const useProfiles = () => {
  const { path } = useRouteMatch();
  let history = useHistory();
  const dispatch = useDispatch();
  const appState = useSelector((state: AppStateType) => state.app);
  const { srchInput } = appState;

  const [csvData, setCsvData] = useState<any[]>([]);

  const { getProfiles } = useGetProfiles();
  const { getHistory } = useGetHistory();
  const { convertToSnakeCase } = useSnakeCase();

  const handleSetCsvExport = useCallback(async () => {
    try {
      const uri =
        history.location.pathname === '/power-bi-drls/profiles/history'
          ? 'Account/History/PowerBiDrlsProfiles'
          : 'Account/View/PowerBiDrlsProfiles';
      const resp = await Fetch(`${Api}/${uri}`, 'GET');
      const json = await resp.json();
      if (json) {
        const ifd = JSON.parse(JSON.stringify(json));
        ifd.forEach((el: any) => {
          for (var key in el) {
            if (
              key === 'loadDate' ||
              key === 'reportingDate' ||
              key === 'loadDate' ||
              key === 'reportingDate' ||
              key === 'validFrom' ||
              key === 'validTo'
            ) {
              el[convertToSnakeCase(key)] = DateFormat(el[key]);
            } else {
              el[convertToSnakeCase(key)] = el[key];
            }
            delete el[key];
            delete el['ID'];
            delete el['id'];
            delete el['TEAM_REPORT_ID'];
            delete el['PROFILE_ID'];
            delete el['HOME_PAGE_ID'];
            delete el['LANDING_PAGE_ID'];
            delete el['SUB_LANDING_PAGE_ID'];
            delete el['REPORT_ID'];
          }
        });
        setCsvData(ifd);
      }
    } catch (error: any) {
      failedRequest(error.message ?? 'Some Api Error!');
    }
  }, [convertToSnakeCase, history.location.pathname]);

  useEffect(() => {
    setTimeout(() => {
      handleSetCsvExport();
    }, 500);
  }, [dispatch, handleSetCsvExport]);

  const handleRouteChange = useCallback(
    (e, r, n, access) => {
      e.preventDefault();
      dispatch(setCurrentNav('/power-bi-drls', n));
      history.push(r);
    },
    [history, dispatch]
  );

  const handleRefresh = useCallback(() => {
    if (history.location.pathname === '/power-bi-drls/profiles/history') {
      getHistory();
    } else {
      getProfiles(1, 20);
    }
  }, [getProfiles, getHistory, history.location.pathname]);

  const handleSearchInput = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (srchInput && srchInput.length > 0) {
        const value = srchInput;
        dispatch(setCurrentPage(1));
        getProfiles(1, 20, value);
      } else {
        dispatch(setSearchData(null));
      }
    },
    [getProfiles, dispatch, srchInput]
  );

  const handleSrchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (!value || value === '') {
        dispatch(setSearchData(null));
      }
      dispatch(setSearchInput(e.target.value));
    },
    [dispatch]
  );

  return {
    handleSearchInput,
    handleSrchInputChange,
    handleRefresh,
    handleRouteChange,
    csvData,
    appState,
    path,
    history,
    srchInput,
  };
};
