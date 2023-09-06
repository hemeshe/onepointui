import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

import { setCurrentNav } from "../../../../store/app/actions";

import {
  setMappingQueryParams,
  successGetMappingHistory,
} from "../../../../store/mapping/actions";

import {
  finishLoading,
  failedRequest,
  startRequest,
  setHistoryForCsv,
} from "../../../../store/app/actions";

import { GetHistoryForCSV } from "../../api/get-history";

import { HistoryHeadings } from "../../constants";
import { DataTable } from "./data-table";
import { AppStateType } from "../../../../store";

import { useSnakeCase } from "../../../../hooks/useSnakeCase";
import { Pagination } from "../../../../components/pagination";
import { useGetData } from "../../../../hooks/useGetData";

export const History = () => {
  const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  const dispatch = useDispatch();
  const { historyData } = dataMappingState;
  const { convertToSnakeCase } = useSnakeCase();
  const { Get } = useGetData();

  const loadHistory = useCallback(
    (page, size) => {
      dispatch(startRequest());
      // GetHistory(page, size)
      Get(`/History?PageNumber=${page}&PageSize=${size}&originFrom=mapping`)
        .then((data) => {
          if (data) {
            dispatch(successGetMappingHistory(data));
            dispatch(finishLoading());
          } else {
            dispatch(failedRequest("No data found!"));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(failedRequest(error.message));
        });
    },
    [dispatch, Get]
  );

  const loadHistoryForCcv = useCallback(() => {
    GetHistoryForCSV()
      .then((data) => {
        if (data) {
          const ifd = JSON.parse(JSON.stringify(data));
          ifd.forEach((el: any) => {
            for (var key in el) {
              if (key.toUpperCase() !== key) {
                el[convertToSnakeCase(key)] = el[key];
                delete el[key];
                delete el["ID"];
                delete el["id"];
              }
            }
          });
          dispatch(setHistoryForCsv(ifd));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(failedRequest(error.message));
      });
  }, [dispatch, convertToSnakeCase]);

  useEffect(() => {
    dispatch(setCurrentNav("/mapping", "History"));
    dispatch(setMappingQueryParams("", "", "", ""));
    loadHistory(1, 20);
    loadHistoryForCcv();

    return () => {
      dispatch(successGetMappingHistory([]));
    };
  }, [dispatch, loadHistory, loadHistoryForCcv]);

  return (
    <CS.Container style={{ flexDirection: "column" }}>
      <DataTable headings={HistoryHeadings} historyData={historyData ?? []} />
      {historyData && (
        <Pagination
          loadData={loadHistory}
          pageData={historyData}
          pageSize={20}
        />
      )}
    </CS.Container>
  );
};
