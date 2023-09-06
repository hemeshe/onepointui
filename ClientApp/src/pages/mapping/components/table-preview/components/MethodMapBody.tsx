import React from "react";
import { DateFormat } from "../../../../../components/date-format";

import * as Styled from "../styles";

import { Props } from "../table-preview";

import { ACTUAL_PLAN_FLAG_OPTIONS } from "../../../constants";

export const MethodMapBody = ({ list }: Props) => (
  <React.Fragment>
    {list &&
      list.map((ing, i) => (
        <Styled.TRow
          numbering={i}
          key={ing.id + i}
          borderBottom="1px solid #D9D9D9"
          borderRight="1px solid #D9D9D9"
          borderLeft="1px solid #D9D9D9"
        >
          <Styled.TD>{ing.reportingLine}</Styled.TD>
          <Styled.TD>{ing.entityNm}</Styled.TD>
          <Styled.TD>{ing.deskNm}</Styled.TD>
          <Styled.TD>{ing.subDeskNm}</Styled.TD>
          <Styled.TD style={{ minWidth: "200px" }}>{ing.formula}</Styled.TD>
          <Styled.TD>{ing.method}</Styled.TD>
          <Styled.TD>{ing.methodDesc}</Styled.TD>
          <Styled.TD>{ing.cob}</Styled.TD>
          <Styled.TD>{ing.site}</Styled.TD>
          <Styled.TD>{ing.allocation}</Styled.TD>
          <Styled.TD>{ing.scaleFactor}</Styled.TD>
          <Styled.TD>
            {
              ACTUAL_PLAN_FLAG_OPTIONS.filter(
                (el) => el.value === ing.actualPlanFlg
              )[0]?.label
            }
          </Styled.TD>
          <Styled.TD>{ing.negAdminMarginFlg}</Styled.TD>
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
        </Styled.TRow>
      ))}
  </React.Fragment>
);
