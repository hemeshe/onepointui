import React from 'react';

import * as Styled from '../styles';

import { Props } from '../table-preview';

export const TaWorkingCapitalBody = ({ list }: Props) => (
  <React.Fragment>
    {list?.map((ing, i) => (
      <Styled.TRow
        numbering={i}
        key={ing.id + i}
        borderBottom='1px solid #D9D9D9'
        borderRight='1px solid #D9D9D9'
        borderLeft='1px solid #D9D9D9'
      >
        <Styled.TD>{ing.reportingDate}</Styled.TD>
        <Styled.TD>{ing.year}</Styled.TD>
        <Styled.TD>{ing.quarter}</Styled.TD>
        <Styled.TD>{ing.month}</Styled.TD>
        <Styled.TD>
          <span style={{ fontWeight: 'bold', color: 'black' }}>
            {ing.businessUnit}
          </span>
        </Styled.TD>
        <Styled.TD>{ing.entityNm}</Styled.TD>
        <Styled.TD>{ing.deskNm}</Styled.TD>
        <Styled.TD>{ing.subDeskNm}</Styled.TD>
        <Styled.TD>{ing.currency}</Styled.TD>
        <Styled.TD>{ing.amount}</Styled.TD>
        <Styled.TD>{ing.actualPlanLeFlg}</Styled.TD>
        <Styled.TD>{ing.reportingLine}</Styled.TD>
        <Styled.TD>{ing.pnlDescription}</Styled.TD>
        <Styled.TD>{ing.site}</Styled.TD>
        <Styled.TD>{ing.loadDate}</Styled.TD>
      </Styled.TRow>
    ))}
  </React.Fragment>
);
