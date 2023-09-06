import { StringLiteral } from 'typescript';
import {
  IngestionFileDataType,
  HistoryDataType,
  DataIngestionFileListSuccessResponse,
  DataIngestionFileInstructionsSuccessResponse,
  newIngestionType,
} from '../../types/data-ingestion';
export interface SelectOptionType {
  id: string;
  name: string;
}

export interface DataIngestionState {
  classOfBusiness: SelectOptionType[] | null;
  ingestionFileData: IngestionFileDataType[] | null;
  searchedIngestionFileData?: IngestionFileDataType[] | null;
  historyData: HistoryDataType[] | null;
  newIngestion: newIngestionType[];
  dataIngestionDetails: DataIngestionFileListSuccessResponse[] | null;
  dataIngestionFileList: SelectOptionType[] | null;
  dataIngestionFileInstructions:
    | DataIngestionFileInstructionsSuccessResponse[]
    | null;
  selectedCof: string;
  selectedCofId: string;
  selectedDif: string;
  selectedDifId: string;
  selectedYear: string;
  selectedMonth: string;
  selectedQuarter: string;
  csvTemplate: any[];
  csvUploadErrorField: string;
  csvUploadErrors: object;
  sortByField?: string | keyof IngestionFileDataType;
  companyCodeSel: any[];
}

export const REQUEST_GET_CLASS_OF_BUSINESS = 'REQUEST_GET_CLASS_OF_BUSINESS';

export const SUCCESS_GET_CLASS_OF_BUSINESS = 'SUCCESS_GET_CLASS_OF_BUSINESS';

export const FAILED_GET_CLASS_OF_BUSINESS = 'FAILED_GET_CLASS_OF_BUSINESS';

export const ADD_NEW_LOCAL_DATA_INGESTION = 'ADD_NEW_LOCAL_DATA_INGESTION';

export const UPDATE_LOCAL_DATA_INGESTION_ROW =
  'UPDATE_LOCAL_DATA_INGESTION_ROW';

export const SAVE_DATA_INGESTION = 'SAVE_DATA_INGESTION';

export const SUCCESS_SAVE_INGESTION_CONFIG = 'SUCCESS_SAVE_INGESTION_CONFIG';

export const FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD =
  'FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD';

export const DATA_INGESTION_UPLOAD_SUCCESS = 'DATA_INGESTION_UPLOAD_SUCCESS';

export const MAKE_ROW_EDITABLE = 'MAKE_ROW_EDITABLE';

export const MAKE_SEARCHED_ROW_EDITABLE = 'MAKE_SEARCHED_ROW_EDITABLE';

export const SUCCESS_DATA_INGESTION_UPDATE = 'SUCCESS_DATA_INGESTION_UPDATE';

export const REQUEST_DATA_INGESTION_DETAILS = 'REQUEST_DATA_INGESTION_DETAILS';

export const SUCCESS_DATA_INGESTION_DETAILS = 'SUCCESS_DATA_INGESTION_DETAILS';

export const SUCCESS_GET_DATA_INGESTION_DATA = 'SUCCESS_DATA_INGESTION_DATA';

export const HANDLE_INGESTION_DATA_CHANGE = 'HANDLE_INGESTION_DATA_CHANGE';

export const HANDLE_SEARCHED_INGESTION_DATA_CHANGE =
  'HANDLE_SEARCHED_INGESTION_DATA_CHANGE';

export const SORT_BY_FIELD_NAME = 'SORT_BY_FIELD_NAME';

export const SORT_BY_SEARCHED_FIELD_NAME = 'SORT_BY_SEARCHED_FIELD_NAME';

export const SET_DATA_INGESTION_QUERY_PARAMS =
  'SET_DATA_INGESTION_QUERY_PARAMS';

export const REQUEST_GET_DATA_INGESTION_INSTRUCTIONS =
  'REQUEST_GET_DATA_INGESTION_INSTRUCTIONS';

export const SUCCESS_GET_DATA_INGESTION_INSTRUCTIONS =
  'SUCCESS_GET_DATA_INGESTION_INSTRUCTIONS';

export const SORT_HISTORY_TABLE = 'SORT_HISTORY_TABLE';

export const SET_CSV_TEMPLATE = 'SET_CSV_TEMPLATE';

export const SUCCESS_GET_INGESTION_HISTORY = 'SUCCESS_GET_INGESTION_HISTORY';

export const REMOVE_NEW_LOCAL_INGESTION = 'REMOVE_NEW_LOCAL_INGESTION';

export const SET_SEARCH_INGESTION_DATA = 'SET_SEARCH_INGESTION_DATA';

export const UPDATE_COMPANY_CODE_SELECTION = 'UPDATE_COMPANY_CODE_SELECTION';

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

interface addNewLocalDataIngestion {
  type: typeof ADD_NEW_LOCAL_DATA_INGESTION;
  id: string;
}

interface updateLocalDataIngestionRow {
  type: typeof UPDATE_LOCAL_DATA_INGESTION_ROW;
  fieldName: keyof IngestionFileDataType;
  fieldValue: string | Date | [Date, Date] | null;
  id: string | number;
}

interface SaveDataIngestion {
  type: typeof SAVE_DATA_INGESTION;
}

interface successSaveIngestionConfig {
  type: typeof SUCCESS_SAVE_INGESTION_CONFIG;
  message: string;
}

interface DataIngestionUploadSuccess {
  type: typeof DATA_INGESTION_UPLOAD_SUCCESS;
}

interface MakeRowEditable {
  type: typeof MAKE_ROW_EDITABLE;
  ingestion: IngestionFileDataType;
}

interface MakeSearchedRowEditable {
  type: typeof MAKE_SEARCHED_ROW_EDITABLE;
  ingestion: IngestionFileDataType;
}

interface successDataIngestionUpdate {
  type: typeof SUCCESS_DATA_INGESTION_UPDATE;
  message: string;
}

interface requestDataIngestionDetails {
  type: typeof REQUEST_DATA_INGESTION_DETAILS;
}

interface successDataIngestionDetails {
  type: typeof SUCCESS_DATA_INGESTION_DETAILS;
  ingestionDetails: DataIngestionFileListSuccessResponse[];
}

interface successGetDataIngestionData {
  type: typeof SUCCESS_GET_DATA_INGESTION_DATA;
  ingestionData: IngestionFileDataType[];
}

interface handleIngestionDataChange {
  type: typeof HANDLE_INGESTION_DATA_CHANGE;
  id: string | number;
  fieldName: any;
  fieldValue: string | Date | [Date, Date] | null;
}

interface handleSearchedIngestionDataChange {
  type: typeof HANDLE_SEARCHED_INGESTION_DATA_CHANGE;
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

interface setDataIngestionQueryParams {
  type: typeof SET_DATA_INGESTION_QUERY_PARAMS;
  selectedCof: string;
  selectedCofId: string;
  selectedDif: string;
  selectedDifId: string;
  selectedYear: string;
  selectedMonth: string;
  selectedQuarter: string;
}

interface requestGetDataIngestionInstructions {
  type: typeof REQUEST_GET_DATA_INGESTION_INSTRUCTIONS;
}

interface successGetDataIngestionInstructions {
  type: typeof SUCCESS_GET_DATA_INGESTION_INSTRUCTIONS;
  dataIngestionFileInstructions: DataIngestionFileInstructionsSuccessResponse[];
}

interface failedWithCsvErrorsCsvIngestionUpload {
  type: typeof FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD;
  errors: object;
  errorFieldName: string;
  errorMessage: string;
}

interface setCsvTemplate {
  type: typeof SET_CSV_TEMPLATE;
  csvTemplate: any[];
}

interface successGetIngestionHistory {
  type: typeof SUCCESS_GET_INGESTION_HISTORY;
  history: HistoryDataType[];
}

interface removeNewLocalIngestion {
  type: typeof REMOVE_NEW_LOCAL_INGESTION;
  id: string;
}

interface setSearchIngestionData {
  type: typeof SET_SEARCH_INGESTION_DATA;
  ingestionData: IngestionFileDataType[];
}

interface updateCompanyCodeSelection {
  type: typeof UPDATE_COMPANY_CODE_SELECTION;
  fieldValue: number[];
}

export type DataIngestionTypes =
  | RequestGetClassOfBusinessAction
  | SuccessGetClassOfBusinessAction
  | FailedGetClassOfBusinessAction
  | addNewLocalDataIngestion
  | updateLocalDataIngestionRow
  | SaveDataIngestion
  | DataIngestionUploadSuccess
  | MakeRowEditable
  | successDataIngestionUpdate
  | requestDataIngestionDetails
  | successDataIngestionDetails
  | successGetDataIngestionData
  | handleIngestionDataChange
  | sortByFieldName
  | setDataIngestionQueryParams
  | requestGetDataIngestionInstructions
  | successGetDataIngestionInstructions
  | failedWithCsvErrorsCsvIngestionUpload
  | sortHistoryTable
  | setCsvTemplate
  | successGetIngestionHistory
  | successSaveIngestionConfig
  | removeNewLocalIngestion
  | MakeSearchedRowEditable
  | sortBySearchedFieldName
  | handleSearchedIngestionDataChange
  | setSearchIngestionData
  | updateCompanyCodeSelection;
