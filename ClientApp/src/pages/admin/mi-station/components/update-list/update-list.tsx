import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as CS from '../common-styles';

//import { usersData } from "../../constants";

import { setCurrentNav } from '../../../../../store/app/actions';

import { UsersTable } from '../data-table';
import { AppStateType } from '../../../../../store';

import { useGetUsers } from '../../hooks/useGetUser';

import { NoAccess } from '../../../../../hocs/with-write-access';

export const UpdateList = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { getUsers } = useGetUsers();
  const { userData } = adminState;

  const appState = useSelector((state: AppStateType) => state.app);
  const { userAccess } = appState;

  useEffect(() => {
    dispatch(setCurrentNav('/admin', 'MI Station', 'Edit'));
    if (process.env.REACT_APP_BUILD_TYPE !== 'QAT' && userAccess === 'ADMIN') {
      getUsers();
    }
  }, [dispatch, getUsers]);

  if (process.env.REACT_APP_BUILD_TYPE === 'QAT' && userAccess === 'ADMIN') {
    return <NoAccess />;
  }

  return (
    <CS.Container>
      <UsersTable Data={userData ?? []} />
    </CS.Container>
  );
};
