import React, { FC, memo } from 'react';

import * as T from '../../../../../components/table';

import * as Styled from '../styles';

import { TaWorkingCapitalHeadings } from '../../../constants';

import { Headings } from '../../headings';

import { Inputs } from './components/inputs';
import { Texts } from './components/texts';

import {
  useIngestionTableHelpers,
  Props,
} from '../../../hooks/useIngestionTableHelpers';

export const TaWorkingCapitalTable: FC<Props> = memo(
  ({ ingestionData, errorFieldName }) => {
    const {
      currentSubNav,
      handleSortClick,
      handleRowSelect,
      handleChange,
      headings,
      setCommonDateField,
    } = useIngestionTableHelpers(TaWorkingCapitalHeadings);

    return (
      <T.Table>
        <T.THead>
          <T.TRow borderBottom='1px solid #D9D9D9'>
            {currentSubNav === 'Edit' && <T.TH></T.TH>}
            <Headings headings={headings} handleSortClick={handleSortClick} />
          </T.TRow>
        </T.THead>
        <T.TBody>
          {ingestionData &&
            ingestionData.map((ing, i) => (
              <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
                {currentSubNav === 'Edit' && (
                  <T.TD textAlign='center'>
                    <Styled.Checkbox
                      type='checkbox'
                      aria-label='select check box to edit record'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleRowSelect(e, ing)
                      }
                    />
                  </T.TD>
                )}

                {ing.IsEditable ? (
                  <Inputs
                    ing={ing}
                    handleChange={handleChange}
                    errorFieldName={errorFieldName}
                    setCommonDateField={setCommonDateField}
                  />
                ) : (
                  <Texts {...ing} />
                )}
              </T.TRow>
            ))}
        </T.TBody>
      </T.Table>
    );
  }
);
