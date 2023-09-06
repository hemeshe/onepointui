import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

import { AppStateType } from '../../../../../../../store';

import {
  successRequest,
  startRequest,
  failedRequest,
} from '../../../../../../../store/app/actions';
import { removeNewLocalProfile } from '../../../../../../../store/admin/actions';

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
  const { profile } = adminState;
  const authService = new AuthService();
  const { getProfiles } = useGetProfiles();

  const handleSave = useCallback(async () => {
    let user = await authService.getUser();
    let token = user?.access_token;
    try {
      dispatch(startRequest());
      let payload = {
        profileType: profile?.profileType,
        profileName: profile?.profileName,
        reportId: profile?.selectedReportPages?.map((r) => r.pageId),
        status: profile?.status === 'Active' ? true : profile?.status,
        access: profile?.access,
      };
      let response = await fetch(`${Api}/Account/Add/PowerBiDrlsProfiles`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.status === 200) {
        dispatch(removeNewLocalProfile());
        getProfiles(1, 20);
        setTimeout(() => {
          dispatch(successRequest('Profile Added Successfully'));
        }, 1000);
      } else if (response.status === 400) {
        let Json = await response.json();
        let message = Json.errorMessage ?? 'Some api error!';
        throw new Error(message);
      } else if (response.status === 401) {
        throw new Error('Unauthorized!');
      } else if (response.status === 500) {
        throw new Error('Internal Api Error!');
      }
    } catch (error: any) {
      dispatch(failedRequest(error.message));
    }
  }, [dispatch, profile, authService, getProfiles]);

  const validateSave = useCallback(() => {
    if (!profile?.profileType || profile.profileType === '') {
      dispatch(failedRequest('Profile Type is required!'));
      return;
    }
    if (!profile?.profileName || profile.profileName === '') {
      dispatch(failedRequest('Profile name is required!'));
      return;
    }
    if (!profile?.selectedHomePages || profile.selectedHomePages.length === 0) {
      dispatch(failedRequest('Please select home pages!'));
      return;
    }
    if (
      !profile?.selectedLandingPages ||
      profile.selectedLandingPages.length === 0
    ) {
      dispatch(failedRequest('Please select landing pages!'));
      return;
    }
    if (
      !profile?.selectedSubLandingPages ||
      profile.selectedSubLandingPages.length === 0
    ) {
      dispatch(failedRequest('Please select sub landing pages!'));
      return;
    }
    if (
      !profile?.selectedReportPages ||
      profile.selectedReportPages.length === 0
    ) {
      dispatch(failedRequest('Please select report!'));
      return;
    }

    handleSave();
  }, [handleSave, profile, dispatch]);

  return (
    <React.Fragment>
      <CSVLink data={csvData} filename={`PowerBi-Drls-Profiles.csv`}>
        <Styled.Button>Export File</Styled.Button>
      </CSVLink>
      <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
      {profile && (
        <Styled.Button onClick={validateSave} backgroundColor='#89CFDC'>
          Save
        </Styled.Button>
      )}
    </React.Fragment>
  );
});
