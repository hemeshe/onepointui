import React, { FC, Fragment } from 'react';
import NumberFormat from 'react-number-format';

import { IngestionFileDataType } from '../../../../../../types/data-ingestion';

import { DateFormat } from '../../../../../../components/date-format';

import * as T from '../../../../../../components/table';
import { setTdBgColor } from '../../../../helpers/setTdBgColor';

export type Props = {
  ing: IngestionFileDataType;
  errorFieldName: string | undefined;
};

export const Texts: FC<Props> = ({ ing, errorFieldName }) => {
  return (
    <Fragment>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'REPORTING_DATE')}>
        {ing.reportingDate && (
          <div style={{ display: 'block', minWidth: 'max-content' }}>
            <DateFormat date={ing.reportingDate} />
          </div>
        )}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'PNL_DESCRIPTION')}>
        {ing.pnlDescription}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'BUSINESS_UNIT')}>
        {ing.businessUnit}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'ENTITY_NM')}>
        {ing.entityNm}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'REGION')}>
        {ing.region}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'DESK_NM')}>
        {ing.deskNm}
      </T.TD>

      <T.TD
        color={ing.amount && ing.amount < 1 ? '#b90202' : ''}
        backgroundColor={setTdBgColor(errorFieldName, 'AMOUNT')}
      >
        <NumberFormat
          value={ing.amount}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={2}
        />
      </T.TD>

      <T.TD
        backgroundColor={setTdBgColor(errorFieldName, 'ACTUAL_PLAN_FLG_MTHO1F')}
      >
        {ing.actualPlanFlgMthO1f}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'PLAN_PERIOD')}>
        {ing.planPeriod}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'SUB_DESK_NM')}>
        {ing.subDeskNm}
      </T.TD>
    </Fragment>
  );
};
