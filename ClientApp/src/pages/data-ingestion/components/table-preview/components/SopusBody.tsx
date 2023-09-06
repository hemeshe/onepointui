import React from "react";
import NumberFormat from "react-number-format";

import * as Styled from "../styles";

import { Props } from "../table-preview";

export const SopusBody = ({ list }: Props) => (
  <React.Fragment>
    {list?.map((ing, i) => (
      <Styled.TRow
        numbering={i}
        key={ing.id + i}
        borderBottom="1px solid #D9D9D9"
        borderRight="1px solid #D9D9D9"
        borderLeft="1px solid #D9D9D9"
      >
        <Styled.TD>{ing.reportingDate}</Styled.TD>
        <Styled.TD>{ing.pnlDescription}</Styled.TD>
        <Styled.TD>
          <span style={{ fontWeight: "bold", color: "black" }}>
            {ing.businessUnit}
          </span>
        </Styled.TD>
        <Styled.TD>{ing.entityNm}</Styled.TD>
        <Styled.TD>{ing.region}</Styled.TD>
        <Styled.TD>{ing.deskNm}</Styled.TD>
        <Styled.TD>
          <NumberFormat
            value={ing.amount}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
          />
        </Styled.TD>

        <Styled.TD>{ing.actualPlanFlgMthO1f}</Styled.TD>

        <Styled.TD>{ing.planPeriod}</Styled.TD>
        <Styled.TD>{ing.subDeskNm}</Styled.TD>
      </Styled.TRow>
    ))}
  </React.Fragment>
);
