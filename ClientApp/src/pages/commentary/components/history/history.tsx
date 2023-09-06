import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

import { setCurrentNav } from "../../../../store/app/actions";

import {
  finishLoading,
  failedRequest,
  startRequest,
  setHistoryForCsv,
} from "../../../../store/app/actions";

import { successGetCommentaryHistory } from "../../../../store/commentary/actions";

import { HistoryHeadings } from "../../constants";
import { DataTable } from "./data-table";
import { AppStateType } from "../../../../store";

import { useSnakeCase } from "../../../../hooks/useSnakeCase";
import { Pagination } from "../../../../components/pagination";
import { useGetData } from "../../../../hooks/useGetData";

export const History = () => {
  const MappingState = useSelector((state: AppStateType) => state.mapping);
  const dispatch = useDispatch();
  const { historyData } = MappingState;

  const { convertToSnakeCase } = useSnakeCase();
  const { Get } = useGetData();

  const loadHistory = useCallback(
    (page, size) => {
      dispatch(startRequest());
      // GetHistory(page, size)
      Get(`/History?PageNumber=${page}&PageSize=${size}&originFrom=commentary`)
        .then((data) => {
          if (data) {
            dispatch(successGetCommentaryHistory(data));
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
    Get(`/History/HistoryExport?originFrom=commentary`)
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
  }, [dispatch, convertToSnakeCase, Get]);

  useEffect(() => {
    dispatch(setCurrentNav("/commentary", "History"));
    // dispatch(setMappingQueryParams("", "", "", ""));
    loadHistory(1, 20);
    loadHistoryForCcv();

    return () => {
      dispatch(setHistoryForCsv(null));
      dispatch(successGetCommentaryHistory([]));
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
