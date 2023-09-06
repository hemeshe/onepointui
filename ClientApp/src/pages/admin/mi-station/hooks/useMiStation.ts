import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";

import { setCurrentNav } from "../../../../store/app/actions";
import { AppStateType } from "../../../../store";

import { DateFormat } from "../../../../helpers/date-format";

import { useGetUsers } from "./useGetUser";
import { useGetHistory } from "./useGetHistory";
import { timeFormat } from "../../../../helpers/time-format";

export const useMiStation = () => {
  const { path } = useRouteMatch();
  let history = useHistory();
  const dispatch = useDispatch();
  const adminState = useSelector((state: AppStateType) => state.admin);
  const appState = useSelector((state: AppStateType) => state.app);
  const { userData } = adminState;

  const [csvData, setCsvData] = useState<any[]>([]);

  const { getUsers } = useGetUsers();
  const { getHistory } = useGetHistory();

  const handleCsvImport = useCallback(() => {
    const ifd = JSON.parse(JSON.stringify(userData));
    ifd.forEach((el: any) => {
      for (var key in el) {
        if (key === "createTs" || key === "modifiedTs" || key === "createdTs") {
          el[key.toUpperCase()] =
            timeFormat(el[key]) + " " + DateFormat(el[key]);
        } else if (key === "isActive") {
          el[key.toUpperCase()] = el[key] ? "Active" : "Inactive";
        } else {
          el[key.toUpperCase()] = el[key];
        }

        delete el[key];
        delete el["createBy"];
        delete el["IsEditable"];
        delete el["createTs"];
        delete el["userPageId"];
        delete el["homePageId"];
        delete el["landingPageId"];
        delete el["subLandingPageId"];
        delete el["subLandingPage"];
        delete el["report"];
        delete el["iv"];
        delete el["id"];
      }
    });
    setCsvData(ifd);
  }, [userData]);

  useEffect(() => {
    if (userData && userData.length) {
      handleCsvImport();
    }
  }, [dispatch, userData, handleCsvImport]);

  const handleRouteChange = useCallback(
    (e, r, n, access) => {
      e.preventDefault();
      dispatch(setCurrentNav("/admin", n));
      history.push(r);
    },
    [history, dispatch]
  );

  const handleRefresh = useCallback(() => {
    if (history.location.pathname === "/admin/mi-station/history") {
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

  return {
    history,
    handleRefresh,
    csvData,
    handleSearchInput,
    appState,
    handleRouteChange,
    path,
  };
};
