import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

import { AppStateType } from '../../../../../../../store';

import {
  successRequest,
  startRequest,
  failedRequest,
} from '../../../../../../../store/app/actions';

//import { successUserUpdate } from "../../../../../../../store/admin/actions";

import * as Styled from '../../../../../styles';

import { Api } from '../../../../../../../helpers/api';

import { AuthService } from '../../../../../../../helpers/sso/AuthService';
import { useEncrypt } from '../../../../../hooks/useDecrypt';
import { useGetUsers } from '../../../../hooks/useGetUser';

type Props = {
  csvData: any[];
  handleRefresh: () => void;
};

export const Nav = memo(({ csvData, handleRefresh }: Props) => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { userData } = adminState;
  const authService = new AuthService();
  const { encryptFieldByGlobalIv, encryptField } = useEncrypt();
  const { getUsers } = useGetUsers();

  // const handleClick = useCallback(() => {
  //   dispatch(startRequest());
  //   const dataToUpdate = userData?.map((m) => {
  //     if (m.IsEditable === true) {
  //       m.IsEditable = false;
  //     }
  //     return m;
  //   });
  //   if (dataToUpdate) {
  //     setTimeout(() => {
  //       dispatch(successRequest("User Added Successfully"));
  //       successUserUpdate(dataToUpdate);
  //     }, 2000);
  //   }
  // }, [dispatch, userData]);

  const handleClick = useCallback(async () => {
    let user = await authService.getUser();
    let token = user?.access_token;
    try {
      dispatch(startRequest());
      const dataToUpdate = userData?.filter((m) => m.IsEditable === true);
      let user = dataToUpdate?.map((nu) => {
        return {
          userPageId: Number(nu.userPageId),
          userEmail: nu.userEmail,
          homePage: Number(nu.homePageId) === 0 ? null : Number(nu.homePageId),
          landingPage:
            Number(nu.landingPageId) === 0 ? [] : [Number(nu.landingPageId)],
          // subLandingPage:
          //   Number(nu.subLandingPageId) === 0
          //     ? null
          //     : Number(nu.subLandingPageId),
          isActive: nu.isActive,
        };
      });
      console.log(JSON.stringify(user));
      let response = await fetch(`${Api}/Account/Edit/MiStation`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.status === 200 && userData) {
        let json = await response.json();
        console.log(JSON.stringify(json));
        //if (json.userEmail) {
        let updatedUsers = json.map((u: any) => {
          u.userEmail = encryptFieldByGlobalIv(u.userEmail);
          u.createdBy = encryptField(u.createdBy, u.iv);
          u.modifiedBy = encryptField(u.modifiedBy, u.iv);
          u.IsEditable = false;
          return u;
        });
        console.log(updatedUsers);
        //let allUsers = [...userData, ...updatedUsers];
        //dispatch(successUserUpdate(allUsers));
        getUsers(false);
        dispatch(successRequest('User Updated Successfully'));

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
  }, [
    dispatch,
    userData,
    authService,
    encryptField,
    encryptFieldByGlobalIv,
    getUsers,
  ]);

  return (
    <React.Fragment>
      {userData &&
        !!userData.length &&
        userData.filter((m) => m.IsEditable === true).length > 0 && (
          <Styled.Button onClick={handleClick} backgroundColor='#89CFDC'>
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
