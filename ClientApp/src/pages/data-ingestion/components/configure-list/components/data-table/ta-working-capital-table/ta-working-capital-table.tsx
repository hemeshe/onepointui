import React, { FC, memo } from 'react';

import * as T from '../../../../../../../components/table';

import { Button } from '../../../../../../../components/button';

import { TaWorkingCapitalHeadings } from '../../../../../config-headings';
import { Headings } from '../../../../headings';
import {
  useIngestionTableHelpers,
  Props,
} from '../../../../../hooks/useIngestionTableHelpers';

import { Inputs } from './components/Inputs';
import { Texts } from './components/Texts';

export const TaWorkingCapitalTable: FC<Props> = memo(
  ({ ingestionData, errorFieldName }) => {
    const {
      headings,
      handleSortClick,
      handleAddRow,
      handleInputChange,
      handleRemoveAddRow,
      newIngestion,
    } = useIngestionTableHelpers(TaWorkingCapitalHeadings);

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
          {newIngestion && (
            <Inputs
              handleInputChange={handleInputChange}
              handleRemoveAddRow={handleRemoveAddRow}
              newIngestion={newIngestion}
            />
          )}

          {ingestionData &&
            Array.isArray(ingestionData) &&
            ingestionData.length > 0 && (
              <Texts
                ingestionData={ingestionData}
                errorFieldName={errorFieldName}
                newIngestion={newIngestion}
              />
            )}
        </T.TBody>
      </T.Table>
    );
  }
);
