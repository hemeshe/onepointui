import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

import { setCurrentNav } from "../../../../../store/app/actions";

import { UsersTable } from "../data-table";
import { AppStateType } from "../../../../../store";

import { useGetHistory } from "../../hooks/useGetHistory";
import { successGetUserData } from "../../../../../store/admin/actions";

export const History = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { getHistory } = useGetHistory();
  const { userData } = adminState;

  useEffect(() => {
    dispatch(setCurrentNav("/power-bi-drls", "Profiles", "History"));
    getHistory();

    return () => {
      dispatch(successGetUserData([]));
    };
  }, [dispatch, getHistory]);

  return (
    <CS.Container>
      <UsersTable Data={userData ?? []} />
    </CS.Container>
  );
};
