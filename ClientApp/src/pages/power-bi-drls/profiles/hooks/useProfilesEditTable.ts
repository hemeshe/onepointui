import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { UserHeadings } from "../constants";

import { ProfilesPagesType, User } from "../../../../types/admin";
import { AppStateType } from "../../../../store";
import {
  makeRowEditable,
  sortByFieldName,
  makeSearchedRowEditable,
} from "../../../../store/admin/actions";

import { useGetPageOptions } from "./useGetPageOptions";

export type headingsType = {
  id: string;
  name: string;
  label: string;
  sorted?: boolean;
};

export const useProfilesEditTable = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const AppState = useSelector((state: AppStateType) => state.app);
  const [headings, setHeadings] = useState<headingsType[]>(UserHeadings);

  let history = useHistory();

  const dispatch = useDispatch();
  const { getPages } = useGetPageOptions();
  const {
    userData,
    userSearchedData,
    homePageOptions,
    reportOptions,
    homePages,
    landingPages,
    subLandingPages,
    reportDetails,
  } = adminState;
  const { currentSubNavChild } = AppState;

  const data = useMemo(() => {
    return userSearchedData &&
      Array.isArray(userSearchedData) &&
      userSearchedData.length > 0
      ? userSearchedData
      : userData;
  }, [userData, userSearchedData]);

  const updateUser = useCallback(
    (newUser: User[]) => {
      if (
        userSearchedData &&
        Array.isArray(userSearchedData) &&
        userSearchedData.length > 0
      ) {
        dispatch(makeSearchedRowEditable(newUser));
      } else {
        dispatch(makeRowEditable(newUser));
      }
    },
    [dispatch, userSearchedData]
  );

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

  const handleRowSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, m: User) => {
      m.IsEditable = e.target.checked ? true : false;
      if (data) {
        const deepCopiedHomePages = JSON.parse(JSON.stringify(homePages));
        const deepCopiedLandingPages: ProfilesPagesType[] = JSON.parse(
          JSON.stringify(landingPages)
        );
        const deepCopiedSubLandingPages: ProfilesPagesType[] = JSON.parse(
          JSON.stringify(subLandingPages)
        );
        const deepCopiedReportDetails: ProfilesPagesType[] = JSON.parse(
          JSON.stringify(reportDetails)
        );
        let newUser: User[] = data.map((u) => {
          if (u.teamReportId === m.teamReportId) {
            u.IsEditable = m.IsEditable;
            u.homePages = deepCopiedHomePages;
            u.landingPages = deepCopiedLandingPages?.filter(
              (hm) => hm.homePageId === u.homePageId
            );
            u.subLandingPages = deepCopiedSubLandingPages?.filter(
              (hm) => hm.landingPageId === u.landingPageId
            );
            u.reportDetails = deepCopiedReportDetails?.filter(
              (hm) => hm.subLandingPageId === u.subLandingPageId
            );
          }
          return u;
        });
        updateUser(newUser);
      }
    },
    [data, homePages, landingPages, subLandingPages, reportDetails, updateUser]
  );

  const handleHomeInputChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, user: User) => {
      const { value, options, selectedIndex } = event.target;
      const deepCopiedLandingPages: ProfilesPagesType[] = JSON.parse(
        JSON.stringify(landingPages)
      );
      const deepCopiedSubLandingPages: ProfilesPagesType[] = JSON.parse(
        JSON.stringify(subLandingPages)
      );
      const deepCopiedReportDetails: ProfilesPagesType[] = JSON.parse(
        JSON.stringify(reportDetails)
      );
      let newUser = data?.map((u) => {
        if (u.teamReportId === user.teamReportId) {
          u.homePageId = Number(value);
          u.homePageName = options[selectedIndex].text;
          u.landingPageId = "";
          u.landingPageName = "";
          u.subLandingPageId = "";
          u.subLandingPageName = "";
          u.reportId = "";
          u.reportName = "";
          u.landingPages = deepCopiedLandingPages?.filter(
            (hm) => hm.homePageId === u.homePageId
          );
          u.subLandingPages = deepCopiedSubLandingPages?.filter(
            (hm) => hm.landingPageId === u.landingPageId
          );
          u.reportDetails = deepCopiedReportDetails?.filter(
            (hm) => hm.subLandingPageId === u.subLandingPageId
          );
        }
        return u;
      });
      newUser && updateUser(newUser);
    },
    [landingPages, subLandingPages, reportDetails, data, updateUser]
  );

  const handleLandingInputChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, user: User) => {
      console.log(user);
      const { value, options, selectedIndex } = event.target;
      const deepCopiedSubLandingPages: ProfilesPagesType[] = JSON.parse(
        JSON.stringify(subLandingPages)
      );
      const deepCopiedReportDetails: ProfilesPagesType[] = JSON.parse(
        JSON.stringify(reportDetails)
      );
      let newUser = data?.map((u) => {
        if (u.teamReportId === user.teamReportId) {
          u.landingPageId = Number(value);
          u.landingPageName = options[selectedIndex].text;
          u.subLandingPageId = "";
          u.subLandingPageName = "";
          u.reportId = "";
          u.reportName = "";
          u.subLandingPages = deepCopiedSubLandingPages?.filter(
            (hm) => hm.landingPageId === u.landingPageId
          );
          u.reportDetails = deepCopiedReportDetails?.filter(
            (hm) => hm.subLandingPageId === u.subLandingPageId
          );
        }
        return u;
      });
      newUser && updateUser(newUser);
    },
    [subLandingPages, reportDetails, data, updateUser]
  );

  const handleSubLandingInputChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, user: User) => {
      const { value, options, selectedIndex } = event.target;
      const deepCopiedReportDetails: ProfilesPagesType[] = JSON.parse(
        JSON.stringify(reportDetails)
      );
      let newUser = data?.map((u) => {
        if (u.teamReportId === user.teamReportId) {
          u.subLandingPageId = Number(value);
          u.subLandingPageName = options[selectedIndex].text;
          u.reportId = "";
          u.reportName = "";
          u.reportDetails = deepCopiedReportDetails?.filter(
            (hm) => hm.subLandingPageId === Number(value)
          );
        }
        return u;
      });
      newUser && updateUser(newUser);
    },
    [reportDetails, data, updateUser]
  );

  const handleReportInputChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, user: User) => {
      const { value, options, selectedIndex } = event.target;
      let newUser = data?.map((u) => {
        if (u.teamReportId === user.teamReportId) {
          u.reportId = Number(value);
          u.reportName = options[selectedIndex].text;
        }
        return u;
      });
      newUser && updateUser(newUser);
    },
    [data, updateUser]
  );

  const handleStatusInputChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, user: User) => {
      const { value } = event.target;
      let newUser = data?.map((u) => {
        if (u.teamReportId === user.teamReportId) {
          u.status = value;
        }
        return u;
      });
      newUser && updateUser(newUser);
    },
    [data, updateUser]
  );

  const handleAccessInputChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, user: User) => {
      const { value } = event.target;
      let newUser = data?.map((u) => {
        if (u.teamReportId === user.teamReportId) {
          u.access = value;
        }
        return u;
      });
      newUser && updateUser(newUser);
    },
    [data, updateUser]
  );

  return {
    handleHomeInputChange,
    handleLandingInputChange,
    handleSubLandingInputChange,
    handleReportInputChange,
    handleStatusInputChange,
    handleAccessInputChange,
    handleRowSelect,
    handleSortClick,
    reportOptions,
    history,
    getPages,
    currentSubNavChild,
    userData,
    homePageOptions,
    headings,
  };
};
