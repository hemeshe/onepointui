import React, { FC } from 'react';

import * as T from '../../../../../../../components/table';

import { Button } from '../../../../../../../components/button';

import {
  TIME_ZONE_OPTIONS,
  MONTHS_NAME_OPTION,
  ReportFreezeMapHeadings,
} from '../../../../../constants';

import { DateFormat } from '../../../../../../../components/date-format';

import { Headings } from '../../../../headings';

import {
  useMappingTableHelpers,
  Props,
} from '../../../../../hooks/useMappingTableHelpers';

import { AddForm } from './components/add-form';

export const ReportFreezeMapTable: FC<Props> = ({ Data }) => {
  const {
    headings,
    newMapping,
    handleSortClick,
    handleAddRow,
    handleInputChange,
    handleRemoveAddRow,
  } = useMappingTableHelpers(ReportFreezeMapHeadings);

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
              <T.TD>{ing.cob}</T.TD>
              <T.TD>{ing.year}</T.TD>
              <T.TD>{ing.reportingMonth}</T.TD>
              {/* <T.TD>
                <div>
                  {
                    MONTHS_NAME_OPTION.filter(
                      (el) => el.value === ing.reportingMonth
                    )[0]?.label
                  }
                </div>
              </T.TD> */}
              <T.TD>{ing.rptNm}</T.TD>
              <T.TD>{ing.frzDt && <DateFormat date={ing.frzDt} />}</T.TD>
              <T.TD>{ing.frzTme}</T.TD>
              <T.TD>{ing.frzTmeZne}</T.TD>
              <T.TD>{ing.loadDate && <DateFormat date={ing.loadDate} />}</T.TD>

              {newMapping && <T.TD></T.TD>}
            </T.TRow>
          ))}
      </T.TBody>
    </T.Table>
  );
};
