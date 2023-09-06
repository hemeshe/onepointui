import React, { FC, Fragment } from 'react';
import NumberFormat from 'react-number-format';

import { IngestionFileDataType } from '../../../../../../types/data-ingestion';

import { DateFormat } from '../../../../../../components/date-format';

import * as T from '../../../../../../components/table';

// export type Props = {
//   ing: IngestionFileDataType;
//   errorFieldName: string | undefined;
// };

export const Texts: FC<IngestionFileDataType> = (ing) => {
  return (
    <Fragment>
      <T.TD>
        {ing.reportingDate && <DateFormat date={ing.reportingDate} />}
      </T.TD>
      <T.TD>{ing.year}</T.TD>
      <T.TD>{ing.quarter}</T.TD>
      <T.TD>{ing.month}</T.TD>
      <T.TD>{ing.businessUnit}</T.TD>
      <T.TD>{ing.entityNm}</T.TD>
      <T.TD>{ing.deskNm}</T.TD>
      <T.TD>{ing.subDeskNm}</T.TD>
      <T.TD>{ing.currency}</T.TD>
      <T.TD color={ing.amount && ing.amount <= 0 ? '#b90202' : ''}>
        <NumberFormat
          value={ing.amount}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={6}
        />
      </T.TD>
      <T.TD>{ing.actualPlanLeFlg}</T.TD>
      <T.TD>{ing.reportingLine}</T.TD>
      <T.TD>{ing.pnlDescription}</T.TD>
      <T.TD>{ing.site}</T.TD>
      <T.TD>{ing.loadDate && <DateFormat date={ing.loadDate} />}</T.TD>
    </Fragment>
  );
};
