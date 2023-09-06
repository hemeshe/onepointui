import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as CS from '../common-styles';

import { setCurrentNav } from '../../../../../store/app/actions';

import { UsersTable } from './components/data-table';
import { AppStateType } from '../../../../../store';

import { useGetUsers } from '../../hooks/useGetUser';

import { NoAccess } from '../../../../../hocs/with-write-access';

export const AddList = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);

  const dispatch = useDispatch();
  const { userData } = adminState;

  const appState = useSelector((state: AppStateType) => state.app);
  const { userAccess } = appState;

  const { getUsers } = useGetUsers();

  useEffect(() => {
    dispatch(setCurrentNav('/admin', 'MI Portal', 'Add'));
    if (process.env.REACT_APP_BUILD_TYPE !== 'QAT' && userAccess === 'ADMIN') {
      getUsers();
    }
  }, [dispatch, getUsers, userAccess]);
  if (process.env.REACT_APP_BUILD_TYPE === 'QAT' && userAccess === 'ADMIN') {
    return <NoAccess />;
  }
  return (
    <CS.Container>
      <UsersTable Data={userData ?? []} />
    </CS.Container>
  );
};
