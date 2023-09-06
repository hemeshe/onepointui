import React from 'react';
import NumberFormat from 'react-number-format';

import * as Styled from '../styles';

import { Props } from '../table-preview';

export const CcpnBody = ({ list }: Props) => (
  <React.Fragment>
    {list?.map((ing, i) => (
      <Styled.TRow
        numbering={i}
        key={ing.id + i}
        borderBottom='1px solid #D9D9D9'
        borderRight='1px solid #D9D9D9'
        borderLeft='1px solid #D9D9D9'
      >
        <Styled.TD>{ing.ccpnYear}</Styled.TD>
        <Styled.TD>{ing.ccpnQuarter}</Styled.TD>
        <Styled.TD>{ing.ccpnCcpnFlag}</Styled.TD>
        <Styled.TD>{ing.ccpnSapId}</Styled.TD>
        <Styled.TD>
          <span style={{ fontWeight: 'bold', color: 'black' }}>
            {ing.ccpnSapShortName}
          </span>
        </Styled.TD>
        <Styled.TD>{ing.ccpnCompanyCode}</Styled.TD>
        <Styled.TD>{ing.ccpnLoadDate}</Styled.TD>
        <Styled.TD>{ing.ccpnUpdatedBy}</Styled.TD>
        <Styled.TD>{ing.ccpnUpdatedAt}</Styled.TD>
      </Styled.TRow>
    ))}
  </React.Fragment>
);
