import {
  MappingState,
  REQUEST_GET_CLASS_OF_BUSINESS,
  MappingTypes,
  ADD_NEW_LOCAL_MAPPING,
  UPDATE_LOCAL_MAPPING_ROW,
  MAKE_ROW_EDITABLE,
  MAKE_SEARCHED_ROW_EDITABLE,
  SUCCESS_MAPPING_UPDATE,
  SUCCESS_GET_CLASS_OF_BUSINESS,
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
  REMOVE_NEW_LOCAL_MAPPING,
  SUCCESS_GET_DASHBOARD_DATA,
  SET_SEARCH_MAPPING_DATA,
  FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD,
} from './types';

import { sortByKey } from '../../helpers/sortByKey';

import { MappingFileDataType } from '../../types/mapping';

const initialState: MappingState = {
  classOfBusiness: null,
  mappingData: null,
  searchedMappingData: null,
  historyData: null,
  newMapping: [],
  fileUploadSuccess: false,
  dataMappingDetails: null,
  dataMappingFileList: null,
  dataMappingFileInstructions: null,
  selectedCof: '',
  selectedCofId: '',
  selectedMt: '',
  selectedMtId: '',
  selectedYear: '',
  selectedMonth: '',
  csvTemplate: [],
  csvUploadErrorField: '',
  csvUploadErrors: {},
};

export const mappingReducer = (
  state = initialState,
  action: MappingTypes
): MappingState => {
  let newIngData, sorted, fname;
  let newLocalMapping: MappingFileDataType;
  switch (action.type) {
    case REQUEST_GET_CLASS_OF_BUSINESS:
      return {
        ...state,
        classOfBusiness: [{ id: '1', name: 'Loading...' }],
        searchedMappingData: null,
        sortByField: '',
        newMapping: [],
      };

    case SUCCESS_GET_CLASS_OF_BUSINESS:
      return {
        ...state,
        classOfBusiness: [
          { id: '1', name: 'Select an item from list' },
          ...action.cob,
        ],
      };

    case ADD_NEW_LOCAL_MAPPING:
      newLocalMapping = {
        id: action.id,
        entityNm: '',
        taxRate: '',
        startDate: '',
        endDate: '',
        loadDate: '',
        loadId: '',
        planTrdrFte: 0,
        validFrom: '',
        validTo: '',
        actualPlanFlg: '',
        negAdminMarginFlg: '',
      };
      return {
        ...state,
        newMapping: [...state.newMapping, newLocalMapping],
      };

    case REMOVE_NEW_LOCAL_MAPPING:
      let filteredNewMapping = state.newMapping.filter(
        (m) => m.id !== action.id
      );
      return {
        ...state,
        newMapping: filteredNewMapping,
      };

    case UPDATE_LOCAL_MAPPING_ROW:
      let objn = action.fieldName,
        objv = action.fieldValue;
      let updated = state.newMapping.map((d) => {
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
        newMapping: updated,
      };

    case MAKE_ROW_EDITABLE:
      return {
        ...state,
        mappingData: action.ingestion,
      };

    case MAKE_SEARCHED_ROW_EDITABLE:
      return {
        ...state,
        searchedMappingData: action.ingestion,
      };

    case SUCCESS_MAPPING_UPDATE:
      newIngData = state.mappingData
        ? state.mappingData.map((m) => {
            m.IsEditable = false;
            return m;
          })
        : [];
      return {
        ...state,
        mappingData: newIngData,
      };

    case REQUEST_MAPPING_DETAILS:
      return {
        ...state,
        dataMappingDetails: null,
        dataMappingFileList: [{ id: '0', name: 'Loading...' }],
      };

    case SUCCESS_MAPPING_DETAILS:
      const difl = action.mappingDetails
        ? action.mappingDetails.map((d: any) => {
            return {
              id: d.dataIngestionId.toString(),
              name: d.ingestionFileName,
            };
          })
        : [];
      return {
        ...state,
        dataMappingDetails: action.mappingDetails,
        dataMappingFileList: [
          { id: '0', name: 'Select an item from list' },
          ...difl,
        ],
        sortByField: '',
      };

    case FAILED_MAPPING_DETAILS:
      return {
        ...state,
        dataMappingDetails: null,
        sortByField: '',
      };

    case REQUEST_GET_MAPPING_DATA:
      return {
        ...state,
        //mappingData: [],
        newMapping: [],
      };

    case SUCCESS_GET_MAPPING_DATA:
      return {
        ...state,
        mappingData: action.ingestionData,
        newMapping: [],
        sortByField: '',
      };

    case HANDLE_MAPPING_DATA_CHANGE:
      newIngData = state.mappingData
        ? state.mappingData.map((m: any) => {
            if (m.id === action.id) {
              m[action.fieldName] = action.fieldValue;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        mappingData: newIngData ?? [],
      };

    case HANDLE_SEARCHED_MAPPING_DATA_CHANGE:
      newIngData = state.searchedMappingData
        ? state.searchedMappingData.map((m: any) => {
            if (m.id === action.id) {
              m[action.fieldName] = action.fieldValue;
              return m;
            }
            return m;
          })
        : [];
      return {
        ...state,
        searchedMappingData: newIngData ?? [],
      };

    case SORT_BY_FIELD_NAME:
      sorted = state.mappingData;
      fname = action.fieldName;
      if (state.mappingData) {
        sorted = sortByKey<any>(state.mappingData, fname, action.sorted);
      }
      return {
        ...state,
        mappingData: sorted,
        sortByField: fname,
      };

    case SORT_BY_SEARCHED_FIELD_NAME:
      sorted = state.searchedMappingData;
      fname = action.fieldName;
      if (state.searchedMappingData) {
        sorted = sortByKey<any>(
          state.searchedMappingData,
          fname,
          action.sorted
        );
      }
      return {
        ...state,
        searchedMappingData: sorted,
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

    case SET_MAPPING_QUERY_PARAMS:
      return {
        ...state,
        selectedCof: action.selectedCof,
        selectedCofId: action.selectedCofId,
        selectedMt: action.selectedMt,
        selectedMtId: action.selectedMtId,
      };

    case REQUEST_GET_MAPPING_INSTRUCTIONS:
      return {
        ...state,
        dataMappingFileInstructions: null,
      };

    case SUCCESS_GET_MAPPING_INSTRUCTIONS:
      return {
        ...state,
        dataMappingFileInstructions: action.dataMappingFileInstructions,
      };

    case FAILED_GET_MAPPING_INSTRUCTIONS:
      return {
        ...state,
        dataMappingFileInstructions: null,
      };

    case SET_CSV_TEMPLATE:
      return {
        ...state,
        csvTemplate: action.csvTemplate,
      };

    case SUCCESS_GET_MAPPING_HISTORY:
      return {
        ...state,
        historyData: action.history,
        sortByField: '',
      };

    case SUCCESS_ADD_MAPPING:
      return {
        ...state,
        newMapping: [],
      };

    case SUCCESS_GET_DASHBOARD_DATA:
      return {
        ...state,
        dashBoard: {
          description: action.description,
          usage: action.usage,
          dashBoardData: action.dashBoardData,
        },
      };

    case SET_SEARCH_MAPPING_DATA:
      return {
        ...state,
        searchedMappingData: action.ingestionData,
        sortByField: '',
      };

    case FAILED_WITH_CSV_ERRORS_INGESTION_CSV_UPLOAD:
      return {
        ...state,
        csvUploadErrorField: action.errorFieldName,
        csvUploadErrors: action.errors,
      };

    default:
      return state;
  }
};
