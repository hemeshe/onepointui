import React, { FC, memo } from 'react';

import * as T from '../../../../../../../components/table';

import { Button } from '../../../../../../../components/button';

import {
  ACTUAL_PLAN_FLAG_OPTIONS,
  UsdBblHeadings,
} from '../../../../../constants';

import { DateFormat } from '../../../../../../../components/date-format';

import { Headings } from '../../../../headings';

import {
  useMappingTableHelpers,
  Props,
} from '../../../../../hooks/useMappingTableHelpers';

import { AddForm } from './components/add-form';

export const UsdBblTable: FC<Props> = memo(({ Data }) => {
  const {
    headings,
    newMapping,
    handleSortClick,
    handleAddRow,
    handleInputChange,
    handleRemoveAddRow,
  } = useMappingTableHelpers(UsdBblHeadings);

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
          Data.map((ing) => (
            <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
              <T.TD>{ing.entityNm}</T.TD>
              <T.TD>{ing.deskNm}</T.TD>
              <T.TD>{ing.manfSite}</T.TD>
              <T.TD>{ing.buySell}</T.TD>
              <T.TD>{ing.usdBbl}</T.TD>
              <T.TD>{ing.year}</T.TD>
              <T.TD>
                {ing.validFrom && <DateFormat date={ing.validFrom} />}
              </T.TD>
              <T.TD>{ing.validTo && <DateFormat date={ing.validTo} />}</T.TD>
              <T.TD>{ing.loadDate && <DateFormat date={ing.loadDate} />}</T.TD>
              <T.TD>{ing.businessUnit}</T.TD>
              <T.TD>{ing.subDeskNm}</T.TD>
              <T.TD>
                <div>
                  {
                    ACTUAL_PLAN_FLAG_OPTIONS.filter(
                      (el) => el.value === ing.actualPlanFlgUsdBbl
                    )[0]?.label
                  }
                </div>
              </T.TD>
              <T.TD>{ing.planPeriod}</T.TD>
              <T.TD>{ing.cob}</T.TD>
              <T.TD>{ing.leAdj}</T.TD>
              {newMapping && <T.TD></T.TD>}
            </T.TRow>
          ))}
      </T.TBody>
    </T.Table>
  );
});
