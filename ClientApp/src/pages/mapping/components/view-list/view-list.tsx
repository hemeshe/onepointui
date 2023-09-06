import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import * as CS from "../common-styles";

import { ParamsType } from "../../../../types/app";

import { useGetMappping } from "../../hooks/useGetMapping";
import { useList } from "../../hooks/useList";

import { setCurrentNav, setCurrentPage } from "../../../../store/app/actions";
import {
  setCsvTemplate,
  setMappingQueryParams,
  setSearchMappingData,
  successGetMappingData,
} from "../../../../store/mapping/actions";
import { Pagination } from "../../../../components/pagination";

export const ViewList = () => {
  const dispatch = useDispatch();
  let { cob, cobid, mt, mtid }: ParamsType = useParams();
  const { getMapping } = useGetMappping();

  const { loadData, data, Table } = useList();

  useEffect(() => {
    dispatch(setCurrentNav("/mapping", "View"));
    dispatch(setMappingQueryParams(cob!!, cobid!!, mt!!, mtid!!));
    dispatch(setCurrentPage(1));
    getMapping(cob, mt, 1, 20);

    return () => {
      dispatch(setSearchMappingData(null));
      dispatch(successGetMappingData([]));
      dispatch(setCsvTemplate([]));
    };
  }, [dispatch, cob, cobid, mt, mtid, getMapping]);

  if (!data || !Array.isArray(data) || data.length <= 0) {
    return null;
  }
  return (
    <CS.Container flexDirection="column">
      {Table}
      {data && <Pagination loadData={loadData} pageData={data} pageSize={20} />}
    </CS.Container>
  );
};
