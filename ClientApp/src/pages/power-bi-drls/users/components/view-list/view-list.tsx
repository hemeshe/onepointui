import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

import { setCurrentNav } from "../../../../../store/app/actions";

import { UsersTable } from "../data-table";
import { AppStateType } from "../../../../../store";

import { useGetUsers } from "../../hooks/useGetUser";

import { successGetUserData } from "../../../../../store/admin/actions";

export const ViewList = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { userData } = adminState;

  const { getUsers } = useGetUsers();

  useEffect(() => {
    dispatch(setCurrentNav("/power-bi-drls", "Users", "View"));
    getUsers();

    return () => {
      dispatch(successGetUserData([]));
    };
  }, [dispatch, getUsers]);

  return (
    <CS.Container>
      <UsersTable Data={userData ?? []} />
    </CS.Container>
  );
};
