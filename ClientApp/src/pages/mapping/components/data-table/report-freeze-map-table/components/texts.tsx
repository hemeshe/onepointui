import React, { FC, Fragment } from 'react';

import { MappingFileDataType } from '../../../../../../types/mapping';

import * as T from '../../../../../../components/table';
import { DateFormat } from '../../../../../../components/date-format';

export const Texts: FC<MappingFileDataType> = (d) => {
  return (
    <Fragment>
      <T.TD>{d.cob}</T.TD>
      <T.TD>{d.year}</T.TD>
      <T.TD>{d.reportingMonth}</T.TD>
      <T.TD>{d.rptNm}</T.TD>
      <T.TD>{d.frzDt}</T.TD>
      <T.TD>{d.frzTme}</T.TD>
      <T.TD>{d.frzTmeZne}</T.TD>
      <T.TD>{d.deleteInd}</T.TD>
      <T.TD>{d.loadDate && <DateFormat date={d.loadDate} />}</T.TD>
    </Fragment>
  );
};
