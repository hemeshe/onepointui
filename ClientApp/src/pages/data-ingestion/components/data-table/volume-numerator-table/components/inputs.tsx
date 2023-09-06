import React, { FC, Fragment } from 'react';

import { ControlledInput } from '../../../../../../components/text-input';

import * as T from '../../../../../../components/table';
import { DateFormat } from '../../../../../../components/date-format';

import { InputsProps } from '../../../../helpers/types';
import * as Styled from '../../styles';
import { setTdBgColor } from '../../../../helpers/setTdBgColor';

export const Inputs: FC<InputsProps> = ({
  ing,
  errorFieldName,
  handleChange,
}) => {
  return (
    <Fragment>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'REPORTING_DATE')}>
        {ing.reportingDate && (
          <div style={{ display: 'block', minWidth: 'max-content' }}>
            <DateFormat date={ing.reportingDate} />
          </div>
        )}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'BUSINESS_UNIT')}>
        {ing.businessUnit}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'COB')}>
        {ing.cob}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'ENTITY_NM')}>
        {ing.entityNm}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'DESK_NM')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.deskNm}
          name='deskNm'
        />
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'SUB_DESK_NM')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.subDeskNm}
          name='subDeskNm'
        />
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'VOLUME_IG')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.volumeIg}
          name='volumeIg'
        />
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'REFINERY')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.refinery}
          name='refinery'
        />
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'BUY_SELL')}>
        <Styled.Select
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.buySell}
          name='buySell'
        >
          <Styled.Option value=''>Select</Styled.Option>
          <Styled.Option value='B'>B (Buy)</Styled.Option>
          <Styled.Option value='S'>S (Sell)</Styled.Option>
        </Styled.Select>
      </T.TD>

      <T.TD
        backgroundColor={setTdBgColor(errorFieldName, 'ACTUAL_PLAN_FLG_IGVOL')}
      >
        {ing.actualPlanFlgIgvol}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'PLAN_PERIOD')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.planPeriod}
          name='planPeriod'
        />
      </T.TD>
    </Fragment>
  );
};
