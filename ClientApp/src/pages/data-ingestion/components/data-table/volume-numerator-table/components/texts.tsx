import React, { FC, Fragment } from 'react';
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
        {ing.deskNm}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'SUB_DESK_NM')}>
        {ing.subDeskNm}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'VOLUME_IG')}>
        {ing.volumeIg}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'REFINERY')}>
        {ing.refinery}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'BUY_SELL')}>
        {ing.buySell}
      </T.TD>

      <T.TD
        backgroundColor={setTdBgColor(errorFieldName, 'ACTUAL_PLAN_FLG_IGVOL')}>
        {ing.actualPlanFlgIgvol}
      </T.TD>

      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'PLAN_PERIOD')}>
        {ing.planPeriod}
      </T.TD>
    </Fragment>
  );
};
