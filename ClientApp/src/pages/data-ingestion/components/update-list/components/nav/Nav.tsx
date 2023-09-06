import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { AppStateType } from "../../../../../../store";

import * as Styled from "../../../../styles";

import { useSaveDataIngestion } from "../../../../hooks/useSaveDataIngestion";

type Props = {
  onImportClick: () => void;
  csvData: any[];
  handleRefresh: () => void;
};

export const Nav = ({ onImportClick, csvData, handleRefresh }: Props) => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const {
    ingestionFileData,
    selectedDif,
    searchedIngestionFileData,
  } = dataIngestionState;
  const { saveDataIngestion } = useSaveDataIngestion();

  const handleSave = useCallback(() => {
    const dataToUpdate =
      searchedIngestionFileData && searchedIngestionFileData.length
        ? searchedIngestionFileData?.filter((d) => d.IsEditable === true)
        : ingestionFileData?.filter((d) => d.IsEditable === true);
    if (dataToUpdate) {
      saveDataIngestion(dataToUpdate);
    }
  }, [ingestionFileData, saveDataIngestion, searchedIngestionFileData]);

  const data = useMemo(() => {
    return searchedIngestionFileData &&
      Array.isArray(searchedIngestionFileData) &&
      searchedIngestionFileData.length > 0
      ? searchedIngestionFileData
      : ingestionFileData;
  }, [searchedIngestionFileData, ingestionFileData]);

  return (
    <React.Fragment>
      {data &&
      data.length &&
      data.filter((m) => m.IsEditable === true).length > 0 ? (
        <Styled.Button onClick={handleSave} backgroundColor="#89CFDC">
          Save
        </Styled.Button>
      ) : (
        <Styled.Button onClick={onImportClick}>Import File</Styled.Button>
      )}
      {csvData && csvData.length > 0 && (
        <CSVLink data={csvData} filename={`${selectedDif}.csv`}>
          <Styled.Button>Export File</Styled.Button>
        </CSVLink>
      )}
      <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
    </React.Fragment>
  );
};
