import { UserAccessType, HistoryDataType } from "../../types/app";

export type AppState = {
  showModal: boolean;
  isLoading: boolean;
  isUploading: boolean;
  success: boolean;
  error: boolean;
  message: string;
  currentNav?: string;
  currentSubNav?: string;
  currentSubNavChild?: string;
  currentPage: number;
  showInfo?: boolean;
  userAccess: UserAccessType;
  isActive?: boolean;
  NoAccess?: boolean;
  userName?: string;
  fileUploadSuccess: boolean;
  pagination?: any;
  historyCsvData: HistoryDataType[] | null;
  srchInput?: string;
};

export type NavType = Pick<AppState, "currentNav" | "currentSubNav">;

export const SET_CURRENT_NAV = "SET_CURRENT_NAV";

export const SET_INFO_VISIBILITY = "SET_INFO_VISIBILITY";

export const SET_USER_ACCESS = "SET_USER_ACCESS";

export const SET_NO_ACCESS = "SET_NO_ACCESS";

export const START_LOADING = "START_LOADING";

export const FINISH_LOADING = "FINISH_LOADING";

export const CLOSE_MODAL = "CLOSE_MODAL";

export const SHOW_MODAL = "SHOW_MODAL";

export const START_REQUEST = "START_REQUEST";

export const FAILED_REQUEST = "FAILED_REQUEST";

export const SUCCESS_REQUEST = "SUCCESS_REQUEST";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const SET_PAGINATION = "SET_PAGINATION";

export const SET_HISTORY_FOR_CSV = "SET_HISTORY_FOR_CSV";

export const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";

interface setCurrentNavAction {
  type: typeof SET_CURRENT_NAV;
  currentNav?: string;
  currentSubNav?: string;
  currentSubNavChild?: string;
}

interface setInfoVisibilityAction {
  type: typeof SET_INFO_VISIBILITY;
  showInfo: boolean;
}

interface setUserAccessAction {
  type: typeof SET_USER_ACCESS;
  access: UserAccessType | string;
  userName: string;
  isActive: boolean;
}

interface setNoAccessAction {
  type: typeof SET_NO_ACCESS;
  noAccess: boolean;
}

interface closeModalAction {
  type: typeof CLOSE_MODAL;
}

interface showModalAction {
  type: typeof SHOW_MODAL;
}

interface startLoading {
  type: typeof START_LOADING;
}

interface finishLoading {
  type: typeof FINISH_LOADING;
}

interface closeModal {
  type: typeof CLOSE_MODAL;
}

interface showModal {
  type: typeof SHOW_MODAL;
}

interface startRequestAction {
  type: typeof START_REQUEST;
}

interface failedRequestAction {
  type: typeof FAILED_REQUEST;
  message: string;
}

interface successRequestAction {
  type: typeof SUCCESS_REQUEST;
  message: string;
}

interface setCurrentPage {
  type: typeof SET_CURRENT_PAGE;
  page: number;
}

interface setPagination {
  type: typeof SET_PAGINATION;
  pagination: any;
}

interface setHistoryForCsv {
  type: typeof SET_HISTORY_FOR_CSV;
  history: HistoryDataType[] | null;
}

interface setSearchInput {
  type: typeof SET_SEARCH_INPUT;
  srchInput: string;
}

export type AppTypes =
  | setCurrentNavAction
  | setInfoVisibilityAction
  | setUserAccessAction
  | setNoAccessAction
  | closeModalAction
  | showModalAction
  | startLoading
  | finishLoading
  | closeModal
  | showModal
  | startRequestAction
  | failedRequestAction
  | successRequestAction
  | setCurrentPage
  | setPagination
  | setHistoryForCsv
  | setSearchInput;
