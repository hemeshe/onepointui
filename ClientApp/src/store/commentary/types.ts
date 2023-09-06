import { CommentaryDataType, HistoryDataType } from "../../types/commentary";
export interface ClassOfBusiness {
  name: string;
}

export interface ListType {
  id: string | number;
  name: string;
}

export interface StateType {
  isLoading: boolean;
  success: boolean;
  error: boolean;
  message: string;
  classOfBusiness: ListType | null;
  subSection1?: ListType | null;
  subSection2?: ListType | null;
  dashBoard?: ListType | null;
  year?: string | number;
  month?: string | number;
  report?: ListType | null;
  commentaryData: CommentaryDataType[];
  newCommentaryData: CommentaryDataType[];
  fileUploadSuccess: boolean;
  historyData?: HistoryDataType[];
  commentaryPreviewList?: ListType[];
  showPreview?: boolean;
  cobError?: string;
  subSection1Error?: string;
  subSection2Error?: string;
  dashBoardError?: string;
  yearError?: string;
  monthError?: string;
  reportError?: string;
  csvTemplate?: any[];
  sortByField?: string;
}

export const GET_CLASS_OF_BUSINESS = "GET_CLASS_OF_BUSINESS";

export const ADD_NEW_LOCAL_COMMENTARY = "ADD_NEW_LOCAL_COMMENTARY";

export const SAVE_COMMENTARY = "SAVE_COMMENTARY";

export const CANCEL_SAVE_COMMENTARY = "CANCEL_SAVE_COMMENTARY";

export const COMMENTARY_UPLOAD_SUCCESS = "COMMENTARY_UPLOAD_SUCCESS";

export const MAKE_COMMENTARY_ROW_EDITABLE = "MAKE_COMMENTARY_ROW_EDITABLE";

export const REQUEST_COMMENTARY_UPDATE = "REQUEST_COMMENTARY_UPDATE";

export const SUCCESS_COMMENTARY_UPDATE = "SUCCESS_COMMENTARY_UPDATE";

export const FAILED_COMMENTARY_UPDATE = "FAILED_COMMENTARY_UPDATE";

export const CANCEL_COMMENTARY_UPDATE = "CANCEL_COMMENTARY_UPDATE";

export const REQUEST_COMMENTARY_ADD = "REQUEST_COMMENTARY_ADD";

export const SUCCESS_COMMENTARY_ADD = "SUCCESS_COMMENTARY_ADD";

export const FAILED_COMMENTARY_ADD = "FAILED_COMMENTARY_ADD";

export const CANCEL_COMMENTARY_ADD = "CANCEL_COMMENTARY_ADD";

export const SHOW_PREVIEW = "SHOW_PREVIEW";

export const SET_COMMENTARY_SELECTS = "SET_COMMENTARY_SELECTS";

export const SET_COMMENTARY_SELECTS_ERROR = "SET_COMMENTARY_SELECTS_ERROR";

export const SET_CSV_TEMPLATE = "SET_CSV_TEMPLATE";

export const SORT_HISTORY_TABLE = "SORT_HISTORY_TABLE";

export const SUCCESS_GET_COMMENTARY_HISTORY = "SUCCESS_GET_MAPPING_HISTORY";

interface GetClassOfBusinessAction {
  type: typeof GET_CLASS_OF_BUSINESS;
}

interface AssNewLocalMappingAction {
  type: typeof ADD_NEW_LOCAL_COMMENTARY;
}

interface SaveMapping {
  type: typeof SAVE_COMMENTARY;
}

interface CancelSaveMapping {
  type: typeof CANCEL_SAVE_COMMENTARY;
}

interface MappingUploadSuccess {
  type: typeof COMMENTARY_UPLOAD_SUCCESS;
}

interface MakeMappingRowEditable {
  type: typeof MAKE_COMMENTARY_ROW_EDITABLE;
  commentary: CommentaryDataType;
}

interface successMappingUpdate {
  type: typeof SUCCESS_COMMENTARY_UPDATE;
}

interface failedMappingUpdate {
  type: typeof FAILED_COMMENTARY_UPDATE;
}

interface requestMappingUpdate {
  type: typeof REQUEST_COMMENTARY_UPDATE;
}

interface cancelMappingUpdate {
  type: typeof CANCEL_COMMENTARY_UPDATE;
}

interface successMappingAdd {
  type: typeof SUCCESS_COMMENTARY_ADD;
}

interface failedMappingAdd {
  type: typeof FAILED_COMMENTARY_ADD;
}

interface requestMappingAdd {
  type: typeof REQUEST_COMMENTARY_ADD;
}

interface cancelMappingAdd {
  type: typeof CANCEL_COMMENTARY_ADD;
}

interface togglePreviewType {
  type: typeof SHOW_PREVIEW;
  showPreview: boolean;
  commentaryPreviewList: ListType[];
}

interface setCommentarySelects {
  type: typeof SET_COMMENTARY_SELECTS;
  classOfBusiness: ListType;
  subSection1?: ListType;
  subSection2?: ListType;
  dashBoard?: ListType;
  year?: string | number;
  month?: string | number;
  report?: ListType;
}

interface setCommentarySelectsError {
  type: typeof SET_COMMENTARY_SELECTS_ERROR;
  cobError?: string;
  subSection1Error?: string;
  subSection2Error?: string;
  dashBoardError?: string;
  yearError?: string;
  monthError?: string;
  reportError?: string;
}

interface setCsvTemplate {
  type: typeof SET_CSV_TEMPLATE;
  csvTemplate: any[];
}

interface sortHistoryTable {
  type: typeof SORT_HISTORY_TABLE;
  fieldName: string;
  sorted: boolean;
}

interface successGetCommentaryHistory {
  type: typeof SUCCESS_GET_COMMENTARY_HISTORY;
  history: HistoryDataType[];
}

export type MappingTypes =
  | GetClassOfBusinessAction
  | AssNewLocalMappingAction
  | SaveMapping
  | CancelSaveMapping
  | MappingUploadSuccess
  | MakeMappingRowEditable
  | requestMappingUpdate
  | successMappingUpdate
  | failedMappingUpdate
  | cancelMappingUpdate
  | successMappingAdd
  | failedMappingAdd
  | cancelMappingAdd
  | requestMappingAdd
  | togglePreviewType
  | setCommentarySelects
  | setCommentarySelectsError
  | setCsvTemplate
  | sortHistoryTable
  | successGetCommentaryHistory;
