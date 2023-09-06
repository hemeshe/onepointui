import {
  AdminState,
  AdminTypes,
  ADD_NEW_LOCAL_USER,
  UPDATE_LOCAL_USER_ROW,
  MAKE_USER_ROW_EDITABLE,
  SUCCESS_USER_UPDATE,
  REQUEST_GET_USER_DATA,
  SUCCESS_GET_USER_DATA,
  HANDLE_USER_DATA_CHANGE,
  HANDLE_USER_DATA_CHANGE_PORTAL,
  SORT_BY_FIELD_NAME,
  SET_USER_QUERY_PARAMS,
  SET_CSV_TEMPLATE,
  SUCCESS_ADD_USER,
  REMOVE_NEW_LOCAL_USER,
  UPDATE_LOCAL_USER,
  UPDATE_USER_DATA,
  SET_HOME_PAGE_OPTIONS,
  SET_LANDING_PAGE_OPTIONS,
  SET_SUB_LANDING_PAGE_OPTIONS,
  SET_LANDING_PAGE_OPTIONS_FOR_EDIT,
  SET_SUB_LANDING_PAGE_OPTIONS_FOR_EDIT,
  SUCCESS_ADD_USER_DRLS,
  SUCCESS_GET_PROFILES_DRLS,
  HANDLE_USER_DATA_CHANGE_DRLS_PROFILES,
  ADD_DRLS_PROFILES_PAGES,
  MAKE_SEARCHED_USER_ROW_EDITABLE,
  HANDLE_SEARCHED_USER_DATA_CHANGE_DRLS_PROFILES,
  SORT_BY_SEARCHED_FIELD_NAME,
  SET_SEARCH_DATA,
  UPDATE_DRLS_PROFILES_NEW_PROFILE,
  ADD_NEW_LOCAL_PROFILE,
  REMOVE_NEW_LOCAL_PROFILE,
} from "./types";

import { sortByKey } from "../../helpers/sortByKey";

import { User } from "../../types/admin";

const initialState: AdminState = {
  userData: null,
  csvTemplate: [],
  newUser: [],
};

export const adminReducer = (
  state = initialState,
  action: AdminTypes
): AdminState => {
  let newUserData, sorted, fname;
  let newLocalUser: User;
  switch (action.type) {
    case ADD_NEW_LOCAL_USER:
      newLocalUser = {
        id: action.id,
        userEmail: "",
        access: "READ",
        status: "Active",
        isActive: false,
        createTs: "",
        modifiedTs: "",
        createBy: "",
        modifiedBy: "",
        landingPage1: [],
      };

      return {
        ...state,
        newUser: [...state.newUser, newLocalUser],
      };

    case REMOVE_NEW_LOCAL_USER:
      let filteredNewUser = state.newUser?.filter((m) => m?.id !== action.id);
      return {
        ...state,
        newUser: filteredNewUser ?? [],
      };

    case UPDATE_LOCAL_USER_ROW:
      let objn = action.fieldName,
        objv = action.fieldValue;
      let updated =
        state.newUser?.map((d) => {
          if (d?.id === action.id) {
            return {
              ...d,
              [objn]: objv,
            };
          }
          return d;
        }) ?? [];
      return {
        ...state,
        newUser: updated,
      };

    case MAKE_USER_ROW_EDITABLE:
      return {
        ...state,
        userData: action.user,
      };

    case MAKE_SEARCHED_USER_ROW_EDITABLE:
      return {
        ...state,
        userSearchedData: action.user,
      };

    case SUCCESS_USER_UPDATE:
      return {
        ...state,
        userData: action.users,
      };

    case REQUEST_GET_USER_DATA:
      return {
        ...state,
        userData: [],
        newUser: [],
      };

    case SUCCESS_GET_USER_DATA:
      return {
        ...state,
        userData: action.users,
        userSearchedData: [],
        newUser: [],
      };

    case HANDLE_USER_DATA_CHANGE_PORTAL:
      console.log(action);
      newUserData = state.userData
        ? state.userData.map((m: any) => {
            if (m.id === action.id) {
              m[action.fieldName] = action.fieldValue;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        userData: newUserData ?? [],
      };

    case HANDLE_USER_DATA_CHANGE:
      console.log(action);
      newUserData = state.userData
        ? state.userData.map((m: any) => {
            if (m.userPageId === action.id) {
              m[action.fieldName] = action.fieldValue;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        userData: newUserData ?? [],
      };

    case SORT_BY_FIELD_NAME:
      sorted = state.userData;
      fname = action.fieldName;
      if (state.userData) {
        sorted = sortByKey<any>(state.userData, fname, action.sorted);
      }
      return {
        ...state,
        userData: sorted,
      };

    case SORT_BY_SEARCHED_FIELD_NAME:
      sorted = state.userSearchedData;
      fname = action.fieldName;
      if (state.userSearchedData) {
        sorted = sortByKey<any>(state.userSearchedData, fname, action.sorted);
      }
      return {
        ...state,
        userSearchedData: sorted,
      };

    case SET_USER_QUERY_PARAMS:
      return {
        ...state,
      };

    case SET_CSV_TEMPLATE:
      return {
        ...state,
        csvTemplate: action.csvTemplate,
      };

    case SUCCESS_ADD_USER:
      let cU = state.userData ?? [];
      let uToAdd = action.user ?? {};
      return {
        ...state,
        userData: [...cU, uToAdd],
        newUser: [],
      };

    case UPDATE_LOCAL_USER:
      return {
        ...state,
        newUser: action.users,
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.users,
      };

    case SET_HOME_PAGE_OPTIONS:
      return {
        ...state,
        homePageOptions: action.homePageOptions,
      };

    case SET_LANDING_PAGE_OPTIONS:
      let u1 =
        state.newUser?.map((d) => {
          if (d?.id === action.userId) {
            d.landingPageOptions = action.landingPageOptions;
          }
          return d;
        }) ?? [];
      return {
        ...state,
        landingPageOptions: action.landingPageOptions,
        newUser: u1,
      };

    case SET_LANDING_PAGE_OPTIONS_FOR_EDIT:
      let newExistingUserData = state.userData
        ? state.userData.map((m: any) => {
            if (m?.userPageId === action.userId) {
              m.landingPageOptions = action.landingPageOptions;
            }
            return m;
          })
        : [];
      return {
        ...state,
        landingPageOptions: action.landingPageOptions,
        userData: newExistingUserData ?? [],
      };

    case SET_SUB_LANDING_PAGE_OPTIONS:
      let u2 =
        state.newUser?.map((d) => {
          if (d?.id === action.userId) {
            d.subLandingPageOptions = action.subLandingPageOptions;
          }
          return d;
        }) ?? [];
      return {
        ...state,
        subLandingPageOptions: action.subLandingPageOptions,
        newUser: u2,
      };

    case SET_SUB_LANDING_PAGE_OPTIONS_FOR_EDIT:
      let newExistingUserData1 = state.userData
        ? state.userData.map((m: any) => {
            if (m?.userPageId === action.userId) {
              m.subLandingPageOptions = action.subLandingPageOptions;
            }
            return m;
          })
        : [];
      return {
        ...state,
        subLandingPageOptions: action.subLandingPageOptions,
        userData: newExistingUserData1 ?? [],
      };

    case SUCCESS_ADD_USER_DRLS:
      let drlsUsers = state.userData ?? [];
      return {
        ...state,
        userData: [...action.user, ...drlsUsers],
        newUser: [],
      };

    case SUCCESS_GET_PROFILES_DRLS:
      return {
        ...state,
        userData: action.users,
        newUser: [],
      };

    case HANDLE_USER_DATA_CHANGE_DRLS_PROFILES:
      newUserData = state.userData
        ? state.userData.map((m: any) => {
            if (m.profileId === action.id) {
              m[action.fieldName] = action.fieldValue;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        userData: newUserData ?? [],
      };

    case HANDLE_SEARCHED_USER_DATA_CHANGE_DRLS_PROFILES:
      newUserData = state.userSearchedData
        ? state.userSearchedData.map((m: any) => {
            if (m.profileId === action.id) {
              m[action.fieldName] = action.fieldValue;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        userSearchedData: newUserData ?? [],
      };

    case ADD_DRLS_PROFILES_PAGES:
      return {
        ...state,
        homePages: action.homePages,
        landingPages: action.landingPages,
        subLandingPages: action.subLandingPages,
        reportDetails: action.reportDetails,
      };

    case SET_SEARCH_DATA:
      return {
        ...state,
        newUser: [],
        userSearchedData: action.users,
      };

    case ADD_NEW_LOCAL_PROFILE:
      const newLocalProfile = {
        id: action.id,
        userEmail: "",
        access: "READ",
        status: "Active",
        isActive: false,
        createTs: "",
        modifiedTs: "",
        createBy: "",
        modifiedBy: "",
        landingPage1: [],
        homePages: action.homePages,
      };
      return {
        ...state,
        profile: newLocalProfile,
      };

    case UPDATE_DRLS_PROFILES_NEW_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case REMOVE_NEW_LOCAL_PROFILE:
      return {
        ...state,
        profile: undefined,
      };

    default:
      return state;
  }
};
