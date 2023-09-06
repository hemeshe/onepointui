import React, { memo } from 'react';
import { CSVLink } from 'react-csv';

import * as Styled from '../../../../../styles';

import { useNav } from './useNav';

type Props = {
  csvData: any[];
  handleRefresh: () => void;
  csvTemplate: any[];
  onImportClick: () => void;
};

export const Nav = memo(
  ({ csvData, handleRefresh, csvTemplate, onImportClick }: Props) => {
    const { newUser, handleSave } = useNav();

    return (
      <React.Fragment>
        {newUser && !!newUser.length && (
          <Styled.Button onClick={handleSave} backgroundColor='#89CFDC'>
            Save
          </Styled.Button>
        )}
        {/* {newUser && !!newUser.length ? (
          <Styled.Button onClick={handleSave} backgroundColor='#89CFDC'>
            Save
          </Styled.Button>
        ) : (
          <Styled.Button onClick={onImportClick}>Import File</Styled.Button>
        )}
        <CSVLink data={csvData} filename={`PowerBi-Drls-Users.csv`}>
          <Styled.Button>Export File</Styled.Button>
        </CSVLink>
        <CSVLink
          data={csvTemplate}
          filename={`PowerBi-Drls-Users-Template.csv`}
        >
          <Styled.Button>Download Template</Styled.Button>
        </CSVLink>
        <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button> */}
      </React.Fragment>
    );
  }
);
