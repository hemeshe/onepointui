import React, { FC, memo } from 'react';

import * as T from '../../../../../../../components/table';

import { Button } from '../../../../../../../components/button';

import { LeSfsCodesHeadings } from '../../../../../constants';
import { DateFormat } from '../../../../../../../components/date-format';

import { Headings } from '../../../../headings';

import {
  useMappingTableHelpers,
  Props,
} from '../../../../../hooks/useMappingTableHelpers';

import { AddForm } from './components/add-form';

export const LeSfsCodesTable: FC<Props> = memo(({ Data }) => {
  const {
    headings,
    newMapping,
    handleSortClick,
    handleAddRow,
    handleInputChange,
    handleRemoveAddRow,
  } = useMappingTableHelpers(LeSfsCodesHeadings);

  return (
    <T.Table>
      <T.THead>
        <T.TRow borderBottom='1px solid #D9D9D9'>
          <Headings headings={headings} handleSortClick={handleSortClick} />
        </T.TRow>
      </T.THead>
      <T.TBody>
        <T.TRow>
          <T.TD colSpan={headings?.length}>
            <Button
              label='+ Add new row'
              primary
              size='block'
              onClick={handleAddRow}
            />
          </T.TD>
        </T.TRow>
        {newMapping && (
          <AddForm
            newMapping={newMapping}
            handleInputChange={handleInputChange}
            handleRemoveAddRow={handleRemoveAddRow}
          />
        )}

        {Data &&
          Data.map((ing, i) => (
            <T.TRow key={i} borderBottom='1px solid #D9D9D9'>
              <T.TD>{ing.cob}</T.TD>
              <T.TD>{ing.sfsId}</T.TD>
              <T.TD>{ing.logicCds}</T.TD>
              <T.TD>{ing.statement}</T.TD>
              <T.TD>{ing.kpi}</T.TD>
              <T.TD>{ing.description}</T.TD>
              <T.TD>{ing.subDescription}</T.TD>
              <T.TD>{ing.scoa}</T.TD>
              <T.TD>{ing.multiplier}</T.TD>
              <T.TD>{ing.sourceTable}</T.TD>
              <T.TD>{ing.sourceField}</T.TD>
              <T.TD>{ing.cfWalkFlg}</T.TD>
              <T.TD>{ing.alias_1}</T.TD>
              <T.TD>{ing.diAl}</T.TD>
              <T.TD>{ing.alias_2}</T.TD>
              <T.TD>
                {ing.validFrom && <DateFormat date={ing.validFrom} />}
              </T.TD>
              <T.TD>{ing.validTo && <DateFormat date={ing.validTo} />}</T.TD>

              {newMapping && <T.TD></T.TD>}
            </T.TRow>
          ))}
      </T.TBody>
    </T.Table>
  );
});
