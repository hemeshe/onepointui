import {
  REQUEST_GET_CLASS_OF_BUSINESS,
  SUCCESS_GET_CLASS_OF_BUSINESS,
  FAILED_GET_CLASS_OF_BUSINESS,
  ADD_NEW_LOCAL_DATA_INGESTION,
  UPDATE_LOCAL_DATA_INGESTION_ROW,
  SAVE_DATA_INGESTION,
  DATA_INGESTION_UPLOAD_SUCCESS,
  MAKE_ROW_EDITABLE,
  SUCCESS_DATA_INGESTION_UPDATE,
  SelectOptionType,
  REQUEST_DATA_INGESTION_DETAILS,
  SUCCESS_DATA_INGESTION_DETAILS,
  SUCCESS_GET_DATA_INGESTION_DATA,
  HANDLE_INGESTION_DATA_CHANGE,
  SORT_BY_FIELD_NAME,
  SET_DATA_INGESTION_QUERY_PARAMS,
  REQUEST_GET_DATA_INGESTION_INSTRUCTIONS,
  SUCCESS_GET_DATA_INGESTION_INSTRUCTIONS,
  FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD,
  SORT_HISTORY_TABLE,
  SET_CSV_TEMPLATE,
  SUCCESS_GET_INGESTION_HISTORY,
  SUCCESS_SAVE_INGESTION_CONFIG,
  REMOVE_NEW_LOCAL_INGESTION,
  MAKE_SEARCHED_ROW_EDITABLE,
  SORT_BY_SEARCHED_FIELD_NAME,
  SET_SEARCH_INGESTION_DATA,
  HANDLE_SEARCHED_INGESTION_DATA_CHANGE,
  UPDATE_COMPANY_CODE_SELECTION,
} from './types';

import {
  IngestionFileDataType,
  DataIngestionFileListSuccessResponse,
  HistoryDataType,
} from '../../types/data-ingestion';

export const requestGetClassOfBusiness = () => ({
  type: REQUEST_GET_CLASS_OF_BUSINESS,
});

export const successGetClassOfBusiness = (cob: SelectOptionType[]) => ({
  type: SUCCESS_GET_CLASS_OF_BUSINESS,
  cob,
});

export const failedGetClassOfBusiness = () => ({
  type: FAILED_GET_CLASS_OF_BUSINESS,
});

export const addNewLocalDataIngestion = (id: string) => ({
  type: ADD_NEW_LOCAL_DATA_INGESTION,
  id,
});

export const updateLocalDataIngestionRow = (
  fieldValue: string | Date | [Date, Date] | null,
  fieldName: keyof IngestionFileDataType,
  id: string | number
) => ({
  type: UPDATE_LOCAL_DATA_INGESTION_ROW,
  fieldName,
  fieldValue,
  id,
});

export const saveNewIngestion = () => ({
  type: SAVE_DATA_INGESTION,
});

export const successSaveIngestionConfig = (message: string) => ({
  type: SUCCESS_SAVE_INGESTION_CONFIG,
  message,
});

export const dataIngestionUploadSuccess = () => ({
  type: DATA_INGESTION_UPLOAD_SUCCESS,
});

export const makeRowEditable = (ingestion: IngestionFileDataType) => ({
  type: MAKE_ROW_EDITABLE,
  ingestion,
});

export const makeSearchedRowEditable = (ingestion: IngestionFileDataType) => ({
  type: MAKE_SEARCHED_ROW_EDITABLE,
  ingestion,
});

export const successDataIngestionUpdate = (message: string) => ({
  type: SUCCESS_DATA_INGESTION_UPDATE,
  message,
});

export const requestDataIngestionDetails = () => ({
  type: REQUEST_DATA_INGESTION_DETAILS,
});

export const successDataIngestionDetails = (
  ingestionDetails: DataIngestionFileListSuccessResponse
) => ({
  type: SUCCESS_DATA_INGESTION_DETAILS,
  ingestionDetails,
});

export const successGetDataIngestionData = (
  ingestionData: IngestionFileDataType[]
) => ({
  type: SUCCESS_GET_DATA_INGESTION_DATA,
  ingestionData,
});

export const setSearchIngestionData = (
  ingestionData: IngestionFileDataType[] | null
) => ({
  type: SET_SEARCH_INGESTION_DATA,
  ingestionData,
});

export const handleIngestionDataChange = (
  id: number | string,
  fieldName: string,
  fieldValue: string | Date | [Date, Date] | null
) => ({
  type: HANDLE_INGESTION_DATA_CHANGE,
  id,
  fieldName,
  fieldValue,
});

export const handleSearchedIngestionDataChange = (
  id: number | string,
  fieldName: string,
  fieldValue: string | Date | [Date, Date] | null
) => ({
  type: HANDLE_SEARCHED_INGESTION_DATA_CHANGE,
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

export const sortHistoryTable = (fieldName: string, sorted: boolean) => ({
  type: SORT_HISTORY_TABLE,
  fieldName,
  sorted,
});

export const setDataIngestionQueryParams = (
  selectedCof: string,
  selectedCofId: string,
  selectedDif: string,
  selectedDifId: string,
  selectedYear: string,
  selectedQuarter: string,
  selectedMonth: string
) => ({
  type: SET_DATA_INGESTION_QUERY_PARAMS,
  selectedCof,
  selectedCofId,
  selectedDif,
  selectedDifId,
  selectedYear,
  selectedQuarter,
  selectedMonth,
});

export const requestGetDataIngestionInstructions = () => ({
  type: REQUEST_GET_DATA_INGESTION_INSTRUCTIONS,
});

export const successGetDataIngestionInstructions = (
  dataIngestionFileInstructions: DataIngestionFileListSuccessResponse
) => ({
  type: SUCCESS_GET_DATA_INGESTION_INSTRUCTIONS,
  dataIngestionFileInstructions,
});

export const failedWithCsvErrorsCsvIngestionUpload = (
  errors: object,
  errorMessage: string,
  errorFieldName: string
) => ({
  type: FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD,
  errors,
  errorFieldName,
  errorMessage,
});

export const setCsvTemplate = (csvTemplate: any[]) => ({
  type: SET_CSV_TEMPLATE,
  csvTemplate,
});

export const successGetIngestionHistory = (history: HistoryDataType[]) => ({
  type: SUCCESS_GET_INGESTION_HISTORY,
  history,
});

export const removeNewLocalIngestion = (id: string) => ({
  type: REMOVE_NEW_LOCAL_INGESTION,
  id,
});

export const updateCompanyCodeSelection = (fieldValue: number[]) => ({
  type: UPDATE_COMPANY_CODE_SELECTION,
  fieldValue,
});
