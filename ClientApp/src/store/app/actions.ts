import {
  SET_CURRENT_NAV,
  SET_INFO_VISIBILITY,
  SET_USER_ACCESS,
  SET_NO_ACCESS,
  SHOW_MODAL,
  CLOSE_MODAL,
  START_LOADING,
  FINISH_LOADING,
  START_REQUEST,
  FAILED_REQUEST,
  SUCCESS_REQUEST,
  SET_CURRENT_PAGE,
  SET_PAGINATION,
  SET_HISTORY_FOR_CSV,
  SET_SEARCH_INPUT,
} from "./types";
import { HistoryDataType, UserAccessType } from "../../types/app";

export const setCurrentNav = (
  currentNav: string,
  currentSubNav: string = "",
  currentSubNavChild: string = ""
) => ({
  type: SET_CURRENT_NAV,
  currentNav,
  currentSubNav,
  currentSubNavChild,
});

export const setInfoVisbility = (showInfo: boolean) => ({
  type: SET_INFO_VISIBILITY,
  showInfo,
});

export const setUserAccess = (
  access: UserAccessType | string,
  userName: string,
  isActive: boolean
) => ({
  type: SET_USER_ACCESS,
  access,
  userName,
  isActive,
});

export const setNoAccess = (noAccess: boolean) => ({
  type: SET_NO_ACCESS,
  noAccess,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const finishLoading = () => ({
  type: FINISH_LOADING,
});

export const startRequest = () => ({
  type: START_REQUEST,
});

export const failedRequest = (message: string) => ({
  type: FAILED_REQUEST,
  message,
});

export const successRequest = (message: string = "") => ({
  type: SUCCESS_REQUEST,
  message,
});

export const setCurrentPage = (page: number) => ({
  type: SET_CURRENT_PAGE,
  page,
});

export const setPagination = (pagination: any) => ({
  type: SET_PAGINATION,
  pagination,
});

export const setHistoryForCsv = (history: HistoryDataType[] | null) => ({
  type: SET_HISTORY_FOR_CSV,
  history,
});

export const setSearchInput = (srchInput: string) => ({
  type: SET_SEARCH_INPUT,
  srchInput,
});
