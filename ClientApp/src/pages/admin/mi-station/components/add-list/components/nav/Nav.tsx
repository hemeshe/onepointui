import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

import { AppStateType } from '../../../../../../../store';

import {
  successRequest,
  startRequest,
  failedRequest,
} from '../../../../../../../store/app/actions';

//import { successAddUser } from "../../../../../../../store/admin/actions";

import * as Styled from '../../../../../styles';

import { Api } from '../../../../../../../helpers/api';

import { AuthService } from '../../../../../../../helpers/sso/AuthService';

//import { useEncrypt } from "../../../../../hooks/useDecrypt";
import { useGetUsers } from '../../../../hooks/useGetUser';

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
  //const { encryptFieldByGlobalIv, encryptField } = useEncrypt();
  const { getUsers } = useGetUsers();

  const handleSave = useCallback(async () => {
    if (!validEmailRegex.test(newUser[0].userEmail)) {
      dispatch(failedRequest('Invalid user email!'));
      return;
    }
    if (!newUser[0].homePage || newUser[0].homePage === '') {
      dispatch(failedRequest('home page is required!'));
      return;
    }
    let user = await authService.getUser();
    let token = user?.access_token;
    try {
      dispatch(startRequest());
      let user = newUser.map((nu) => {
        return {
          userEmail: nu.userEmail,
          homePage: Number(nu.homePage) === 0 ? null : Number(nu.homePage),
          // landingPage:
          //   Number(nu.landingPage) === 0 ? null : Number(nu.landingPage),
          // subLandingPage:
          //   Number(nu.subLandingPage) === 0 ? null : Number(nu.subLandingPage),
          isActive: nu.isActive,
          landingPage: nu.landingPage1,
        };
      });
      console.log(JSON.stringify(user));
      let response = await fetch(`${Api}/Account/Add/MiStation`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.status === 200) {
        let json = await response.json();
        console.log(JSON.stringify(json));
        //if (json.userEmail) {
        // let newUser = {
        //   id: json.userPageId,
        //   userPageId: json.userPageId,
        //   userEmail: encryptFieldByGlobalIv(json.userEmail),
        //   access: encryptField(json.access, json.iv),
        //   isActive: json.isActive,
        //   createdTs: json.createdTs,
        //   modifiedTs: json.modifiedTs,
        //   modifiedBy: encryptField(json.modifiedBy, json.iv),
        //   createTs: "",
        //   createBy: "",
        //   createdBy: encryptField(json.createdBy, json.iv),

        //   homePage: encryptFieldByGlobalIv(json.homePage),
        //   landingPage: encryptFieldByGlobalIv(json.landingPage),
        //   subLandingPage: encryptFieldByGlobalIv(json.subLandingPage),
        // };
        //dispatch(successAddUser(newUser));
        getUsers(false);
        setTimeout(() => {
          dispatch(successRequest('User Added Successfully'));
        }, 1000);
        // } else {
        //   dispatch(failedRequest("Request failed!"));
        // }
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
  }, [dispatch, newUser, authService, getUsers]);

  return (
    <React.Fragment>
      {newUser && !!newUser.length && (
        <Styled.Button onClick={handleSave} backgroundColor='#89CFDC'>
          Save
        </Styled.Button>
      )}
      {/* <CSVLink data={csvData} filename={`Mi-Station-users.csv`}>
        <Styled.Button>Export File</Styled.Button>
      </CSVLink>
      <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button> */}
    </React.Fragment>
  );
});
