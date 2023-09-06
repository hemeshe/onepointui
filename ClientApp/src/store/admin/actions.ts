import {
  ADD_NEW_LOCAL_USER,
  REMOVE_NEW_LOCAL_USER,
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
  UPDATE_LOCAL_USER,
  UPDATE_USER_DATA,
  SET_HOME_PAGE_OPTIONS,
  SET_LANDING_PAGE_OPTIONS,
  SET_SUB_LANDING_PAGE_OPTIONS,
  SET_SUB_LANDING_PAGE_OPTIONS_FOR_EDIT,
  SET_LANDING_PAGE_OPTIONS_FOR_EDIT,
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

import {
  landingPageSelectOptionsType,
  ProfilesPagesType,
  User,
} from "../../types/admin";

export const addNewLocalUser = (id: string) => ({
  type: ADD_NEW_LOCAL_USER,
  id,
});

export const removeNewLocalUser = (id: string | number) => ({
  type: REMOVE_NEW_LOCAL_USER,
  id,
});

export const updateLocalUserRow = (
  fieldValue: string | boolean | number[] | [],
  fieldName: any,
  id: string | number
) => ({
  type: UPDATE_LOCAL_USER_ROW,
  fieldName,
  fieldValue,
  id,
});

export const successAddUser = (user: User) => ({
  type: SUCCESS_ADD_USER,
  user,
});

export const makeRowEditable = (user: User[]) => ({
  type: MAKE_USER_ROW_EDITABLE,
  user,
});

export const makeSearchedRowEditable = (user: User[]) => ({
  type: MAKE_SEARCHED_USER_ROW_EDITABLE,
  user,
});

export const successUserUpdate = (users: User[]) => ({
  type: SUCCESS_USER_UPDATE,
  users,
});

export const requestGetUserData = () => ({
  type: REQUEST_GET_USER_DATA,
});

export const successGetUserData = (users: User[]) => ({
  type: SUCCESS_GET_USER_DATA,
  users,
});

export const handleUserDataChange = (
  id: number | string,
  fieldName: string,
  fieldValue: string | boolean | string[]
) => ({
  type: HANDLE_USER_DATA_CHANGE,
  id,
  fieldName,
  fieldValue,
});

export const handleuserDataChangePortal = (
  id: number | string,
  fieldName: string,
  fieldValue: string | boolean
) => ({
  type: HANDLE_USER_DATA_CHANGE_PORTAL,
  id,
  fieldName,
  fieldValue,
});

export const sortByFieldName = (fieldName: string, sorted: boolean) => ({
  type: SORT_BY_FIELD_NAME,
  fieldName,
  sorted,
});

export const sortBySearchedFieldName = (
  fieldName: string,
  sorted: boolean
) => ({
  type: SORT_BY_SEARCHED_FIELD_NAME,
  fieldName,
  sorted,
});

export const setUserQueryParams = (
  selectedCof: string,
  selectedCofId: string,
  selectedMt: string,
  selectedMtId: string
) => ({
  type: SET_USER_QUERY_PARAMS,
  selectedCof,
  selectedCofId,
  selectedMt,
  selectedMtId,
});

export const setCsvTemplate = (csvTemplate: any[]) => ({
  type: SET_CSV_TEMPLATE,
  csvTemplate,
});

export const updateLocalUser = (users: User[]) => ({
  type: UPDATE_LOCAL_USER,
  users,
});

export const updateUserData = (users: User[]) => ({
  type: UPDATE_USER_DATA,
  users,
});

export const setHomePageOptions = (homePageOptions: any[]) => ({
  type: SET_HOME_PAGE_OPTIONS,
  homePageOptions,
});

export const setLandingPageOptions = (
  landingPageOptions: any[],
  userId: string
) => ({
  type: SET_LANDING_PAGE_OPTIONS,
  landingPageOptions,
  userId,
});

export const setLandingPageOptionsForEdit = (
  landingPageOptions: any[],
  userId: string
) => ({
  type: SET_LANDING_PAGE_OPTIONS_FOR_EDIT,
  landingPageOptions,
  userId,
});

export const setSubLandingPageOptions = (
  subLandingPageOptions: any[],
  userId: string
) => ({
  type: SET_SUB_LANDING_PAGE_OPTIONS,
  subLandingPageOptions,
  userId,
});

export const setSubLandingPageOptionsForEdit = (
  subLandingPageOptions: any[],
  userId: string
) => ({
  type: SET_SUB_LANDING_PAGE_OPTIONS_FOR_EDIT,
  subLandingPageOptions,
  userId,
});

export const successAddUserDrls = (user: User[]) => ({
  type: SUCCESS_ADD_USER_DRLS,
  user,
});

export const successGetProfilesDrls = (users: User[]) => ({
  type: SUCCESS_GET_PROFILES_DRLS,
  users,
});

export const handleProfilesDataChange = (
  id: number | string,
  fieldName: string,
  fieldValue: string | boolean | string[] | landingPageSelectOptionsType[]
) => ({
  type: HANDLE_USER_DATA_CHANGE_DRLS_PROFILES,
  id,
  fieldName,
  fieldValue,
});

export const handleSearchedProfilesDataChange = (
  id: number | string,
  fieldName: string,
  fieldValue: string | boolean | string[] | landingPageSelectOptionsType[]
) => ({
  type: HANDLE_SEARCHED_USER_DATA_CHANGE_DRLS_PROFILES,
  id,
  fieldName,
  fieldValue,
});

export const addDrlsProfilesPages = (
  homePages: ProfilesPagesType[] | null,
  landingPages: ProfilesPagesType[] | null,
  subLandingPages: ProfilesPagesType[] | null,
  reportDetails: ProfilesPagesType[] | null
) => ({
  type: ADD_DRLS_PROFILES_PAGES,
  homePages,
  landingPages,
  subLandingPages,
  reportDetails,
});

export const setSearchData = (users: User[] | null) => ({
  type: SET_SEARCH_DATA,
  users,
});

export const updateDrlsProfiles = (profile: User) => ({
  type: UPDATE_DRLS_PROFILES_NEW_PROFILE,
  profile,
});

export const addNewLocalProfile = (
  id: string,
  homePages?: ProfilesPagesType[] | null
) => ({
  type: ADD_NEW_LOCAL_PROFILE,
  id,
  homePages,
});

export const removeNewLocalProfile = () => ({
  type: REMOVE_NEW_LOCAL_PROFILE,
});
