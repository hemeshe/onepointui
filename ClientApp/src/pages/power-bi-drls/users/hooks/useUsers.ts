import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";

import { setCsvTemplate } from "../../../../store/admin/actions";
import { setCurrentNav } from "../../../../store/app/actions";
import { AppStateType } from "../../../../store";

import { useGetUsers } from "../hooks/useGetUser";
import { useGetHistory } from "../hooks/useGetHistory";
import { useFileUpload } from "../hooks/useFileUpload";

import { useCreateCsvData } from "../../../data-ingestion/hooks/useCreateCsvData";

export const useUsers = () => {
  const { path } = useRouteMatch();
  let history = useHistory();
  const dispatch = useDispatch();
  const adminState = useSelector((state: AppStateType) => state.admin);
  const appState = useSelector((state: AppStateType) => state.app);
  const { userData, csvTemplate } = adminState;

  const [csvData, setCsvData] = useState<any[]>([]);
  const [showImportFile, setShowImportFile] = useState(false);

  const { getUsers } = useGetUsers();
  const { getHistory } = useGetHistory();

  const { postfile } = useFileUpload();
  const { createCsvData } = useCreateCsvData();

  const handleSetCsvExport = useCallback(
    (data) => {
      if (data && data.length) {
        const ifd = createCsvData(data, "");
        setCsvData(ifd);
        let obj: any = {};
        obj["USER_EMAIL_ID"] = "";
        obj["PROFILE"] = "";
        obj["ACCESS"] = "";
        obj["STATUS"] = "";
        dispatch(setCsvTemplate([obj]));
      }
    },
    [createCsvData, dispatch]
  );

  useEffect(() => {
    if (userData && userData.length) {
      handleSetCsvExport(userData);
    }
  }, [dispatch, userData, handleSetCsvExport]);

  const handleRouteChange = useCallback(
    (e, r, n, access) => {
      e.preventDefault();
      dispatch(setCurrentNav("/power-bi-drls", n));
      history.push(r);
    },
    [history, dispatch]
  );

  const handleRefresh = useCallback(() => {
    if (history.location.pathname === "/power-bi-drls/users/history") {
      getHistory();
    } else {
      getUsers();
    }
  }, [getUsers, getHistory, history.location.pathname]);

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let filter, table, tr, td, i, txtValue;
      filter = e.target.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table?.getElementsByTagName("tr");
      if (tr) {
        for (i = 0; i < tr.length; i++) {
          td =
            history.location.pathname.split("/").indexOf("update") !== -1
              ? tr[i].getElementsByTagName("td")[1]
              : tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }
    },
    [history]
  );

  const handleFileUploadSubmit = useCallback(
    (file) => {
      setShowImportFile(false);
      postfile(file);
    },
    [postfile]
  );

  return {
    handleSearchInput,
    history,
    csvData,
    handleRefresh,
    appState,
    handleRouteChange,
    path,
    showImportFile,
    setShowImportFile,
    handleFileUploadSubmit,
    csvTemplate,
  };
};
