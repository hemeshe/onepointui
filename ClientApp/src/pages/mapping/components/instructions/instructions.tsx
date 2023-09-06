import React from 'react';
import { useSelector } from 'react-redux';

import * as Styled from './styles';

import { MappingFileInstructionsSuccessResponse } from '../../../../types/mapping';

import { AppStateType } from '../../../../store';

import { ValidationRules } from '../../../../components/validation-rules';

type Props = {
  INST?: MappingFileInstructionsSuccessResponse[] | null;
  AD?: string;
};

export const Instructions = ({ INST }: Props) => {
  const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  const { dashBoard, dataMappingDetails, selectedMtId } = dataMappingState;
  const desc = dataMappingDetails?.filter(
    (item) => item.dataIngestionId === Number(selectedMtId)
  );
  return (
    <Styled.Container>
      <ValidationRules />
      <Styled.Section>
        <Styled.SmallTitle>Description of table :</Styled.SmallTitle>
        <Styled.Para>
          {desc && !!desc.length && desc[0].description && desc[0].description}
        </Styled.Para>
      </Styled.Section>

      <Styled.Section>
        <Styled.SmallTitle>Instructions to follow :</Styled.SmallTitle>
        <Styled.List listStyle='none'>
          {INST &&
            INST.map((ins, i) => (
              <Styled.ListItem key={i}>
                {ins.instructionToFollow}
              </Styled.ListItem>
            ))}
        </Styled.List>
      </Styled.Section>
      {dashBoard &&
        dashBoard.dashBoardData &&
        !!dashBoard.dashBoardData.length && (
          <React.Fragment>
            <Styled.Section>
              <Styled.SmallTitle>Usage of Mapping :</Styled.SmallTitle>
              <Styled.Para>
                Below are the list of pages/reports from the dashboards which
                are referencing the selected mapping table.
              </Styled.Para>
            </Styled.Section>

            <Styled.Section>
              <Styled.SmallTitle>Dashboard</Styled.SmallTitle>
              <Styled.ReportContainer>
                <Styled.ReportImageContainer>
                  <Styled.ReportImage
                    aria-label='Different type of reports'
                    src='/report-list-line-img-long.png'
                  />
                </Styled.ReportImageContainer>
                <Styled.List style={{ padding: '30px 0 0 0' }} listStyle='none'>
                  {dashBoard.dashBoardData.map((ins) => (
                    <Styled.ListItem key={ins.reportId}>
                      <span style={{ fontWeight: 'bold' }}>
                        {ins.reportName}{' '}
                      </span>{' '}
                      : {ins.reportTabName}
                    </Styled.ListItem>
                  ))}
                </Styled.List>
              </Styled.ReportContainer>
            </Styled.Section>
          </React.Fragment>
        )}
    </Styled.Container>
  );
};
