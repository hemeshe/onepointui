import React from 'react';
import { DateFormat } from '../../../../../components/date-format';

import * as Styled from '../styles';

import { Props } from '../table-preview';

import { ACTUAL_PLAN_FLAG_OPTIONS } from '../../../constants';

export const UsdBblBody = ({ list }: Props) => (
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
          <Styled.TD>{ing.entityNm}</Styled.TD>
          <Styled.TD>{ing.deskNm}</Styled.TD>
          <Styled.TD>{ing.manfSite}</Styled.TD>
          <Styled.TD>{ing.buySell}</Styled.TD>
          <Styled.TD>{ing.usdBbl}</Styled.TD>
          <Styled.TD>{ing.year}</Styled.TD>
          <Styled.TD>
            {ing.validFrom && <DateFormat date={ing.validFrom} />}
          </Styled.TD>
          <Styled.TD>
            {ing.validTo && <DateFormat date={ing.validTo} />}
          </Styled.TD>
          <Styled.TD>
            {ing.loadDate && <DateFormat date={ing.loadDate} />}
          </Styled.TD>
          <Styled.TD>{ing.businessUnit}</Styled.TD>
          <Styled.TD>{ing.subDeskNm}</Styled.TD>
          <Styled.TD>
            {
              ACTUAL_PLAN_FLAG_OPTIONS.filter(
                (el) => el.value === ing.actualPlanFlgUsdBbl
              )[0]?.label
            }
          </Styled.TD>
          <Styled.TD>{ing.planPeriod}</Styled.TD>
          <Styled.TD>{ing.cob}</Styled.TD>
          <Styled.TD>{ing.leAdj}</Styled.TD>
        </Styled.TRow>
      ))}
  </React.Fragment>
);
