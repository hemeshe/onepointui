import React from 'react';
import { DateFormat } from '../../../../../components/date-format';

import * as Styled from '../styles';

import { Props } from '../table-preview';

export const ReportFreezeMapBody = ({ list }: Props) => (
  <React.Fragment>
    {list &&
      list.map((ing, i) => (
        <Styled.TRow
          numbering={i}
          key={ing.id + i}
          borderBottom='1px solid #D9D9D9'
          borderRight='1px solid #D9D9D9'
          borderLeft='1px solid #D9D9D9'
        >
          <Styled.TD>
            <span style={{ fontWeight: 'bold', color: 'black' }}>
              {ing.cob}
            </span>
          </Styled.TD>
          <Styled.TD>{ing.year}</Styled.TD>
          <Styled.TD>{ing.reportingMonth}</Styled.TD>
          <Styled.TD>{ing.rptNm}</Styled.TD>
          <Styled.TD>{ing.frzDt}</Styled.TD>
          <Styled.TD>{ing.frzTme}</Styled.TD>
          <Styled.TD>{ing.frzTmeZne}</Styled.TD>
          <Styled.TD>
            {ing.loadDate && <DateFormat date={ing.loadDate} />}
          </Styled.TD>
        </Styled.TRow>
      ))}
  </React.Fragment>
);
