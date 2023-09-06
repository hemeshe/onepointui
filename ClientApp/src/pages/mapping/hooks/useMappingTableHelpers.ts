import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MappingFileDataType } from "../../../types/mapping";
import { AppStateType } from "../../../store";
import {
  makeRowEditable,
  handleMappingDataChange,
  sortByFieldName,
  makeSearchedRowEditable,
  handleSearchedMappingDataChange,
  addNewLocalMapping,
  updateLocalMappingRow,
  removeNewLocalMapping,
  sortBySearchedFieldName,
} from "../../../store/mapping/actions";

import { DateFormat as DateFormatFunc } from "../../../helpers/date-format";
import { useSetDateInputs } from "./useSetDateInputsForEdit";

export type headingsType = {
  id: string;
  name: string;
  label: string;
  sorted?: boolean;
};

export type Props = {
  headings?: headingsType[];
  Data?: MappingFileDataType[] | null;
  mappingData?: MappingFileDataType[] | null;
  errorFieldName?: string;
};

export const useMappingTableHelpers = (tableHeadings: headingsType[]) => {
  const MappingState = useSelector((state: AppStateType) => state.mapping);
  const AppState = useSelector((state: AppStateType) => state.app);
  const [headings, setHeadings] = useState<headingsType[]>(tableHeadings);

  const dispatch = useDispatch();
  const { mappingData, searchedMappingData, newMapping } = MappingState;
  const { currentSubNav } = AppState;

  const { setValidFromDate, setValidToDate } = useSetDateInputs();

  const handleSortClick = useCallback(
    (h: headingsType) => {
      if (h && h.sorted) {
        let hds = headings?.map((el) => {
          el.sorted = false;
          return el;
        });
        if (searchedMappingData && searchedMappingData.length > 0) {
          dispatch(sortBySearchedFieldName(h.name, false));
        } else {
          dispatch(sortByFieldName(h.name, false));
        }
        setHeadings(hds);
      } else {
        let hds = headings?.map((el) => {
          el.sorted = true;
          return el;
        });
        if (searchedMappingData && searchedMappingData.length > 0) {
          dispatch(sortBySearchedFieldName(h.name, true));
        } else {
          dispatch(sortByFieldName(h.name, true));
        }
        setHeadings(hds);
      }
    },
    [dispatch, headings, searchedMappingData]
  );

  const handleRowSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, m: MappingFileDataType) => {
      m.IsEditable = e.target.checked ? true : false;
      if (mappingData && !searchedMappingData) {
        let newIngData = mappingData.map((d) => {
          if (d.id === m.id) {
            d.IsEditable = m.IsEditable;
            d.validFrom = DateFormatFunc(m.validFrom);
            d.validTo = DateFormatFunc(m.validTo);
            d.loadDate = DateFormatFunc(m.loadDate);
            return d;
          }
          return d;
        });
        dispatch(makeRowEditable(newIngData));
      } else if (mappingData && searchedMappingData) {
        let newIngData = searchedMappingData.map((d) => {
          if (d.id === m.id) {
            d.IsEditable = m.IsEditable;
            d.validFrom = DateFormatFunc(m.validFrom);
            d.validTo = DateFormatFunc(m.validTo);
            d.loadDate = DateFormatFunc(m.loadDate);
          }
          return d;
        });
        dispatch(makeSearchedRowEditable(newIngData));
      }
    },
    [dispatch, mappingData, searchedMappingData]
  );

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      id: number | string
    ) => {
      if (searchedMappingData && searchedMappingData.length > 0) {
        dispatch(
          handleSearchedMappingDataChange(
            id,
            event.target.name,
            event.target.value
          )
        );
      } else {
        dispatch(
          handleMappingDataChange(id, event.target.name, event.target.value)
        );
      }
    },
    [dispatch, searchedMappingData]
  );

  const handleAddRow = useCallback(() => {
    let id = `new-ing-${Math.random()}`;
    dispatch(addNewLocalMapping(id));
  }, [dispatch]);

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      id: string,
      key: keyof MappingFileDataType
    ) => {
      var offset = event.target.offsetHeight - event.target.clientHeight;
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight + offset}px`;
      console.log(event.target.value);
      dispatch(updateLocalMappingRow(event.target.value, key, id));
    },
    [dispatch]
  );

  const handleRemoveAddRow = useCallback(
    (d: MappingFileDataType) => {
      dispatch(removeNewLocalMapping(d.id));
    },
    [dispatch]
  );

  return {
    currentSubNav,
    headings,
    setValidFromDate,
    setValidToDate,
    handleSortClick,
    handleRowSelect,
    handleChange,
    handleAddRow,
    handleInputChange,
    handleRemoveAddRow,
    newMapping,
  };
};
