import React, { FC } from 'react';
import { CSVLink } from 'react-csv';
//import { useSelector } from "react-redux";

// import {
//   requestMappingAdd,
//   successMappingAdd,
// } from "../../../../../../store/mapping/actions";
//import { AppStateType } from "../../../../../../store";

import * as Styled from '../../../../styles';

type Props = {
  onImportClick: () => void;
  csvTemplate: any[];
  templateName: string | undefined;
};

export const Nav: FC<Props> = ({
  onImportClick,
  csvTemplate,
  templateName,
}) => {
  //const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  //const dispatch = useDispatch();
  //const { newMapping } = dataMappingState;

  //const handleSave = useCallback(() => {
  // dispatch(requestMappingAdd());
  // setTimeout(() => {
  //   dispatch(successMappingAdd());
  // }, 4000);
  //}, []);

  return (
    <React.Fragment>
      <CSVLink data={csvTemplate} filename={`${templateName}-Template.csv`}>
        <Styled.Button>Download Template</Styled.Button>
      </CSVLink>
      <Styled.Button onClick={onImportClick}>Import File</Styled.Button>
    </React.Fragment>
  );
};
