import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

import { AppStateType } from '../../../../../../../store';

import {
  successRequest,
  startRequest,
  failedRequest,
} from '../../../../../../../store/app/actions';

import { successUserUpdate } from '../../../../../../../store/admin/actions';

import * as Styled from '../../../../../styles';

import { Api } from '../../../../../../../helpers/api';

import { AuthService } from '../../../../../../../helpers/sso/AuthService';

type Props = {
  csvData: any[];
  handleRefresh: () => void;
};

export const Nav = memo(({ csvData, handleRefresh }: Props) => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { userData } = adminState;
  const authService = new AuthService();

  const handleClick = useCallback(async () => {
    const dataToUpdate = userData?.filter((m) => m.IsEditable === true);
    let user = await authService.getUser();
    let token = user?.access_token;
    try {
      dispatch(startRequest());
      let users = dataToUpdate ?? [];
      console.log(JSON.stringify(users));
      let response = await fetch(`${Api}/Account/Edit/Portal`, {
        method: 'POST',
        body: JSON.stringify(users),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.status === 200) {
        // let json = await response.json();
        // console.log(JSON.stringify(json));
        dispatch(successRequest('Users Updated Successfully'));
        const updatedUsers = userData?.map((m) => {
          if (m.IsEditable === true) {
            m.IsEditable = false;
          }
          return m;
        });
        successUserUpdate(updatedUsers ?? []);
      } else if (response.status === 400) {
        console.log(response);
        let json = await response.json();
        console.log(JSON.stringify(json));
        if (json.errorMessage) {
          dispatch(failedRequest(json.errorMessage));
        }
      } else if (response.status === 401) {
        dispatch(failedRequest('Unauthorized!'));
      } else if (response.status === 500) {
        dispatch(failedRequest('Internal Api Error!'));
      }
    } catch (error: any) {
      failedRequest(error.message);
    }
  }, [dispatch, userData, authService]);

  return (
    <React.Fragment>
      {userData &&
        !!userData.length &&
        userData.filter((m) => m.IsEditable === true).length > 0 && (
          <Styled.Button onClick={handleClick} backgroundColor='#89CFDC'>
            Save
          </Styled.Button>
        )}
      {/* <CSVLink data={csvData} filename={`Portal-users.csv`}>
        <Styled.Button>Export File</Styled.Button>
      </CSVLink>
      <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button> */}
    </React.Fragment>
  );
});
