import React from 'react';

import * as Styled from './styles';

import { ValidationRules } from '../../../../components/validation-rules';

import { DataIngestionFileInstructionsSuccessResponse } from '../../../../types/data-ingestion';

type Props = {
  INST?: DataIngestionFileInstructionsSuccessResponse[] | null;
  AD?: string;
};

export const Instructions = ({ INST, AD }: Props) => (
  <Styled.Container>
    <ValidationRules />
    {/* <Styled.Section>
      <Styled.SmallTitle>Instructions to follow :</Styled.SmallTitle>
      <Styled.List listStyle="none">
        {INST &&
          INST.map((ins, i) => (
            <Styled.ListItem key={ins.dataIngestionId + i}>
              {ins.instructionToFollow}
            </Styled.ListItem>
          ))}
      </Styled.List>
    </Styled.Section> */}
    {/* <Styled.Section>
      <Styled.SmallTitle>Mapping Details :</Styled.SmallTitle>
      <Styled.Para>
        Below are the list of pages/tabs from the report which are associated
        with the selected Ingestion file.
      </Styled.Para>
    </Styled.Section> */}
    {/* <Styled.Section>
      <Styled.SmallTitle>Report: Scorecard</Styled.SmallTitle>
      <Styled.ReportContainer>
        <Styled.ReportImageContainer>
          <Styled.ReportImage src="/report-list-line-img1.png" />
        </Styled.ReportImageContainer>
        <Styled.List style={{ padding: "30px 0 0 0" }} listStyle="none">
          {REPORTINS.map((ins) => (
            <Styled.ListItem key={ins.instruction}>
              {ins.instruction}
            </Styled.ListItem>
          ))}
        </Styled.List>
      </Styled.ReportContainer>
    </Styled.Section> */}
    {AD && (
      <Styled.Section>
        <Styled.SmallTitle>Application details :</Styled.SmallTitle>
        <Styled.Para>{AD}</Styled.Para>
      </Styled.Section>
    )}
  </Styled.Container>
);
