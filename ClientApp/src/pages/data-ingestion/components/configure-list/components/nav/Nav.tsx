import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { AppStateType } from "../../../../../../store";

import * as Styled from "../../../../styles";

import { useSaveDataIngestionConfig } from "../../../../hooks/useSaveDataIngestionConfig";

type Props = {
  onImportClick: () => void;
  handleRefresh: () => void;
  csvTemplate: any[];
};

export const Nav = ({ onImportClick, handleRefresh, csvTemplate }: Props) => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const { saveDataIngestionConfig } = useSaveDataIngestionConfig();

  const handleSave = useCallback(
    (newIng) => {
      saveDataIngestionConfig(newIng);
    },
    [saveDataIngestionConfig]
  );

  const { newIngestion } = dataIngestionState;
  return (
    <React.Fragment>
      {newIngestion && newIngestion.length ? (
        <Styled.Button
          onClick={() => handleSave(newIngestion)}
          backgroundColor="#89CFDC"
        >
          Save
        </Styled.Button>
      ) : (
        ""
      )}
      {/* <CSVLink data={csvTemplate} filename={`${selectedDif}-Template.csv`}>
        <Styled.Button>Download Template</Styled.Button>
      </CSVLink> */}
      <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
    </React.Fragment>
  );
};

//<Styled.Button onClick={onImportClick}>Import File</Styled.Button>
