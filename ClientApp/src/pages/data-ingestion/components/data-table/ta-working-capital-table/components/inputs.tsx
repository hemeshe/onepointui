import React, { FC, Fragment } from 'react';

import { ControlledInput } from '../../../../../../components/text-input';

import * as T from '../../../../../../components/table';

import { setTdBgColor } from '../../../../helpers/setTdBgColor';
import { DateFormat } from '../../../../../../components/date-format';

import { InputsProps } from '../../../../helpers/types';

export const Inputs: FC<InputsProps> = ({
  ing,
  errorFieldName,
  handleChange,
  setCommonDateField,
}) => {
  return (
    <Fragment>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'DATE')}>
        {ing.reportingDate && <DateFormat date={ing.reportingDate} />}
        {/* {ing.reportingDate && setCommonDateField && (
          <DateInput
            selected={new Date(ing.reportingDate)}
            onChange={(date: Date) => setCommonDateField(date, ing.id, "reportingDate")}
          />
        )} */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'YEAR')}>
        {ing.year}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'QUARTER')}>
        {ing.quarter}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'MONTH')}>
        {ing.month}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'BUSINESS_UNIT')}>
        {ing.businessUnit}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'ENTITY_NM')}>
        {ing.entityNm}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'DESK_NM')}>
        {ing.deskNm}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.deskNm}
          name='deskNm'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'SUB_DESK_NM')}>
        {ing.subDeskNm}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.subDeskNm}
          name='subDeskNm'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CURRENCY')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.currency}
          name='currency'
        />
      </T.TD>
      <T.TD
        color={ing.amount && ing.amount <= 0 ? '#b90202' : ''}
        backgroundColor={setTdBgColor(errorFieldName, 'AMOUNT')}
      >
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.amount}
          name='amount'
        />
      </T.TD>
      <T.TD
        backgroundColor={setTdBgColor(errorFieldName, 'ACTUAL_PLAN_LE_FLG')}
      >
        {ing.actualPlanLeFlg}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'REPORTING_LINE')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.reportingLine}
          name='reportingLine'
        />
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'PNL_DESCRIPTION')}>
        <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.pnlDescription}
          name='pnlDescription'
        />
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'SITE')}>
        {ing.site}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.site}
          name='site'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'LOAD_DATE')}>
        {ing.loadDate && <DateFormat date={ing.loadDate} />}
      </T.TD>
    </Fragment>
  );
};
