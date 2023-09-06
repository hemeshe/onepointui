import React, { FC, Fragment } from 'react';

import { ControlledInput } from '../../../../../../components/text-input';

import * as T from '../../../../../../components/table';
import { DateInput } from '../../../../../../components/date-input';
import { DateFormat } from '../../../../../../components/date-format';
import { setTdBgColor } from '../../../../helpers/setTdBgColor';

import { InputsProps } from '../../../../helpers/types';

export const Inputs: FC<InputsProps> = ({
  ing,
  errorFieldName,
  handleChange,
  setReportingDate,
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

      {/* <T.TD backgroundColor={setTdBgColor(errorFieldName, 'REPORTING_DATE')}>
        {ing.reportingDate && setReportingDate && (
          <DateInput
            selected={new Date(ing.reportingDate)}
            onChange={(date: Date) => setReportingDate(date, ing.id)}
          />
        )}
      </T.TD> */}

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'PNL_DESCRIPTION')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.pnlDescription}
          name='pnlDescription'
        />
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'BUSINESS_UNIT')}>
        {ing.businessUnit}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.businessUnit}
          name='businessUnit'
        /> */}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'ENTITY_NM')}>
        {ing.entityNm}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.entityNm}
          name='entityNm'
        /> */}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'REGION')}>
        {ing.region}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.region}
          name='region'
        /> */}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'DESK_NM')}>
        {ing.deskNm}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.deskNm}
          name='deskNm'
        /> */}
      </T.TD>

      <T.TD
        color={ing.amount && ing.amount < 1 ? '#b90202' : ''}
        backgroundColor={setTdBgColor(errorFieldName, 'AMOUNT')}
      >
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.amount}
          name='amount'
        />
      </T.TD>

      <T.TD
        backgroundColor={setTdBgColor(errorFieldName, 'ACTUAL_PLAN_FLG_MTHO1F')}
      >
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.actualPlanFlgMthO1f}
          name='actualPlanFlgMthO1f'
        />
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'PLAN_PERIOD')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.planPeriod}
          name='planPeriod'
        />
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'SUB_DESK_NM')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.subDeskNm}
          name='subDeskNm'
        />
      </T.TD>
    </Fragment>
  );
};
