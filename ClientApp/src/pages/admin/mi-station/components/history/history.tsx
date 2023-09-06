import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

//import { usersData } from "../../constants";

import { setCurrentNav } from "../../../../../store/app/actions";

import { UsersTable } from "../data-table";
import { AppStateType } from "../../../../../store";

import { useGetHistory } from "../../hooks/useGetHistory";

export const History = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { getHistory } = useGetHistory();
  const { userData } = adminState;

  useEffect(() => {
    dispatch(setCurrentNav("/admin", "MI Station", "History"));
    getHistory();
  }, [dispatch, getHistory]);

  return (
    <CS.Container>
      <UsersTable Data={userData ?? []} />
    </CS.Container>
  );
};
