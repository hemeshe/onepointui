import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

import { AppStateType } from '../../../../../../../store';

import {
  successRequest,
  startRequest,
  failedRequest,
} from '../../../../../../../store/app/actions';

import * as Styled from '../../../../../styles';

import { Api } from '../../../../../../../helpers/api';

import { AuthService } from '../../../../../../../helpers/sso/AuthService';
import { useGetProfiles } from '../../../../hooks/useGetProfiles';

type Props = {
  csvData: any[];
  handleRefresh: () => void;
};

export const Nav = memo(({ csvData, handleRefresh }: Props) => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { userData } = adminState;
  const authService = new AuthService();
  const { getProfiles } = useGetProfiles();

  const handleClick = useCallback(async () => {
    let user = await authService.getUser();
    let token = user?.access_token;
    try {
      dispatch(startRequest());
      const dataToUpdate = userData?.filter((m) => m.IsEditable === true);
      let payload = dataToUpdate?.map((nu) => {
        return {
          teamReportId: Number(nu.teamReportId),
          profileId: nu.profileId,
          reportId: Number(nu.reportId),
          status: nu.status,
          access: nu.access,
        };
      });
      console.log(JSON.stringify(payload));
      let response = await fetch(`${Api}/Account/Edit/PowerBiDrlsProfiles`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.status === 200) {
        // let json = await response.json();
        // console.log(JSON.stringify(json));
        getProfiles(1, 20);
        dispatch(successRequest('Profile Updated Successfully'));
      } else if (response.status === 400) {
        let json = await response.json();
        let message = json.errorMessage ?? 'Some api error!';
        throw new Error(message);
      } else if (response.status === 401) {
        throw new Error('Unauthorized!');
      } else if (response.status === 500) {
        throw new Error('Internal Api Error!');
      }
    } catch (error: any) {
      dispatch(failedRequest(error.message));
    }
  }, [dispatch, userData, authService, getProfiles]);

  return (
    <React.Fragment>
      {userData &&
        !!userData.length &&
        userData.filter((m) => m.IsEditable === true).length > 0 && (
          <Styled.Button onClick={handleClick} backgroundColor='#89CFDC'>
            Save
          </Styled.Button>
        )}
      <CSVLink data={csvData} filename={`PowerBi-Drls-Profiles.csv`}>
        <Styled.Button>Export File</Styled.Button>
      </CSVLink>
      <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
    </React.Fragment>
  );
});
