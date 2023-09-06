import {
  MappingFileDataType,
  HistoryDataType,
  MappingFileListSuccessResponse,
  MappingFileInstructionsSuccessResponse,
  newMappingType,
} from "../../types/mapping";
export interface SelectOptionType {
  id: string;
  name: string;
}

export interface MappingState {
  classOfBusiness: SelectOptionType[] | null;
  mappingData: MappingFileDataType[] | null;
  searchedMappingData?: MappingFileDataType[] | null;
  historyData: HistoryDataType[] | null;
  newMapping: newMappingType[];
  fileUploadSuccess: boolean;
  dataMappingDetails: MappingFileListSuccessResponse[] | null;
  dataMappingFileList: SelectOptionType[] | null;
  dataMappingFileInstructions: MappingFileInstructionsSuccessResponse[] | null;
  selectedCof: string;
  selectedCofId: string;
  selectedMt: string;
  selectedMtId: string;
  selectedYear: string;
  selectedMonth: string;
  csvTemplate: any[];
  dashBoard?: {
    description: string;
    usage: string;
    dashBoardData: any[];
  };
  sortByField?: string | keyof MappingFileDataType;
  csvUploadErrorField: string;
  csvUploadErrors: object;
}

export const REQUEST_GET_CLASS_OF_BUSINESS = "REQUEST_GET_CLASS_OF_BUSINESS";

export const SUCCESS_GET_CLASS_OF_BUSINESS = "SUCCESS_GET_CLASS_OF_BUSINESS";

export const FAILED_GET_CLASS_OF_BUSINESS = "FAILED_GET_CLASS_OF_BUSINESS";

export const ADD_NEW_LOCAL_MAPPING = "ADD_NEW_LOCAL_MAPPING";

export const REMOVE_NEW_LOCAL_MAPPING = "REMOVE_NEW_LOCAL_MAPPING";

export const UPDATE_LOCAL_MAPPING_ROW = "UPDATE_LOCAL_MAPPING_ROW";

export const SUCCESS_ADD_MAPPING = "SUCCESS_ADD_MAPPING";

export const MAKE_ROW_EDITABLE = "MAKE_ROW_EDITABLE";

export const MAKE_SEARCHED_ROW_EDITABLE = "MAKE_SEARCHED_ROW_EDITABLE";

export const SUCCESS_MAPPING_UPDATE = "SUCCESS_MAPPING_UPDATE";

export const REQUEST_MAPPING_DETAILS = "REQUEST_MAPPING_DETAILS";

export const SUCCESS_MAPPING_DETAILS = "SUCCESS_MAPPING_DETAILS";

export const FAILED_MAPPING_DETAILS = "FAILED_MAPPING_DETAILS";

export const REQUEST_GET_MAPPING_DATA = "REQUEST_MAPPING_DATA";

export const SUCCESS_GET_MAPPING_DATA = "SUCCESS_MAPPING_DATA";

export const HANDLE_MAPPING_DATA_CHANGE = "HANDLE_MAPPING_DATA_CHANGE";

export const HANDLE_SEARCHED_MAPPING_DATA_CHANGE =
  "HANDLE_SEARCHED_MAPPING_DATA_CHANGE";

export const SORT_BY_FIELD_NAME = "SORT_BY_FIELD_NAME";

export const SORT_BY_SEARCHED_FIELD_NAME = "SORT_BY_SEARCHED_FIELD_NAME";

export const SET_MAPPING_QUERY_PARAMS = "SET_MAPPING_QUERY_PARAMS";

export const REQUEST_GET_MAPPING_INSTRUCTIONS =
  "REQUEST_GET_MAPPING_INSTRUCTIONS";

export const SUCCESS_GET_MAPPING_INSTRUCTIONS =
  "SUCCESS_GET_MAPPING_INSTRUCTIONS";

export const FAILED_GET_MAPPING_INSTRUCTIONS =
  "FAILED_GET_MAPPING_INSTRUCTIONS";

export const SORT_HISTORY_TABLE = "SORT_HISTORY_TABLE";

export const SET_CSV_TEMPLATE = "SET_CSV_TEMPLATE";

export const SUCCESS_GET_MAPPING_HISTORY = "SUCCESS_GET_MAPPING_HISTORY";

export const SUCCESS_GET_DASHBOARD_DATA = "SUCCESS_GET_DASHBOARD_DATA";

export const SET_SEARCH_MAPPING_DATA = "SET_SEARCH_MAPPING_DATA";

export const FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD =
  "FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD";

interface RequestGetClassOfBusinessAction {
  type: typeof REQUEST_GET_CLASS_OF_BUSINESS;
}

interface SuccessGetClassOfBusinessAction {
  type: typeof SUCCESS_GET_CLASS_OF_BUSINESS;
  cob: SelectOptionType[];
}

interface FailedGetClassOfBusinessAction {
  type: typeof FAILED_GET_CLASS_OF_BUSINESS;
}

interface addNewLocalMapping {
  type: typeof ADD_NEW_LOCAL_MAPPING;
  id: string;
}

interface removeNewLocalMapping {
  type: typeof REMOVE_NEW_LOCAL_MAPPING;
  id: string;
}

interface updateLocalMappingRow {
  type: typeof UPDATE_LOCAL_MAPPING_ROW;
  fieldName: any;
  fieldValue: string;
  id: string;
}

interface successAddMapping {
  type: typeof SUCCESS_ADD_MAPPING;
  message: string;
}

interface MakeRowEditable {
  type: typeof MAKE_ROW_EDITABLE;
  ingestion: MappingFileDataType[];
}

interface MakeSearchedRowEditable {
  type: typeof MAKE_SEARCHED_ROW_EDITABLE;
  ingestion: MappingFileDataType[];
}

interface successMappingUpdate {
  type: typeof SUCCESS_MAPPING_UPDATE;
  message: string;
}

interface requestMappingDetails {
  type: typeof REQUEST_MAPPING_DETAILS;
}

interface successMappingDetails {
  type: typeof SUCCESS_MAPPING_DETAILS;
  mappingDetails: MappingFileListSuccessResponse[];
}

interface failedMappingDetails {
  type: typeof FAILED_MAPPING_DETAILS;
}

interface requestGetMappingData {
  type: typeof REQUEST_GET_MAPPING_DATA;
}

interface successGetMappingData {
  type: typeof SUCCESS_GET_MAPPING_DATA;
  ingestionData: MappingFileDataType[];
}

interface handleMappingDataChange {
  type: typeof HANDLE_MAPPING_DATA_CHANGE;
  id: string | number;
  fieldName: any;
  fieldValue: string | Date | [Date, Date] | null;
}

interface handleSearchedMappingDataChange {
  type: typeof HANDLE_SEARCHED_MAPPING_DATA_CHANGE;
  id: string | number;
  fieldName: any;
  fieldValue: string | Date | [Date, Date] | null;
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

interface sortHistoryTable {
  type: typeof SORT_HISTORY_TABLE;
  fieldName: string;
  sorted: boolean;
}

interface setMappingQueryParams {
  type: typeof SET_MAPPING_QUERY_PARAMS;
  selectedCof: string;
  selectedCofId: string;
  selectedMt: string;
  selectedMtId: string;
}

interface requestGetMappingInstructions {
  type: typeof REQUEST_GET_MAPPING_INSTRUCTIONS;
}

interface successGetMappingInstructions {
  type: typeof SUCCESS_GET_MAPPING_INSTRUCTIONS;
  dataMappingFileInstructions: MappingFileInstructionsSuccessResponse[];
}

interface failedGetMappingInstructions {
  type: typeof FAILED_GET_MAPPING_INSTRUCTIONS;
}

interface setCsvTemplate {
  type: typeof SET_CSV_TEMPLATE;
  csvTemplate: any[];
}

interface successGetMappingHistory {
  type: typeof SUCCESS_GET_MAPPING_HISTORY;
  history: HistoryDataType[];
}

interface successGetDashboardData {
  type: typeof SUCCESS_GET_DASHBOARD_DATA;
  description: string;
  usage: string;
  dashBoardData: any[];
}

interface setSearchMappingData {
  type: typeof SET_SEARCH_MAPPING_DATA;
  ingestionData: MappingFileDataType[] | null;
}

interface failedWithCsvErrorsCsvIngestionUpload {
  type: typeof FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD;
  errors: object;
  errorFieldName: string;
  errorMessage: string;
}

export type MappingTypes =
  | RequestGetClassOfBusinessAction
  | SuccessGetClassOfBusinessAction
  | FailedGetClassOfBusinessAction
  | addNewLocalMapping
  | removeNewLocalMapping
  | updateLocalMappingRow
  | MakeRowEditable
  | successMappingUpdate
  | requestMappingDetails
  | successMappingDetails
  | failedMappingDetails
  | requestGetMappingData
  | successGetMappingData
  | handleMappingDataChange
  | sortByFieldName
  | setMappingQueryParams
  | requestGetMappingInstructions
  | successGetMappingInstructions
  | failedGetMappingInstructions
  | sortHistoryTable
  | setCsvTemplate
  | successGetMappingHistory
  | successAddMapping
  | successGetDashboardData
  | setSearchMappingData
  | MakeSearchedRowEditable
  | handleSearchedMappingDataChange
  | sortBySearchedFieldName
  | failedWithCsvErrorsCsvIngestionUpload;
