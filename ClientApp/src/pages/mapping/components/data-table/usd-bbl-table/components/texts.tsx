import React, { FC, Fragment } from 'react';

import { MappingFileDataType } from '../../../../../../types/mapping';

import * as T from '../../../../../../components/table';
import { DateFormat } from '../../../../../../components/date-format';

import { ACTUAL_PLAN_FLAG_OPTIONS } from '../../../../constants';

export const Texts: FC<MappingFileDataType> = (d) => {
  return (
    <Fragment>
      <T.TD>{d.entityNm}</T.TD>
      <T.TD>{d.deskNm}</T.TD>
      <T.TD style={{ minWidth: '200px' }}>{d.manfSite}</T.TD>
      <T.TD>{d.buySell}</T.TD>
      <T.TD>{d.usdBbl}</T.TD>
      <T.TD>{d.year}</T.TD>
      <T.TD>{d.validFrom && <DateFormat date={d.validFrom} />}</T.TD>
      <T.TD>{d.validTo && <DateFormat date={d.validTo} />}</T.TD>
      <T.TD>{d.loadDate && <DateFormat date={d.loadDate} />}</T.TD>
      <T.TD>{d.businessUnit}</T.TD>
      <T.TD>{d.subDeskNm}</T.TD>
      <T.TD>
        {
          <div>
            {
              ACTUAL_PLAN_FLAG_OPTIONS.filter(
                (el) => el.value === d.actualPlanFlgUsdBbl
              )[0]?.label
            }
          </div>
        }
      </T.TD>
      <T.TD>{d.planPeriod}</T.TD>
      <T.TD>{d.cob}</T.TD>
      <T.TD>{d.leAdj}</T.TD>
    </Fragment>
  );
};
