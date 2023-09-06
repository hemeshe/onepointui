import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

//import { usersData } from "../../constants";

import { setCurrentNav } from "../../../../../store/app/actions";

import { UsersTable } from "../data-table";
import { AppStateType } from "../../../../../store";

import { useGetUsers } from "../../hooks/useGetUser";

export const ViewList = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { getUsers } = useGetUsers();
  const { userData } = adminState;

  useEffect(() => {
    dispatch(setCurrentNav("/admin", "MI Station", "View"));
    getUsers();
  }, [dispatch, getUsers]);

  return (
    <CS.Container>
      <UsersTable Data={userData ?? []} />
    </CS.Container>
  );
};
