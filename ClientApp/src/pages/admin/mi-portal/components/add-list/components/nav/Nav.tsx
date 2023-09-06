import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

import { AppStateType } from '../../../../../../../store';

import {
  successRequest,
  startRequest,
  failedRequest,
} from '../../../../../../../store/app/actions';

import { successAddUser } from '../../../../../../../store/admin/actions';

import * as Styled from '../../../../../styles';

import { Api } from '../../../../../../../helpers/api';

import { AuthService } from '../../../../../../../helpers/sso/AuthService';

import { useEncrypt } from '../../../../../hooks/useDecrypt';

type Props = {
  csvData: any[];
  handleRefresh: () => void;
};

/* eslint-disable no-useless-escape */
const validEmailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Nav = memo(({ csvData, handleRefresh }: Props) => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { newUser } = adminState;
  const authService = new AuthService();
  const { encryptFieldByGlobalIv, encryptField } = useEncrypt();

  const handleSave = useCallback(async () => {
    if (!validEmailRegex.test(newUser[0].userEmail)) {
      dispatch(failedRequest('Invalid user email!'));
      return;
    }
    let user = await authService.getUser();
    let token = user?.access_token;
    try {
      dispatch(startRequest());
      let payload = {
        userEmail: newUser[0].userEmail,
        access: newUser[0].access,
        isActive: newUser[0].isActive,
      };
      let response = await fetch(`${Api}/Account/Add/Portal`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.status === 200) {
        let json = await response.json();
        console.log(JSON.stringify(json));
        if (json.userEmail) {
          let respUser = {
            id: json.id,
            userEmail: encryptFieldByGlobalIv(json.userEmail),
            access: encryptField(json.access, json.iv),
            isActive: json.isActive,
            createTs: json.createTs,
            modifiedTs: json.modifiedTs,
            modifiedBy: encryptField(json.modifiedBy, json.iv),
            createBy: encryptField(json.createBy, json.iv),
          };
          dispatch(successAddUser(respUser));
          dispatch(successRequest('User Added Successfully'));
        }
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
  }, [dispatch, newUser, authService, encryptFieldByGlobalIv, encryptField]);

  return (
    <React.Fragment>
      {newUser && !!newUser.length && (
        <Styled.Button onClick={handleSave} backgroundColor='#89CFDC'>
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
