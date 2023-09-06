import {
  AppState,
  SET_CURRENT_NAV,
  AppTypes,
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

const initialState: AppState = {
  isLoading: false,
  success: false,
  error: false,
  currentNav: "",
  currentSubNav: "",
  currentPage: 1,
  userAccess: "READ",
  showModal: false,
  isUploading: false,
  message: "",
  fileUploadSuccess: false,
  historyCsvData: null,
  srchInput: "",
};

export const appReducer = (
  state = initialState,
  action: AppTypes
): AppState => {
  switch (action.type) {
    case SET_CURRENT_NAV:
      const CSN =
        action.currentSubNav && action.currentSubNav !== ""
          ? action.currentSubNav
          : state.currentSubNav;
      const CSNC =
        action.currentSubNavChild && action.currentSubNavChild !== ""
          ? action.currentSubNavChild
          : state.currentSubNavChild;
      return {
        ...state,
        currentNav: action.currentNav,
        currentSubNav: CSN,
        currentSubNavChild: CSNC,
        srchInput: "",
        pagination: {},
        currentPage: 1,
      };

    case SET_INFO_VISIBILITY:
      return {
        ...state,
        showInfo: action.showInfo,
      };

    case SET_USER_ACCESS:
      return {
        ...state,
        userAccess: action.access,
        userName: action.userName,
        isActive: action.isActive,
      };

    case SET_NO_ACCESS:
      return {
        ...state,
        NoAccess: action.noAccess,
      };

    case START_LOADING:
      return {
        ...state,
        showModal: true,
        isLoading: true,
        //csvUploadErrorField: "",
      };

    case FINISH_LOADING:
      return {
        ...state,
        showModal: false,
        isLoading: false,
        isUploading: false,
        success: false,
        error: false,
        //csvUploadErrorField: "",
      };

    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
      };

    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
      };

    case START_REQUEST:
      return {
        ...state,
        showModal: true,
        isLoading: true,
        isUploading: false,
        success: false,
        error: false,
        message: "",
      };

    case FAILED_REQUEST:
      return {
        ...state,
        showModal: true,
        isLoading: false,
        isUploading: false,
        success: false,
        error: true,
        message: action.message,
      };

    case SUCCESS_REQUEST:
      return {
        ...state,
        isLoading: false,
        isUploading: false,
        success: true,
        error: false,
        message: action.message,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };

    case SET_PAGINATION:
      return {
        ...state,
        pagination: action.pagination,
      };

    case SET_HISTORY_FOR_CSV:
      return {
        ...state,
        historyCsvData: action.history,
      };

    case SET_SEARCH_INPUT:
      return {
        ...state,
        srchInput: action.srchInput,
      };

    default:
      return state;
  }
};
