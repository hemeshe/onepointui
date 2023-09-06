import {
  DataIngestionState,
  REQUEST_GET_CLASS_OF_BUSINESS,
  DataIngestionTypes,
  ADD_NEW_LOCAL_DATA_INGESTION,
  UPDATE_LOCAL_DATA_INGESTION_ROW,
  SAVE_DATA_INGESTION,
  DATA_INGESTION_UPLOAD_SUCCESS,
  MAKE_ROW_EDITABLE,
  SUCCESS_DATA_INGESTION_UPDATE,
  SUCCESS_GET_CLASS_OF_BUSINESS,
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

import { sortByKey } from '../../helpers/sortByKey';

import { IngestionFileDataType } from '../../types/data-ingestion';

const initialState: DataIngestionState = {
  classOfBusiness: null,
  ingestionFileData: null,
  searchedIngestionFileData: null,
  historyData: null,
  newIngestion: [],
  dataIngestionDetails: null,
  dataIngestionFileList: null,
  dataIngestionFileInstructions: null,
  selectedCof: '',
  selectedCofId: '',
  selectedDif: '',
  selectedDifId: '',
  selectedYear: '',
  selectedMonth: '',
  selectedQuarter: '',
  csvTemplate: [],
  csvUploadErrorField: '',
  csvUploadErrors: {},
  companyCodeSel: [],
};

export const dataIngestionReducer = (
  state = initialState,
  action: DataIngestionTypes
): DataIngestionState => {
  let newIngData, sorted, fname;
  switch (action.type) {
    case REQUEST_GET_CLASS_OF_BUSINESS:
      return {
        ...state,
        classOfBusiness: [{ id: '0', name: 'Loading...' }],
        csvUploadErrorField: '',
        searchedIngestionFileData: null,
        sortByField: '',
        newIngestion: [],
      };

    case SUCCESS_GET_CLASS_OF_BUSINESS:
      return {
        ...state,
        classOfBusiness: [
          { id: '0', name: 'Select an item from list' },
          ...action.cob,
        ],
        sortByField: '',
      };

    case ADD_NEW_LOCAL_DATA_INGESTION:
      let newLocalIngestion: IngestionFileDataType = {
        id: action.id,
        cob: '',
        businessUnit: '',
        category: '',
        subCategory: '',
        deskNm: '',
        entityNm: '',
      };
      return {
        ...state,
        newIngestion: [...state.newIngestion, newLocalIngestion],
      };

    case REMOVE_NEW_LOCAL_INGESTION:
      let filteredNewIngestion = state.newIngestion.filter(
        (m) => m.id !== action.id
      );
      return {
        ...state,
        newIngestion: filteredNewIngestion,
      };

    case UPDATE_LOCAL_DATA_INGESTION_ROW:
      let objn = action.fieldName,
        objv = action.fieldValue;
      let updated = state.newIngestion.map((d) => {
        if (d.id === action.id) {
          return {
            ...d,
            [objn]: objv,
          };
        }
        return d;
      });
      return {
        ...state,
        newIngestion: updated,
      };

    case SAVE_DATA_INGESTION:
      return {
        ...state,
        csvUploadErrorField: '',
      };

    case DATA_INGESTION_UPLOAD_SUCCESS:
      return {
        ...state,
        csvUploadErrorField: '',
      };

    case MAKE_ROW_EDITABLE:
      newIngData = state.ingestionFileData
        ? state.ingestionFileData.map((m) => {
            if (m.id === action.ingestion.id) {
              m.IsEditable = action.ingestion.IsEditable;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        ingestionFileData: newIngData,
      };

    case MAKE_SEARCHED_ROW_EDITABLE:
      newIngData = state.searchedIngestionFileData
        ? state.searchedIngestionFileData.map((m) => {
            if (m.id === action.ingestion.id) {
              m.IsEditable = action.ingestion.IsEditable;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        searchedIngestionFileData: newIngData,
      };

    case SUCCESS_DATA_INGESTION_UPDATE:
      newIngData = state.ingestionFileData
        ? state.ingestionFileData.map((m) => {
            m.IsEditable = false;
            return m;
          })
        : [];
      return {
        ...state,
        ingestionFileData: newIngData,
      };

    case REQUEST_DATA_INGESTION_DETAILS:
      return {
        ...state,
        dataIngestionDetails: null,
        dataIngestionFileList: [{ id: '0', name: 'Loading...' }],
      };

    case SUCCESS_DATA_INGESTION_DETAILS:
      const difl = action.ingestionDetails
        ? action.ingestionDetails.map((d) => {
            return {
              id: d.fileId.toString(),
              name: d.fileName,
            };
          })
        : [];
      return {
        ...state,
        dataIngestionDetails: action.ingestionDetails,
        dataIngestionFileList: [
          { id: '0', name: 'Select an item from list' },
          ...difl,
        ],
      };

    case SUCCESS_GET_DATA_INGESTION_DATA:
      return {
        ...state,
        ingestionFileData: action.ingestionData,
        sortByField: '',
      };

    case SET_SEARCH_INGESTION_DATA:
      return {
        ...state,
        searchedIngestionFileData: action.ingestionData,
        sortByField: '',
      };

    case HANDLE_INGESTION_DATA_CHANGE:
      newIngData = state.ingestionFileData
        ? state.ingestionFileData.map((m: any) => {
            if (m.id === action.id) {
              m[action.fieldName] = action.fieldValue;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        ingestionFileData: newIngData ?? [],
      };

    case HANDLE_SEARCHED_INGESTION_DATA_CHANGE:
      newIngData = state.searchedIngestionFileData
        ? state.searchedIngestionFileData.map((m: any) => {
            if (m.id === action.id) {
              m[action.fieldName] = action.fieldValue;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        searchedIngestionFileData: newIngData ?? [],
      };

    case SORT_BY_FIELD_NAME:
      sorted = state.ingestionFileData;
      fname = action.fieldName;
      if (state.ingestionFileData) {
        sorted = sortByKey(state.ingestionFileData, fname, action.sorted);
      }
      return {
        ...state,
        ingestionFileData: sorted,
        sortByField: fname,
      };

    case SORT_BY_SEARCHED_FIELD_NAME:
      sorted = state.searchedIngestionFileData;
      fname = action.fieldName;
      if (state.searchedIngestionFileData) {
        sorted = sortByKey(
          state.searchedIngestionFileData,
          fname,
          action.sorted
        );
      }
      return {
        ...state,
        searchedIngestionFileData: sorted,
        sortByField: fname,
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

    case SET_DATA_INGESTION_QUERY_PARAMS:
      return {
        ...state,
        selectedCof: action.selectedCof,
        selectedCofId: action.selectedCofId,
        selectedDif: action.selectedDif,
        selectedDifId: action.selectedDifId,
        selectedYear: action.selectedYear,
        selectedQuarter: action.selectedQuarter,
        selectedMonth: action.selectedMonth,
      };

    case REQUEST_GET_DATA_INGESTION_INSTRUCTIONS:
      return {
        ...state,
        dataIngestionFileInstructions: null,
      };

    case SUCCESS_GET_DATA_INGESTION_INSTRUCTIONS:
      return {
        ...state,
        dataIngestionFileInstructions: action.dataIngestionFileInstructions,
      };

    case FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD:
      return {
        ...state,
        csvUploadErrorField: action.errorFieldName,
        csvUploadErrors: action.errors,
      };

    case SET_CSV_TEMPLATE:
      return {
        ...state,
        csvTemplate: action.csvTemplate,
      };

    case SUCCESS_GET_INGESTION_HISTORY:
      return {
        ...state,
        historyData: action.history,
        sortByField: '',
      };

    case SUCCESS_SAVE_INGESTION_CONFIG:
      return {
        ...state,
        newIngestion: [],
        sortByField: '',
      };

    case UPDATE_COMPANY_CODE_SELECTION:
      return {
        ...state,
        companyCodeSel: action.fieldValue,
      };

    default:
      return state;
  }
};
