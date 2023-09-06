import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

import {
  setCurrentNav,
  setCurrentPage,
} from "../../../../../store/app/actions";

import { UsersTable } from "../data-table";
import { AppStateType } from "../../../../../store";

import { useGetProfiles } from "../../hooks/useGetProfiles";
import { useProfilesEditTable } from "../../hooks/useProfilesEditTable";
import { Pagination } from "../../../../../components/pagination";
import { successGetUserData } from "../../../../../store/admin/actions";

export const UpdateList = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const appState = useSelector((state: AppStateType) => state.app);
  const dispatch = useDispatch();
  const { getProfiles } = useGetProfiles();
  const { getPages } = useProfilesEditTable();

  const { userData, userSearchedData } = adminState;
  const { srchInput } = appState;

  const loadData = useCallback(
    (pageNumber, pageSize) => {
      if (srchInput && srchInput.length > 0) {
        getProfiles(pageNumber, pageSize, srchInput);
      } else {
        getProfiles(pageNumber, pageSize);
      }
    },
    [getProfiles, srchInput]
  );

  useEffect(() => {
    dispatch(setCurrentNav("/power-bi-drls", "Profiles", "Edit"));
    dispatch(setCurrentPage(1));
    getProfiles(1, 20);
    getPages();

    return () => {
      dispatch(successGetUserData([]));
    };
  }, [dispatch, getProfiles, getPages]);

  const data = useMemo(() => {
    return userSearchedData &&
      Array.isArray(userSearchedData) &&
      userSearchedData.length > 0
      ? userSearchedData
      : userData;
  }, [userData, userSearchedData]);

  if (!data) return null;

  return (
    <CS.Container flexDirection="column">
      <UsersTable Data={data ?? []} />
      {data && <Pagination loadData={loadData} pageData={data} pageSize={20} />}
    </CS.Container>
  );
};
