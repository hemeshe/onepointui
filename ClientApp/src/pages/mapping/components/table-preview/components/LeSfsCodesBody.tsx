import React from 'react';

import * as Styled from '../styles';

import { Props } from '../table-preview';
import { DateFormat } from '../../../../../components/date-format';

export const LeSfsCodesBody = ({ list }: Props) => (
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
          <Styled.TD>{ing.cob}</Styled.TD>
          <Styled.TD>{ing.sfsId}</Styled.TD>
          <Styled.TD>
            <span style={{ fontWeight: 'bold', color: 'black' }}>
              {ing.logicCds}
            </span>
          </Styled.TD>
          <Styled.TD>{ing.statement}</Styled.TD>
          <Styled.TD>{ing.kpi}</Styled.TD>
          <Styled.TD>{ing.description}</Styled.TD>
          <Styled.TD>{ing.subDescription}</Styled.TD>
          <Styled.TD>{ing.scoa}</Styled.TD>
          <Styled.TD>{ing.multiplier}</Styled.TD>
          <Styled.TD>{ing.sourceTable}</Styled.TD>
          <Styled.TD>{ing.sourceField}</Styled.TD>
          <Styled.TD>{ing.cfWalkFlg}</Styled.TD>
          <Styled.TD>{ing.alias_1}</Styled.TD>
          <Styled.TD>{ing.diAl}</Styled.TD>
          <Styled.TD>{ing.alias_2}</Styled.TD>
          <Styled.TD>
            {ing.validFrom && <DateFormat date={ing.validFrom} />}
          </Styled.TD>
          <Styled.TD>
            {ing.validTo && <DateFormat date={ing.validTo} />}
          </Styled.TD>
        </Styled.TRow>
      ))}
  </React.Fragment>
);
