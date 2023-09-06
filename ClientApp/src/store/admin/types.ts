import { ProfilesPagesType, User } from "../../types/admin";

export interface SelectOptionType {
  id: string;
  name: string;
}

export interface AdminState {
  userData: User[] | null;
  userSearchedData?: User[] | null;
  csvTemplate: any[];
  newUser: User[];
  homePageOptions?: any[];
  landingPageOptions?: any[];
  subLandingPageOptions?: any[];
  reportOptions?: any[];
  profile?: User;

  // for profiles
  homePages?: ProfilesPagesType[] | null;
  landingPages?: ProfilesPagesType[] | null;
  subLandingPages?: ProfilesPagesType[] | null;
  reportDetails?: ProfilesPagesType[] | null;
}

export const ADD_NEW_LOCAL_USER = "ADD_NEW_LOCAL_USER";

export const REMOVE_NEW_LOCAL_USER = "REMOVE_NEW_LOCAL_USER";

export const UPDATE_LOCAL_USER_ROW = "UPDATE_LOCAL_USER_ROW";

export const SUCCESS_ADD_USER = "SUCCESS_ADD_USER";

export const SUCCESS_ADD_USER_DRLS = "SUCCESS_ADD_USER_DRLS";

export const MAKE_USER_ROW_EDITABLE = "MAKE_USER_ROW_EDITABLE";

export const MAKE_SEARCHED_USER_ROW_EDITABLE =
  "MAKE_SEARCHED_USER_ROW_EDITABLE";

export const SUCCESS_USER_UPDATE = "SUCCESS_USER_UPDATE";

export const REQUEST_GET_USER_DATA = "REQUEST_USER_DATA";

export const SUCCESS_GET_USER_DATA = "SUCCESS_USER_DATA";

export const HANDLE_USER_DATA_CHANGE = "HANDLE_USER_DATA_CHANGE";

export const HANDLE_USER_DATA_CHANGE_PORTAL = "HANDLE_USER_DATA_CHANGE_PORTAL";

export const HANDLE_USER_DATA_CHANGE_DRLS_PROFILES =
  "HANDLE_USER_DATA_CHANGE_DRLS_PROFILES";

export const HANDLE_SEARCHED_USER_DATA_CHANGE_DRLS_PROFILES =
  "HANDLE_SEARCHED_USER_DATA_CHANGE_DRLS_PROFILES";

export const SORT_BY_FIELD_NAME = "SORT_BY_FIELD_NAME";

export const SORT_BY_SEARCHED_FIELD_NAME = "SORT_BY_SEARCHED_FIELD_NAME";

export const SET_USER_QUERY_PARAMS = "SET_USER_QUERY_PARAMS";

export const SET_CSV_TEMPLATE = "SET_CSV_TEMPLATE";

export const UPDATE_LOCAL_USER = "UPDATE_LOCAL_USER";

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const SET_HOME_PAGE_OPTIONS = "SET_HOME_PAGE_OPTIONS";

export const SET_LANDING_PAGE_OPTIONS = "SET_LANDING_PAGE_OPTIONS";

export const SET_LANDING_PAGE_OPTIONS_FOR_EDIT =
  "SET_LANDING_PAGE_OPTIONS_FOR_EDIT";

export const SET_SUB_LANDING_PAGE_OPTIONS = "SET_SUB_LANDING_PAGE_OPTIONS";

export const SET_SUB_LANDING_PAGE_OPTIONS_FOR_EDIT =
  "SET_SUB_LANDING_PAGE_OPTIONS_FOR_EDIT";

export const SUCCESS_GET_PROFILES_DRLS = "SUCCESS_GET_PROFILES_DRLS";

export const ADD_DRLS_PROFILES_PAGES = "ADD_DRLS_PROFILES_PAGES";

export const SET_SEARCH_DATA = "SET_SEARCH_DATA";

export const UPDATE_DRLS_PROFILES_NEW_PROFILE =
  "UPDATE_DRLS_PROFILES_NEW_PROFILE";

export const ADD_NEW_LOCAL_PROFILE = "ADD_NEW_LOCAL_PROFILE";

export const REMOVE_NEW_LOCAL_PROFILE = "REMOVE_NEW_LOCAL_PROFILE";

interface addNewLocalUser {
  type: typeof ADD_NEW_LOCAL_USER;
  id: string;
}

interface removeNewLocalUser {
  type: typeof REMOVE_NEW_LOCAL_USER;
  id: string;
}

interface updateLocalUserRow {
  type: typeof UPDATE_LOCAL_USER_ROW;
  fieldName: any;
  fieldValue: string | boolean | number[] | [];
  id: string;
}

interface successAddUser {
  type: typeof SUCCESS_ADD_USER;
  user: User;
}

interface successAddUserDrls {
  type: typeof SUCCESS_ADD_USER_DRLS;
  user: User[];
}

interface MakeRowEditable {
  type: typeof MAKE_USER_ROW_EDITABLE;
  user: User[];
}

interface MakeSearchedRowEditable {
  type: typeof MAKE_SEARCHED_USER_ROW_EDITABLE;
  user: User[];
}

interface successUserUpdate {
  type: typeof SUCCESS_USER_UPDATE;
  users: User[];
}

interface requestGetuserData {
  type: typeof REQUEST_GET_USER_DATA;
}

interface successGetuserData {
  type: typeof SUCCESS_GET_USER_DATA;
  users: User[];
}

interface handleuserDataChange {
  type: typeof HANDLE_USER_DATA_CHANGE;
  id: string | number | string[];
  fieldName: any;
  fieldValue: string | boolean;
}

interface handleuserDataChangePortal {
  type: typeof HANDLE_USER_DATA_CHANGE_PORTAL;
  id: string | number;
  fieldName: any;
  fieldValue: string | boolean;
}

interface sortByFieldName {
  type: typeof SORT_BY_FIELD_NAME;
  fieldName: string;
  sorted: boolean;
}

interface sortBySearchedFieldName {
  type: typeof SORT_BY_SEARCHED_FIELD_NAME;
  fieldName: string;
  sorted: boolean;
}

interface setUserQueryParams {
  type: typeof SET_USER_QUERY_PARAMS;
  selectedCof: string;
  selectedCofId: string;
  selectedMt: string;
  selectedMtId: string;
}

interface setCsvTemplate {
  type: typeof SET_CSV_TEMPLATE;
  csvTemplate: any[];
}

interface updateLocalUser {
  type: typeof UPDATE_LOCAL_USER;
  users: User[];
}

interface updateUserData {
  type: typeof UPDATE_USER_DATA;
  users: User[];
}

interface setHomePageOptions {
  type: typeof SET_HOME_PAGE_OPTIONS;
  homePageOptions: any[];
}

interface setLandingPageOptions {
  type: typeof SET_LANDING_PAGE_OPTIONS;
  landingPageOptions: any[];
  userId: string;
}

interface setSubLandingPageOptions {
  type: typeof SET_SUB_LANDING_PAGE_OPTIONS;
  subLandingPageOptions: any[];
  userId: string;
}

interface setLandingPageOptionsForEdit {
  type: typeof SET_LANDING_PAGE_OPTIONS_FOR_EDIT;
  landingPageOptions: any[];
  userId: string;
}

interface setSubLandingPageOptionsForEdit {
  type: typeof SET_SUB_LANDING_PAGE_OPTIONS_FOR_EDIT;
  subLandingPageOptions: any[];
  userId: string;
}

interface successGetProfilesDrls {
  type: typeof SUCCESS_GET_PROFILES_DRLS;
  users: User[];
}

interface handleProfilesDataChange {
  type: typeof HANDLE_USER_DATA_CHANGE_DRLS_PROFILES;
  id: string | number | string[];
  fieldName: any;
  fieldValue: string | boolean;
}

interface handleSearchedProfilesDataChange {
  type: typeof HANDLE_SEARCHED_USER_DATA_CHANGE_DRLS_PROFILES;
  id: string | number | string[];
  fieldName: any;
  fieldValue: string | boolean;
}

interface addDrlsProfilesPages {
  type: typeof ADD_DRLS_PROFILES_PAGES;
  homePages?: ProfilesPagesType[] | null;
  landingPages?: ProfilesPagesType[] | null;
  subLandingPages?: ProfilesPagesType[] | null;
  reportDetails?: ProfilesPagesType[] | null;
}

interface setSearchData {
  type: typeof SET_SEARCH_DATA;
  users: User[] | null;
}

interface updateDrlsProfiles {
  type: typeof UPDATE_DRLS_PROFILES_NEW_PROFILE;
  profile: User;
}

interface addNewLocalProfile {
  type: typeof ADD_NEW_LOCAL_PROFILE;
  id: string;
  homePages: ProfilesPagesType[] | null;
}

interface removeNewLocalProfile {
  type: typeof REMOVE_NEW_LOCAL_PROFILE;
}

export type AdminTypes =
  | addNewLocalUser
  | removeNewLocalUser
  | updateLocalUserRow
  | MakeRowEditable
  | successUserUpdate
  | requestGetuserData
  | successGetuserData
  | handleuserDataChange
  | sortByFieldName
  | setUserQueryParams
  | setCsvTemplate
  | successAddUser
  | updateLocalUser
  | updateUserData
  | setHomePageOptions
  | setLandingPageOptions
  | setSubLandingPageOptions
  | setLandingPageOptionsForEdit
  | setSubLandingPageOptionsForEdit
  | handleuserDataChangePortal
  | successAddUserDrls
  | successGetProfilesDrls
  | handleProfilesDataChange
  | addDrlsProfilesPages
  | MakeSearchedRowEditable
  | handleSearchedProfilesDataChange
  | sortBySearchedFieldName
  | setSearchData
  | updateDrlsProfiles
  | addNewLocalProfile
  | removeNewLocalProfile;
