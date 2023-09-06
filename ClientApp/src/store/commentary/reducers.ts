import {
  StateType,
  GET_CLASS_OF_BUSINESS,
  MappingTypes,
  ADD_NEW_LOCAL_COMMENTARY,
  SAVE_COMMENTARY,
  CANCEL_SAVE_COMMENTARY,
  COMMENTARY_UPLOAD_SUCCESS,
  MAKE_COMMENTARY_ROW_EDITABLE,
  REQUEST_COMMENTARY_UPDATE,
  SUCCESS_COMMENTARY_UPDATE,
  FAILED_COMMENTARY_UPDATE,
  CANCEL_COMMENTARY_UPDATE,
  REQUEST_COMMENTARY_ADD,
  SUCCESS_COMMENTARY_ADD,
  FAILED_COMMENTARY_ADD,
  CANCEL_COMMENTARY_ADD,
  SHOW_PREVIEW,
  SET_COMMENTARY_SELECTS,
  SET_COMMENTARY_SELECTS_ERROR,
  SET_CSV_TEMPLATE,
  SUCCESS_GET_COMMENTARY_HISTORY,
  SORT_HISTORY_TABLE,
} from "./types";

import { sortByKey } from "../../helpers/sortByKey";

const initialState: StateType = {
  isLoading: false,
  success: false,
  error: false,
  message: "",
  classOfBusiness: { id: 0, name: "" },
  commentaryData: [],
  newCommentaryData: [],
  fileUploadSuccess: false,
};

export const commentaryReducer = (
  state = initialState,
  action: MappingTypes
): StateType => {
  let newMapData, sorted, fname;
  switch (action.type) {
    case GET_CLASS_OF_BUSINESS:
      return {
        ...state,
        classOfBusiness: { id: 0, name: "" },
      };

    case ADD_NEW_LOCAL_COMMENTARY:
      return {
        ...state,
        newCommentaryData: [
          ...state.newCommentaryData,
          ...state.commentaryData,
        ],
        isLoading: false,
      };

    case SAVE_COMMENTARY:
      return {
        ...state,
        isLoading: true,
      };

    case CANCEL_SAVE_COMMENTARY:
      return {
        ...state,
        isLoading: false,
        newCommentaryData: [],
      };

    case COMMENTARY_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fileUploadSuccess: true,
      };

    case MAKE_COMMENTARY_ROW_EDITABLE:
      newMapData = state.commentaryData.map((m) => {
        if (m.id === action.commentary.id) {
          m.IsEditable = action.commentary.IsEditable;
          return m;
        }
        return m;
      });
      return {
        ...state,
        commentaryData: newMapData,
      };

    case REQUEST_COMMENTARY_UPDATE:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
        message: "",
      };

    case SUCCESS_COMMENTARY_UPDATE:
      newMapData = state.commentaryData.map((m) => {
        m.IsEditable = false;
        return m;
      });
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        message: "",
        commentaryData: newMapData,
      };

    case FAILED_COMMENTARY_UPDATE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: true,
        message: "",
      };

    case CANCEL_COMMENTARY_UPDATE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: false,
        message: "",
      };

    case REQUEST_COMMENTARY_ADD:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false,
        message: "",
      };

    case SUCCESS_COMMENTARY_ADD:
      newMapData = state.commentaryData.map((m) => {
        m.IsEditable = false;
        return m;
      });
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        message: "",
        commentaryData: newMapData,
        newCommentaryData: [],
      };

    case FAILED_COMMENTARY_ADD:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: true,
        message: "",
        commentaryData: state.commentaryData,
        newCommentaryData: [],
      };

    case CANCEL_COMMENTARY_ADD:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: false,
        message: "",
        newCommentaryData: [],
      };

    case SHOW_PREVIEW:
      return {
        ...state,
        showPreview: action.showPreview,
        commentaryPreviewList: action.commentaryPreviewList,
      };

    case SET_COMMENTARY_SELECTS:
      return {
        ...state,
        classOfBusiness: action.classOfBusiness ?? state.classOfBusiness,
        subSection1: action.subSection1 ?? state.subSection1,
        subSection2: action.subSection2 ?? state.subSection2,
        dashBoard: action.dashBoard ?? state.dashBoard,
        year: action.year ?? state.year,
        month: action.month ?? state.month,
        report: action.report ?? state.report,
      };

    case SET_COMMENTARY_SELECTS_ERROR:
      return {
        ...state,
        cobError: action.cobError ?? state.cobError,
        subSection1Error: action.subSection1Error ?? state.subSection1Error,
        subSection2Error: action.subSection2Error ?? state.subSection2Error,
        dashBoardError: action.dashBoardError ?? state.dashBoardError,
        yearError: action.yearError ?? state.yearError,
        monthError: action.monthError ?? state.monthError,
        reportError: action.reportError ?? state.reportError,
      };

    case SET_CSV_TEMPLATE:
      return {
        ...state,
        csvTemplate: action.csvTemplate,
      };

    case SUCCESS_GET_COMMENTARY_HISTORY:
      return {
        ...state,
        historyData: action.history,
        sortByField: "",
      };

    case SORT_HISTORY_TABLE:
      sorted = state.historyData;
      fname = action.fieldName;
      if (state.historyData) {
        sorted = sortByKey(state.historyData, fname, action.sorted);
      }
      return {
        ...state,
        historyData: sorted,
        sortByField: fname,
      };

    default:
      return state;
  }
};
