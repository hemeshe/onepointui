import React, { FC, memo } from 'react';

import * as T from '../../../../../components/table';

import * as Styled from '../styles';

import { SopusHeadings } from '../../../constants';

import { Headings } from '../../headings';

import {
  useIngestionTableHelpers,
  Props,
} from '../../../hooks/useIngestionTableHelpers';

import { Inputs } from './components/inputs';
import { Texts } from './components/texts';

export const SopusTable: FC<Props> = memo(
  ({ ingestionData, errorFieldName }) => {
    const {
      currentSubNav,
      handleSortClick,
      handleRowSelect,
      handleChange,
      headings,
      setReportingDate,
    } = useIngestionTableHelpers(SopusHeadings);

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
            ingestionData.map((ing) => (
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
                    setReportingDate={setReportingDate}
                  />
                ) : (
                  <Texts ing={ing} errorFieldName={errorFieldName} />
                )}
              </T.TRow>
            ))}
        </T.TBody>
      </T.Table>
    );
  }
);
