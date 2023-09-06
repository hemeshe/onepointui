import {
  GET_CLASS_OF_BUSINESS,
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
  ListType,
  SET_COMMENTARY_SELECTS,
  SET_COMMENTARY_SELECTS_ERROR,
  SET_CSV_TEMPLATE,
  SORT_HISTORY_TABLE,
  SUCCESS_GET_COMMENTARY_HISTORY,
} from "./types";

import { CommentaryDataType, HistoryDataType } from "../../types/commentary";

export const getClassOfBusiness = () => ({
  type: GET_CLASS_OF_BUSINESS,
});

export const addNewLocalCommentary = () => ({
  type: ADD_NEW_LOCAL_COMMENTARY,
});

export const saveNewCommentary = () => ({
  type: SAVE_COMMENTARY,
});

export const cancelSaveNewCommentary = () => ({
  type: CANCEL_SAVE_COMMENTARY,
});

export const commentaryUploadSuccess = () => ({
  type: COMMENTARY_UPLOAD_SUCCESS,
});

export const makeCommentaryRowEditable = (commentary: CommentaryDataType) => ({
  type: MAKE_COMMENTARY_ROW_EDITABLE,
  commentary,
});

export const requestCommentaryUpdate = () => ({
  type: REQUEST_COMMENTARY_UPDATE,
});

export const successCommentaryUpdate = () => ({
  type: SUCCESS_COMMENTARY_UPDATE,
});

export const failedCommentaryUpdate = () => ({
  type: FAILED_COMMENTARY_UPDATE,
});

export const cancelCommentaryUpdate = () => ({
  type: CANCEL_COMMENTARY_UPDATE,
});

export const requestCommentaryAdd = () => ({
  type: REQUEST_COMMENTARY_ADD,
});

export const successCommentaryAdd = () => ({
  type: SUCCESS_COMMENTARY_ADD,
});

export const failedCommentaryAdd = () => ({
  type: FAILED_COMMENTARY_ADD,
});

export const cancelCommentaryAdd = () => ({
  type: CANCEL_COMMENTARY_ADD,
});

export const togglePreview = (
  showPreview: boolean,
  commentaryPreviewList: ListType[] | []
) => ({
  type: SHOW_PREVIEW,
  showPreview,
  commentaryPreviewList,
});

export const setCommentarySelects = (
  classOfBusiness: ListType | null | undefined = undefined,
  subSection1: ListType | null | undefined = undefined,
  subSection2: ListType | null | undefined = undefined,
  dashBoard: ListType | null | undefined = undefined,
  year: string | number | undefined = undefined,
  month: string | number | undefined = undefined,
  report: ListType | null | undefined = undefined
) => ({
  type: SET_COMMENTARY_SELECTS,
  classOfBusiness,
  subSection1,
  subSection2,
  dashBoard,
  year,
  month,
  report,
});

export const setCommentarySelectsError = (
  cobError: string | undefined = undefined,
  subSection1Error: string | undefined = undefined,
  subSection2Error: string | undefined = undefined,
  dashBoardError: string | undefined = undefined,
  yearError: string | number | undefined = undefined,
  monthError: string | number | undefined = undefined,
  reportError: string | number | undefined = undefined
) => ({
  type: SET_COMMENTARY_SELECTS_ERROR,
  cobError,
  subSection1Error,
  subSection2Error,
  dashBoardError,
  yearError,
  monthError,
  reportError,
});

export const setCsvTemplate = (csvTemplate: any[]) => ({
  type: SET_CSV_TEMPLATE,
  csvTemplate,
});

export const sortHistoryTable = (fieldName: string, sorted: boolean) => ({
  type: SORT_HISTORY_TABLE,
  fieldName,
  sorted,
});

export const successGetCommentaryHistory = (history: HistoryDataType[]) => ({
  type: SUCCESS_GET_COMMENTARY_HISTORY,
  history,
});
