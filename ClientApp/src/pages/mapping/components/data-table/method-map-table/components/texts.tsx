import React, { FC, Fragment } from 'react';

import { MappingFileDataType } from '../../../../../../types/mapping';

import * as T from '../../../../../../components/table';
import { DateFormat } from '../../../../../../components/date-format';
import { ACTUAL_PLAN_FLAG_OPTIONS } from '../../../../constants';

export const Texts: FC<MappingFileDataType> = (d) => {
  return (
    <Fragment>
      <T.TD>{d.reportingLine}</T.TD>
      <T.TD>{d.entityNm}</T.TD>
      <T.TD>{d.deskNm}</T.TD>
      <T.TD>{d.subDeskNm}</T.TD>
      <T.TD style={{ minWidth: '200px' }}>{d.formula}</T.TD>
      <T.TD>{d.method}</T.TD>
      <T.TD>{d.methodDesc}</T.TD>
      <T.TD>{d.cob}</T.TD>
      <T.TD>{d.site}</T.TD>
      <T.TD>{d.allocation}</T.TD>
      <T.TD>{d.scaleFactor}</T.TD>
      <T.TD>
        {
          <div>
            {
              ACTUAL_PLAN_FLAG_OPTIONS.filter(
                (el) => el.value === d.actualPlanFlg
              )[0]?.label
            }
          </div>
        }
      </T.TD>
      <T.TD>{d.negAdminMarginFlg ? 'Yes' : 'No'}</T.TD>
      <T.TD>{d.validFrom && <DateFormat date={d.validFrom} />}</T.TD>
      <T.TD>{d.validTo && <DateFormat date={d.validTo} />}</T.TD>
      <T.TD>{d.loadDate && <DateFormat date={d.loadDate} />}</T.TD>
      <T.TD>{d.businessUnit}</T.TD>
    </Fragment>
  );
};
