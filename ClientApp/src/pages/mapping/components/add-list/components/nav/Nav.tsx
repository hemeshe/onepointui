import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

import { AppStateType } from '../../../../../../store';

import * as Styled from '../../../../styles';
import { useSaveMappping } from '../../../../hooks/useSaveMapping';
import {
  Trading_Allocation_Methodology_Mapping,
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../../../../helpers/mapping-tables-constants';

type Props = {
  csvData: any[];
  handleRefresh: () => void;
  csvTemplate: any[];
  onImportClick: () => void;
};

export const Nav = memo(
  ({ csvData, handleRefresh, csvTemplate, onImportClick }: Props) => {
    const dataMappingState = useSelector(
      (state: AppStateType) => state.mapping
    );
    const { newMapping, selectedMt } = dataMappingState;
    const { handleSave } = useSaveMappping();

    return (
      <React.Fragment>
        {newMapping && !!newMapping.length ? (
          <Styled.Button
            onClick={() => handleSave(newMapping, 'add')}
            backgroundColor='#89CFDC'
          >
            Save
          </Styled.Button>
        ) : (
          (selectedMt === Trading_Allocation_Methodology_Mapping ||
            selectedMt === Trading_Allocation_Dollar_Per_Barrel_USD ||
            selectedMt === Le_Sfs_Codes ||
            selectedMt === Report_Freeze_Map) && (
            <Styled.Button onClick={onImportClick}>Import File</Styled.Button>
          )
        )}
        {csvData && csvData.length > 0 && (
          <CSVLink data={csvData} filename={`${selectedMt}.csv`}>
            <Styled.Button>Export File</Styled.Button>
          </CSVLink>
        )}
        <CSVLink data={csvTemplate} filename={`${selectedMt}-Template.csv`}>
          <Styled.Button>Download Template</Styled.Button>
        </CSVLink>
        <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
      </React.Fragment>
    );
  }
);
