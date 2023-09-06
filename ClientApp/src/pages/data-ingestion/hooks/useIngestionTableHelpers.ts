import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IngestionFileDataType,
  headings as headingsType,
} from "../../../types/data-ingestion";
import { AppStateType } from "../../../store";
import {
  makeRowEditable,
  handleIngestionDataChange,
  sortByFieldName,
  sortBySearchedFieldName,
  makeSearchedRowEditable,
  handleSearchedIngestionDataChange,
  addNewLocalDataIngestion,
  removeNewLocalIngestion,
  updateLocalDataIngestionRow,
} from "../../../store/data-ingestion/actions";

export type Props = {
  headings?: headingsType[];
  ingestionData?: IngestionFileDataType[] | null;
  errorFieldName?: string;
};

export const useIngestionTableHelpers = (tableHeadings: headingsType[]) => {
  const AppState = useSelector((state: AppStateType) => state.app);
  const [headings, setHeadings] = useState<headingsType[]>(tableHeadings);

  const dispatch = useDispatch();
  const { currentSubNav } = AppState;

  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const { searchedIngestionFileData, newIngestion } = dataIngestionState;

  const handleSortClick = useCallback(
    (h: headingsType) => {
      if (h && h.sorted) {
        let hds = headings?.map((el) => {
          el.sorted = false;
          return el;
        });
        setHeadings(hds);
        if (searchedIngestionFileData && searchedIngestionFileData.length > 0) {
          dispatch(sortBySearchedFieldName(h.name, false));
        } else {
          dispatch(sortByFieldName(h.name, false));
        }
      } else {
        let hds = headings?.map((el) => {
          el.sorted = true;
          return el;
        });
        setHeadings(hds);
        if (searchedIngestionFileData && searchedIngestionFileData.length > 0) {
          dispatch(sortBySearchedFieldName(h.name, false));
        } else {
          dispatch(sortByFieldName(h.name, true));
        }
      }
    },
    [dispatch, headings, searchedIngestionFileData]
  );

  const handleRowSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, m: IngestionFileDataType) => {
      m.IsEditable = e.target.checked ? true : false;
      if (searchedIngestionFileData && searchedIngestionFileData.length > 0) {
        dispatch(makeSearchedRowEditable(m));
      } else {
        dispatch(makeRowEditable(m));
      }
    },
    [dispatch, searchedIngestionFileData]
  );

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      id: number | string
    ) => {
      // console.log(event?.target.name);
      if (searchedIngestionFileData && searchedIngestionFileData.length > 0) {
        dispatch(
          handleSearchedIngestionDataChange(
            id,
            event.target.name,
            event.target.value
          )
        );
      } else {
        dispatch(
          handleIngestionDataChange(id, event.target.name, event.target.value)
        );
      }
    },
    [dispatch, searchedIngestionFileData]
  );

  const setReportingDate = useCallback(
    (date: Date, id: number | string) => {
      const offsetDate: Date | [Date, Date] | null = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      if (searchedIngestionFileData && searchedIngestionFileData.length > 0) {
        dispatch(
          handleSearchedIngestionDataChange(id, "reportingDate", offsetDate)
        );
      } else {
        dispatch(handleIngestionDataChange(id, "reportingDate", offsetDate));
      }
    },
    [dispatch, searchedIngestionFileData]
  );

  const setCommonDateField = useCallback(
    (date: Date, id: number | string, fieldName: string) => {
      const offsetDate: Date | [Date, Date] | null = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      if (searchedIngestionFileData && searchedIngestionFileData.length > 0) {
        dispatch(
          handleSearchedIngestionDataChange(id, fieldName, offsetDate)
        );
      } else {
        dispatch(handleIngestionDataChange(id, fieldName, offsetDate));
      }
    },
    [dispatch, searchedIngestionFileData]
  );

  const handleAddRow = useCallback(() => {
    let id = `new-ing-${Math.random()}`;
    dispatch(addNewLocalDataIngestion(id));
  }, [dispatch]);

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
      id: string,
      key: keyof IngestionFileDataType
    ) => {
      var offset = event.target.offsetHeight - event.target.clientHeight;
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight + offset}px`;
      console.log(event.target.value);
      dispatch(updateLocalDataIngestionRow(event.target.value, key, id));
    },
    [dispatch]
  );

  const handleRemoveAddRow = useCallback(
    (d: IngestionFileDataType) => {
      dispatch(removeNewLocalIngestion(d.id));
    },
    [dispatch]
  );

  return {
    currentSubNav,
    headings,
    setReportingDate,
    setCommonDateField,
    handleSortClick,
    handleRowSelect,
    handleChange,
    handleAddRow,
    handleInputChange,
    handleRemoveAddRow,
    newIngestion,
  };
};
