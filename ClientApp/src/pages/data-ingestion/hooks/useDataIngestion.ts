import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
  Ccpn,
} from '../../../helpers/ingestion-tables-constants';

import {
  setCurrentNav,
  setCurrentPage,
  setSearchInput,
} from '../../../store/app/actions';
import {
  setCsvTemplate,
  setSearchIngestionData,
} from '../../../store/data-ingestion/actions';

import { AppStateType } from '../../../store';

import { useGetDataIngestion } from '../hooks/useGetDataIngestion';
import { useFileUpload } from '../hooks/useFileUpload';
import { useGetDataIngestionConfig } from '../hooks/useGetDataIngestionConfig';
import { useCreateCsvData } from '../hooks/useCreateCsvData';

import { Get } from '../api/get';

export const useDataIngestion = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const { path } = useRouteMatch();
  let history = useHistory();
  const dispatch = useDispatch();
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const [showImportFile, setShowImportFile] = useState(false);
  const appState = useSelector((state: AppStateType) => state.app);
  const { getDataIngestion } = useGetDataIngestion();
  const { postfile } = useFileUpload();
  const { getDataIngestionConfig } = useGetDataIngestionConfig();
  const { createCsvData } = useCreateCsvData();

  const {
    ingestionFileData,
    selectedCof,
    selectedCofId,
    selectedDif,
    selectedDifId,
    selectedMonth,
    selectedYear,
    selectedQuarter,
    csvTemplate,
  } = dataIngestionState;
  const { historyCsvData, srchInput, currentSubNav } = appState;

  const { pathname } = history.location;

  const handleRouteChange = useCallback(
    (e, r, n, access) => {
      e.preventDefault();
      dispatch(setCurrentNav('/data-ingestion', n));
      history.push(r);
    },
    [history, dispatch]
  );

  const GetPromise = useCallback((): Promise<any> => {
    switch (selectedDif) {
      case SopusO1F:
        return Get.bind(null, `/DataIngestion/View/SopusO1F/${selectedCof}`)();

      case VolumeNumerator:
        return Get.bind(
          null,
          `/DataIngestion/View/VolNumerator/${selectedCof}`
        )();

      case TaWorkingCapital:
        return Get.bind(
          null,
          `/DataIngestion/View/WorkingCapital/${selectedCof}`
        )();

      case Ccpn:
        return Get.bind(null, `/DataIngestion/View/Ccpn/${selectedYear}`)();

      default:
        return Promise.resolve(null);
    }
  }, [selectedCof, selectedDif, currentSubNav, selectedYear, selectedMonth]);

  const handleSetCsvExport = useCallback(() => {
    if (GetPromise) {
      GetPromise().then((data) => {
        if (data && data.length) {
          const ifd = createCsvData(data, selectedDif);
          setCsvData(ifd);
        }
      });
    }
  }, [selectedDif, createCsvData, GetPromise]);

  useEffect(() => {
    if (ingestionFileData && ingestionFileData.length) {
      const ifd = createCsvData(ingestionFileData, selectedDif);
      dispatch(setCsvTemplate([ifd[0]]));
    }
  }, [
    ingestionFileData,
    dispatch,
    createCsvData,
    handleSetCsvExport,
    selectedDif,
    selectedCof,
  ]);

  useEffect(() => {
    if (selectedCof && selectedDif) {
      setTimeout(() => {
        handleSetCsvExport();
      }, 1000);
    }
    return () => {
      setCsvData([]);
    };
  }, [selectedCof, selectedDif, handleSetCsvExport]);

  const handleFileUploadSubmit = useCallback(
    (file) => {
      setShowImportFile(false);
      postfile(file);
    },
    [postfile]
  );

  const handleRefresh = useCallback(() => {
    dispatch(setCurrentPage(1));
    if (srchInput && srchInput.length > 0) {
      getDataIngestion(
        selectedCof,
        selectedCofId,
        selectedDif,
        selectedDifId,
        1,
        20,
        srchInput,
        selectedMonth,
        selectedYear
      );
    } else {
      getDataIngestion(
        selectedCof,
        selectedCofId,
        selectedDif,
        selectedDifId,
        1,
        20,
        '',
        selectedMonth,
        selectedYear
      );
    }
  }, [
    getDataIngestion,
    selectedCof,
    selectedCofId,
    selectedDif,
    selectedDifId,
    selectedMonth,
    selectedYear,
    dispatch,
    srchInput,
  ]);

  const handleConfigRefresh = useCallback(() => {
    if (srchInput && srchInput.length > 0) {
      getDataIngestionConfig(
        selectedCof,
        selectedCofId,
        selectedDif,
        selectedDifId,
        1,
        20,
        srchInput
      );
    } else {
      getDataIngestionConfig(
        selectedCof,
        selectedCofId,
        selectedDif,
        selectedDifId,
        1,
        20
      );
    }
  }, [
    selectedCof,
    selectedCofId,
    selectedDif,
    selectedDifId,
    getDataIngestionConfig,
    srchInput,
  ]);

  const handleSearchInput = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (srchInput && srchInput.length > 0) {
        const value = srchInput;
        dispatch(setCurrentPage(1));
        if (pathname.split('/').indexOf('configure-list') !== -1) {
          getDataIngestionConfig(
            selectedCof,
            selectedCofId,
            selectedDif,
            selectedDifId,
            1,
            20,
            srchInput
          );
        } else {
          getDataIngestion(
            selectedCof,
            selectedCofId,
            selectedDif,
            selectedDifId,
            1,
            20,
            value,
            selectedMonth,
            selectedYear,
            selectedQuarter
          );
        }
      } else {
        dispatch(setSearchIngestionData(null));
      }
    },
    [
      selectedCof,
      selectedCofId,
      selectedDif,
      selectedDifId,
      selectedMonth,
      selectedYear,
      selectedQuarter,
      getDataIngestion,
      dispatch,
      srchInput,
      getDataIngestionConfig,
      pathname,
    ]
  );

  const handleSrchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (!value || value === '') {
        dispatch(setSearchIngestionData(null));
      }
      dispatch(setSearchInput(e.target.value));
    },
    [dispatch]
  );

  return {
    handleSrchInputChange,
    handleSearchInput,
    handleConfigRefresh,
    handleRefresh,
    handleFileUploadSubmit,
    handleRouteChange,
    csvData,
    showImportFile,
    setShowImportFile,
    path,
    ingestionFileData,
    selectedCof,
    selectedCofId,
    selectedDif,
    selectedDifId,
    selectedMonth,
    selectedYear,
    selectedQuarter,
    csvTemplate,
    historyCsvData,
    srchInput,
    history,
    appState,
  };
};
