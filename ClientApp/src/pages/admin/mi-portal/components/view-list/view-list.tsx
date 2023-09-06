import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as CS from "../common-styles";

import { setCurrentNav } from "../../../../../store/app/actions";

import { UsersTable } from "../data-table";
import { AppStateType } from "../../../../../store";

//import { useEncrypt } from "../../../hooks/useDecrypt";
import { useGetUsers } from "../../hooks/useGetUser";

export const ViewList = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { userData } = adminState;

  //const { encryptField, encryptFieldByGlobalIv } = useEncrypt();
  const { getUsers } = useGetUsers();

  useEffect(() => {
    dispatch(setCurrentNav("/admin", "MI Portal", "View"));
    getUsers();
  }, [dispatch, getUsers]);

  return (
    <CS.Container>
      <UsersTable Data={userData ?? []} />
    </CS.Container>
  );
};
