import React from "react";

import * as Styled from "../styles";

import { Props } from "../table-preview";

export const VolumeNumeratorBody = ({ list }: Props) => (
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
        <Styled.TD>
          <span style={{ fontWeight: "bold", color: "black" }}>
            {ing.businessUnit}
          </span>
        </Styled.TD>
        <Styled.TD>{ing.cob}</Styled.TD>
        <Styled.TD>{ing.entityNm}</Styled.TD>

        <Styled.TD>{ing.deskNm}</Styled.TD>
        <Styled.TD>{ing.subDeskNm}</Styled.TD>
        <Styled.TD>{ing.volumeIg}</Styled.TD>
        <Styled.TD>{ing.refinery}</Styled.TD>
        <Styled.TD>{ing.buySell}</Styled.TD>
        <Styled.TD>{ing.actualPlanFlgIgvol}</Styled.TD>
        <Styled.TD>{ing.planPeriod}</Styled.TD>
      </Styled.TRow>
    ))}
  </React.Fragment>
);
