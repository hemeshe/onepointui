import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UserHeadings } from '../constants';

import {
  sortByFieldName,
  addNewLocalProfile,
  updateDrlsProfiles,
  removeNewLocalProfile,
} from '../../../../store/admin/actions';

import { AppStateType } from '../../../../store';

import { User } from '../../../../types/admin';

import { headingsType } from './useProfilesEditTable';

import { useGetPageOptions } from '../hooks/useGetPageOptions';

export const useProfilesAddTable = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: AppStateType) => state.admin);
  const [headings, setHeadings] = useState<headingsType[]>(UserHeadings);

  const {
    profile,
    homePageOptions,
    homePages,
    landingPages,
    subLandingPages,
    reportDetails,
  } = adminState;

  const { getPages } = useGetPageOptions();

  useEffect(() => {
    getPages();

    return () => {
      dispatch(removeNewLocalProfile());
    };
  }, [getPages, dispatch]);

  const handleSortClick = useCallback(
    (h: headingsType) => {
      if (h && h.sorted) {
        let hds = headings?.map((el) => {
          el.sorted = false;
          return el;
        });
        dispatch(sortByFieldName(h.name, false));
        setHeadings(hds);
      } else {
        let hds = headings?.map((el) => {
          el.sorted = true;
          return el;
        });
        dispatch(sortByFieldName(h.name, true));
        setHeadings(hds);
      }
    },
    [dispatch, headings]
  );

  const handleAddRow = useCallback(() => {
    let id = `new-u?-${Math.random()}`;
    const deepCopiedHomePages = JSON.parse(JSON.stringify(homePages));

    dispatch(addNewLocalProfile(id, deepCopiedHomePages));
  }, [dispatch, homePages]);

  const handleRemoveAddRow = useCallback(() => {
    dispatch(removeNewLocalProfile());
  }, [dispatch]);

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      Key: keyof User
    ) => {
      const { value } = event.target;
      if (profile) {
        if (Key === 'profileType') {
          profile['profileName'] = '';
        }
        profile[Key] = value as never;
        dispatch(updateDrlsProfiles(profile));
      }
    },
    [dispatch, profile]
  );

  const handleHomePageInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      id: string,
      key: keyof User,
      selectedHomepage: any
    ) => {
      console.log(selectedHomepage);
      const { checked } = event.target;
      if (checked && profile) {
        let slh = [...(profile.selectedHomePages ?? []), selectedHomepage];
        let userLandingPages = landingPages
          ?.filter((el) => el.homePageId === selectedHomepage.pageId)
          .map((el) => {
            el.pageId = el.landingPageId;
            el.pageName = el.landingPageName;
            return el;
          });
        profile.selectedHomePages = slh;
        profile.landingPages = [
          ...(profile.landingPages ?? []),
          ...userLandingPages!!,
        ];
        dispatch(updateDrlsProfiles(profile));
      } else if (!checked && profile) {
        let slh =
          profile?.selectedHomePages?.filter(
            (lp) => lp.pageId !== selectedHomepage.pageId
          ) ?? [];
        let userLandingPages = profile?.landingPages?.filter(
          (el) => el.homePageId !== selectedHomepage.pageId
        );
        profile.selectedHomePages = slh;
        profile.landingPages = userLandingPages;

        let slhLand =
          profile?.selectedLandingPages?.filter(
            (lp) => lp.homePageId !== selectedHomepage.pageId
          ) ?? [];
        let slhSubLand =
          profile?.selectedSubLandingPages?.filter(
            (lp) => lp.homePageId !== selectedHomepage.pageId
          ) ?? [];
        let slhReport =
          profile?.selectedReportPages?.filter(
            (lp) => lp.homePageId !== selectedHomepage.pageId
          ) ?? [];
        let userSubLandingPages = profile?.subLandingPages?.filter(
          (el) => el.homePageId !== selectedHomepage.pageId
        );
        let reportPages = profile?.reportDetails?.filter(
          (el) => el.homePageId !== selectedHomepage.pageId
        );
        profile.selectedLandingPages = slhLand;
        profile.selectedSubLandingPages = slhSubLand;
        profile.selectedReportPages = slhReport;
        profile.subLandingPages = userSubLandingPages;
        profile.reportDetails = reportPages;
        dispatch(updateDrlsProfiles(profile));
      }
    },
    [dispatch, profile, landingPages]
  );

  const handleLandingPageInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      id: string,
      key: keyof User,
      selectedLandingpage: any
    ) => {
      console.log(selectedLandingpage);
      const { checked } = event.target;
      if (checked && profile) {
        let slh = [
          ...(profile.selectedLandingPages ?? []),
          selectedLandingpage,
        ];
        let userSubLandingPages = subLandingPages
          ?.filter((el) => el.landingPageId === selectedLandingpage.pageId)
          .map((el) => {
            el.pageId = el.subLandingPageId;
            el.pageName = el.subLandingPageName;
            return el;
          });
        profile.selectedLandingPages = slh;
        profile.subLandingPages = [
          ...(profile.subLandingPages ?? []),
          ...userSubLandingPages!!,
        ];
        dispatch(updateDrlsProfiles(profile));
      } else if (!checked && profile) {
        let slh =
          profile?.selectedLandingPages?.filter(
            (lp) => lp.pageId !== selectedLandingpage.pageId
          ) ?? [];
        let userSubLandingPages = profile?.subLandingPages?.filter(
          (el) => el.landingPageId !== selectedLandingpage.pageId
        );
        profile.selectedLandingPages = slh;
        profile.subLandingPages = userSubLandingPages;

        let slhSubLand =
          profile?.selectedSubLandingPages?.filter(
            (lp) => lp.landingPageId !== selectedLandingpage.pageId
          ) ?? [];
        let slhReport =
          profile?.selectedReportPages?.filter(
            (lp) => lp.landingPageId !== selectedLandingpage.pageId
          ) ?? [];
        let reportPages = profile?.reportDetails?.filter(
          (el) => el.landingPageId !== selectedLandingpage.pageId
        );
        profile.selectedSubLandingPages = slhSubLand;
        profile.selectedReportPages = slhReport;
        profile.reportDetails = reportPages;
        dispatch(updateDrlsProfiles(profile));
      }
    },
    [dispatch, profile, subLandingPages]
  );

  const handleSubLandingPageInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      id: string,
      key: keyof User,
      selectedSubLandingpage: any
    ) => {
      console.log(selectedSubLandingpage);
      const { checked } = event.target;
      if (checked && profile) {
        let slh = [
          ...(profile.selectedSubLandingPages ?? []),
          selectedSubLandingpage,
        ];
        let reportPages = reportDetails
          ?.filter(
            (el) => el.subLandingPageId === selectedSubLandingpage.pageId
          )
          .map((el) => {
            el.pageId = el.reportId;
            el.pageName = el.reportName;
            return el;
          });
        profile.selectedSubLandingPages = slh;
        profile.reportDetails = [
          ...(profile.reportDetails ?? []),
          ...reportPages!!,
        ];
        dispatch(updateDrlsProfiles(profile));
      } else if (!checked && profile) {
        let slh =
          profile?.selectedSubLandingPages?.filter(
            (lp) => lp.pageId !== selectedSubLandingpage.pageId
          ) ?? [];
        let reportPages = profile?.reportDetails?.filter(
          (el) => el.subLandingPageId !== selectedSubLandingpage.pageId
        );
        profile.selectedSubLandingPages = slh;
        profile.reportDetails = reportPages;
        dispatch(updateDrlsProfiles(profile));
      }
    },
    [dispatch, profile, reportDetails]
  );

  const handleReportInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      id: string,
      key: keyof User,
      selectedReport: any
    ) => {
      console.log(selectedReport);
      const { checked } = event.target;
      if (checked && profile) {
        let slh = [...(profile.selectedReportPages ?? []), selectedReport];
        profile.selectedReportPages = slh;
        dispatch(updateDrlsProfiles(profile));
      } else if (!checked && profile) {
        let slh =
          profile?.selectedReportPages?.filter(
            (lp) => lp.pageId !== selectedReport.pageId
          ) ?? [];
        profile.selectedReportPages = slh;
        dispatch(updateDrlsProfiles(profile));
      }
    },
    [dispatch, profile]
  );

  return {
    handleSortClick,
    headings,
    profile,
    handleAddRow,
    handleRemoveAddRow,
    handleChange,
    homePageOptions,
    handleHomePageInputChange,
    handleLandingPageInputChange,
    handleSubLandingPageInputChange,
    handleReportInputChange,
    adminState,
  };
};
