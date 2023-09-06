import React from "react";

import * as Styled from "./styles";

import { INST } from "./constants";

export const Instructions = () => (
  <Styled.Container>
    {/* <Styled.Section>
      <Styled.SmallTitle>Description of table :</Styled.SmallTitle>
      <Styled.Para>
        The Tax Rates table is used to calculate the statutory tax for each
        entity. This is populated once a year or when statutory tax changes
        occurs.
      </Styled.Para>
    </Styled.Section> */}

    <Styled.Section>
      <Styled.SmallTitle>Instructions to follow :</Styled.SmallTitle>
      <Styled.List listStyle="none">
        {INST.map((ins) => (
          <Styled.ListItem key={ins.instruction}>
            {ins.instruction}
          </Styled.ListItem>
        ))}
      </Styled.List>
    </Styled.Section>

    {/* <Styled.Section>
      <Styled.SmallTitle>Usage of Mapping :</Styled.SmallTitle>
      <Styled.Para>
        Below are the list of pages/reports from the dashboards which are
        referencing the selected mapping table.
      </Styled.Para>
    </Styled.Section>

    <Styled.Section>
      <Styled.SmallTitle>Dashboard: Scorecard</Styled.SmallTitle>
      <Styled.ReportContainer>
        <Styled.ReportImageContainer>
          <Styled.ReportImage src="/report-list-line-img-long.png" />
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
  </Styled.Container>
);
