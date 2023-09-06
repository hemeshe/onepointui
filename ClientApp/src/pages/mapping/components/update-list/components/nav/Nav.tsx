import React, { FC, memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { AppStateType } from "../../../../../../store";

import * as Styled from "../../../../styles";

import { useSaveMappping } from "../../../../hooks/useSaveMapping";

type Props = {
  csvData: any[];
  handleRefresh: () => void;
};

export const Nav: FC<Props> = memo(({ csvData, handleRefresh }) => {
  const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  const { mappingData, selectedMt, searchedMappingData } = dataMappingState;

  const { handleSave } = useSaveMappping();

  const handleClick = useCallback(() => {
    const dataToUpdate =
      searchedMappingData && searchedMappingData.length
        ? searchedMappingData?.filter((m) => m.IsEditable === true)
        : mappingData?.filter((m) => m.IsEditable === true);
    if (dataToUpdate) {
      handleSave(dataToUpdate, "edit");
    }
  }, [handleSave, mappingData, searchedMappingData]);

  const data = useMemo(() => {
    return searchedMappingData &&
      Array.isArray(searchedMappingData) &&
      searchedMappingData.length > 0
      ? searchedMappingData
      : mappingData;
  }, [searchedMappingData, mappingData]);

  return (
    <React.Fragment>
      {data &&
        data.length &&
        data.filter((m) => m.IsEditable === true).length > 0 && (
          <Styled.Button onClick={handleClick} backgroundColor="#89CFDC">
            Save
          </Styled.Button>
        )}
      {csvData && csvData.length > 0 && (
        <CSVLink data={csvData} filename={`${selectedMt}.csv`}>
          <Styled.Button>Export File</Styled.Button>
        </CSVLink>
      )}
      <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
    </React.Fragment>
  );
});
