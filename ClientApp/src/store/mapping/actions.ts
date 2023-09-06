import {
  REQUEST_GET_CLASS_OF_BUSINESS,
  SUCCESS_GET_CLASS_OF_BUSINESS,
  FAILED_GET_CLASS_OF_BUSINESS,
  ADD_NEW_LOCAL_MAPPING,
  REMOVE_NEW_LOCAL_MAPPING,
  UPDATE_LOCAL_MAPPING_ROW,
  MAKE_ROW_EDITABLE,
  MAKE_SEARCHED_ROW_EDITABLE,
  SUCCESS_MAPPING_UPDATE,
  SelectOptionType,
  REQUEST_MAPPING_DETAILS,
  SUCCESS_MAPPING_DETAILS,
  FAILED_MAPPING_DETAILS,
  REQUEST_GET_MAPPING_DATA,
  SUCCESS_GET_MAPPING_DATA,
  HANDLE_MAPPING_DATA_CHANGE,
  HANDLE_SEARCHED_MAPPING_DATA_CHANGE,
  SORT_BY_FIELD_NAME,
  SORT_BY_SEARCHED_FIELD_NAME,
  SET_MAPPING_QUERY_PARAMS,
  REQUEST_GET_MAPPING_INSTRUCTIONS,
  SUCCESS_GET_MAPPING_INSTRUCTIONS,
  FAILED_GET_MAPPING_INSTRUCTIONS,
  SORT_HISTORY_TABLE,
  SET_CSV_TEMPLATE,
  SUCCESS_GET_MAPPING_HISTORY,
  SUCCESS_ADD_MAPPING,
  SUCCESS_GET_DASHBOARD_DATA,
  SET_SEARCH_MAPPING_DATA,
  FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD,
} from "./types";

import {
  MappingFileDataType,
  HistoryDataType,
  MappingFileListSuccessResponse,
} from "../../types/mapping";

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

export const addNewLocalMapping = (id: string) => ({
  type: ADD_NEW_LOCAL_MAPPING,
  id,
});

export const removeNewLocalMapping = (id: string) => ({
  type: REMOVE_NEW_LOCAL_MAPPING,
  id,
});

export const updateLocalMappingRow = (
  fieldValue: string | Date | [Date, Date] | null,
  fieldName: any,
  id: string | number
) => ({
  type: UPDATE_LOCAL_MAPPING_ROW,
  fieldName,
  fieldValue,
  id,
});

export const successAddMapping = (message: string) => ({
  type: SUCCESS_ADD_MAPPING,
  message,
});

export const makeRowEditable = (ingestion: MappingFileDataType[]) => ({
  type: MAKE_ROW_EDITABLE,
  ingestion,
});

export const makeSearchedRowEditable = (ingestion: MappingFileDataType[]) => ({
  type: MAKE_SEARCHED_ROW_EDITABLE,
  ingestion,
});

export const successMappingUpdate = (message: string) => ({
  type: SUCCESS_MAPPING_UPDATE,
  message,
});

export const requestMappingDetails = () => ({
  type: REQUEST_MAPPING_DETAILS,
});

export const successMappingDetails = (
  mappingDetails: MappingFileListSuccessResponse
) => ({
  type: SUCCESS_MAPPING_DETAILS,
  mappingDetails,
});

export const failedMappingDetails = () => ({
  type: FAILED_MAPPING_DETAILS,
});

export const requestGetMappingData = () => ({
  type: REQUEST_GET_MAPPING_DATA,
});

export const successGetMappingData = (
  ingestionData: MappingFileDataType[]
) => ({
  type: SUCCESS_GET_MAPPING_DATA,
  ingestionData,
});

export const handleMappingDataChange = (
  id: number | string,
  fieldName: string,
  fieldValue: string | Date | [Date, Date] | null
) => ({
  type: HANDLE_MAPPING_DATA_CHANGE,
  id,
  fieldName,
  fieldValue,
});

export const handleSearchedMappingDataChange = (
  id: number | string,
  fieldName: string,
  fieldValue: string | Date | [Date, Date] | null
) => ({
  type: HANDLE_SEARCHED_MAPPING_DATA_CHANGE,
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

export const setMappingQueryParams = (
  selectedCof: string,
  selectedCofId: string,
  selectedMt: string,
  selectedMtId: string
) => ({
  type: SET_MAPPING_QUERY_PARAMS,
  selectedCof,
  selectedCofId,
  selectedMt,
  selectedMtId,
});

export const requestGetMappingInstructions = () => ({
  type: REQUEST_GET_MAPPING_INSTRUCTIONS,
});

export const successGetMappingInstructions = (
  dataMappingFileInstructions: MappingFileListSuccessResponse
) => ({
  type: SUCCESS_GET_MAPPING_INSTRUCTIONS,
  dataMappingFileInstructions,
});

export const failedGetMappingInstructions = () => ({
  type: FAILED_GET_MAPPING_INSTRUCTIONS,
});

export const setCsvTemplate = (csvTemplate: any[]) => ({
  type: SET_CSV_TEMPLATE,
  csvTemplate,
});

export const successGetMappingHistory = (history: HistoryDataType[]) => ({
  type: SUCCESS_GET_MAPPING_HISTORY,
  history,
});

export const successGetDashboardData = (
  description: string,
  usage: string,
  dashBoardData: any[]
) => ({
  type: SUCCESS_GET_DASHBOARD_DATA,
  description,
  usage,
  dashBoardData,
});

export const setSearchMappingData = (
  ingestionData: MappingFileDataType[] | null
) => ({
  type: SET_SEARCH_MAPPING_DATA,
  ingestionData,
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
