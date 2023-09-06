import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

import { setCurrentNav } from "../../../../../store/app/actions";

import { UsersTable } from "../data-table";
import { AppStateType } from "../../../../../store";

import { useGetHistory } from "../../hooks/useGetHistory";

export const History = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { userData } = adminState;

  const { getHistory } = useGetHistory();

  useEffect(() => {
    dispatch(setCurrentNav("/admin", "MI Portal", "History"));
    getHistory();
  }, [dispatch, getHistory]);

  return (
    <CS.Container>
      <UsersTable Data={userData ?? []} />
    </CS.Container>
  );
};
