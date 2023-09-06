import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import {
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Trading_Allocation_Methodology_Mapping,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../helpers/mapping-tables-constants';

import {
  setCsvTemplate,
  setSearchMappingData,
} from '../../../store/mapping/actions';
import {
  setCurrentNav,
  setCurrentPage,
  setSearchInput,
} from '../../../store/app/actions';
import { AppStateType } from '../../../store';

import { useGetMappping } from '../hooks/useGetMapping';
import { useSnakeCase } from '../../../hooks/useSnakeCase';
import { useFileUpload } from '../hooks/useFileUpload';
import { useCreateCsvData } from '../hooks/useCreateCsvData';

import { DateFormat } from '../../../helpers/date-format';

import { Get } from '../api/get';

export const useMapping = () => {
  const { path } = useRouteMatch();
  let history = useHistory();
  const dispatch = useDispatch();
  const MappingState = useSelector((state: AppStateType) => state.mapping);
  const appState = useSelector((state: AppStateType) => state.app);
  const { selectedCof, selectedMt, csvTemplate, mappingData } = MappingState;
  const { srchInput } = appState;

  const [showImportFile, setShowImportFile] = useState(false);

  const [csvData, setCsvData] = useState<any[]>([]);
  const { getMapping } = useGetMappping();
  const { convertToSnakeCase } = useSnakeCase();
  const { postfile } = useFileUpload();
  const { createCsvData } = useCreateCsvData();

  const { historyCsvData } = appState;
  const { pathname } = history.location;

  const getPromise = useCallback(() => {
    switch (selectedMt) {
      case Trading_Allocation_Methodology_Mapping:
        return Get(`/Mapping/View/MethodMap/${selectedCof}`);

      case Trading_Allocation_Dollar_Per_Barrel_USD:
        return Get(`/Mapping/View/UsdBbl/${selectedCof}`);

      case Le_Sfs_Codes:
        return Get(`/Mapping/View/LeSfsCode/${selectedCof}`);

      case Report_Freeze_Map:
        return Get(`/Mapping/View/ControlFrzTime/${selectedCof}`);

      default:
        return Promise.resolve(null);
    }
  }, [selectedMt, selectedCof]);

  const handleSetCsvExport = useCallback(() => {
    if (getPromise) {
      getPromise().then((data) => {
        if (data && data.length) {
          const ifd = createCsvData(data);
          setCsvData(ifd);
        }
      });
    }
  }, [createCsvData, getPromise]);

  useEffect(() => {
    if (mappingData && mappingData.length) {
      const ifd = createCsvData(mappingData);
      dispatch(setCsvTemplate([ifd[0]]));
    }
  }, [
    dispatch,
    mappingData,
    createCsvData,
    handleSetCsvExport,
    selectedCof,
    selectedMt,
    convertToSnakeCase,
  ]);

  useEffect(() => {
    if (selectedCof && selectedMt) {
      setTimeout(() => {
        handleSetCsvExport();
      }, 1000);
    }
    return () => {
      setCsvData([]);
    };
  }, [selectedCof, selectedMt, handleSetCsvExport]);

  const handleRouteChange = useCallback(
    (e, r, n, access) => {
      e.preventDefault();
      dispatch(setCurrentNav('/mapping', n));
      history.push(r);
    },
    [history, dispatch]
  );

  const handleRefresh = useCallback(() => {
    dispatch(setCurrentPage(1));
    if (srchInput && srchInput.length > 0) {
      getMapping(selectedCof, selectedMt, 1, 20, srchInput);
    } else {
      getMapping(selectedCof, selectedMt, 1, 20);
    }
  }, [selectedMt, selectedCof, getMapping, dispatch, srchInput]);

  const handleSearchInput = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (srchInput && srchInput.length > 0) {
        const value = srchInput;
        dispatch(setCurrentPage(1));
        getMapping(selectedCof, selectedMt, 1, 20, value);
      } else {
        dispatch(setSearchMappingData(null));
      }
    },
    [selectedMt, selectedCof, getMapping, dispatch, srchInput]
  );

  const handleSrchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (!value || value === '') {
        dispatch(setSearchMappingData(null));
      }
      dispatch(setSearchInput(e.target.value));
    },
    [dispatch]
  );

  const handleFileUploadSubmit = useCallback(
    (file) => {
      setShowImportFile(false);
      postfile(file);
    },
    [postfile]
  );

  return {
    handleFileUploadSubmit,
    handleSrchInputChange,
    handleSearchInput,
    handleRefresh,
    handleRouteChange,
    handleSetCsvExport,
    history,
    historyCsvData,
    csvData,
    showImportFile,
    setShowImportFile,
    pathname,
    srchInput,
    selectedCof,
    selectedMt,
    csvTemplate,
    mappingData,
    appState,
    path,
  };
};
