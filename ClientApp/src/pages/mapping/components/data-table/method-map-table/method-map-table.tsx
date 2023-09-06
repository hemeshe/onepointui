import React, { FC } from 'react';

import * as T from '../../../../../components/table';
import * as Styled from '../styles';

import { MethodMapHeadings } from '../../../constants';

import { Headings } from '../../headings';

import {
  useMappingTableHelpers,
  Props,
} from '../../../hooks/useMappingTableHelpers';
import { Inputs } from './components/inputs';
import { Texts } from './components/texts';

export const MethodMapTable: FC<Props> = ({ Data }) => {
  const {
    currentSubNav,
    headings,
    setValidFromDate,
    setValidToDate,
    handleSortClick,
    handleRowSelect,
    handleChange,
  } = useMappingTableHelpers(MethodMapHeadings);
  return (
    <T.Table>
      <T.THead>
        <T.TRow borderBottom='1px solid #D9D9D9'>
          {currentSubNav === 'Edit' && <T.TH></T.TH>}
          <Headings headings={headings} handleSortClick={handleSortClick} />
        </T.TRow>
      </T.THead>
      <T.TBody>
        {Data &&
          Data.map((d) => (
            <T.TRow key={d.id} borderBottom='1px solid #D9D9D9'>
              {currentSubNav === 'Edit' && (
                <T.TD textAlign='center'>
                  <Styled.Checkbox
                    type='checkbox'
                    aria-label='select check box to edit record'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleRowSelect(e, d)
                    }
                  />
                </T.TD>
              )}
              {d.IsEditable ? (
                <Inputs
                  d={d}
                  handleChange={handleChange}
                  setValidFromDate={setValidFromDate}
                  setValidToDate={setValidToDate}
                />
              ) : (
                <Texts {...d} />
              )}
            </T.TRow>
          ))}
      </T.TBody>
    </T.Table>
  );
};
