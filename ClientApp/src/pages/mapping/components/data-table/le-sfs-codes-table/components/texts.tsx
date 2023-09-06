import React, { FC, Fragment } from 'react';

import { MappingFileDataType } from '../../../../../../types/mapping';
import { DateFormat } from '../../../../../../components/date-format';

import * as T from '../../../../../../components/table';

export const Texts: FC<MappingFileDataType> = (d) => {
  return (
    <Fragment>
      <T.TD>{d.cob}</T.TD>
      <T.TD>{d.sfsId}</T.TD>
      <T.TD>{d.logicCds}</T.TD>
      <T.TD>{d.statement}</T.TD>
      <T.TD>{d.kpi}</T.TD>
      <T.TD>{d.description}</T.TD>
      <T.TD>{d.subDescription}</T.TD>
      <T.TD>{d.scoa}</T.TD>
      <T.TD>{d.multiplier}</T.TD>
      <T.TD>{d.sourceTable}</T.TD>
      <T.TD>{d.sourceField}</T.TD>
      <T.TD>{d.cfWalkFlg}</T.TD>
      <T.TD>{d.alias_1}</T.TD>
      <T.TD>{d.diAl}</T.TD>
      <T.TD>{d.alias_2}</T.TD>
      <T.TD>{d.validFrom && <DateFormat date={d.validFrom} />}</T.TD>
      <T.TD>{d.validTo && <DateFormat date={d.validTo} />}</T.TD>
    </Fragment>
  );
};
