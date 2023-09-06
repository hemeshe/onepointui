import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Styled from 'styled-components/macro';

import { SelectInput } from '../../components/select-input';
import { Row, BlockCol as Col } from '../../../../components/grid';

import { useCommetaryform } from './useCommetaryform';

import { AppStateType } from '../../../../store';
import { monthArray } from '../../../../helpers/month';

const SEL_PLACEHOLDER = 'Select a item from the list';

export interface OptionType {
  id: string | number;
  name: string;
}

type Props = {
  label?: string;
  // classOfBusiness: OptionType[] | null;
  // subSection1: OptionType[] | null;
  // subSection2: OptionType[] | null;
  // dashBoard: OptionType[] | null;
  // years: OptionType[] | null;
  // handleCobChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleSubSection1Change?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleSubSection2Change?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleDashboardChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleYearChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleMonthChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // cobError: string;
  // subSection1Error: string;
  // subSection2Error: string;
  // dashBoardError: string;
  // yearError: string;
  // monthError: string;
  currentSubNav?: string;
};

export const BlockCol = Styled(Col)`
  margin-bottom: 1rem;
`;

export const CommentaryForm: FC<Props> = ({ currentSubNav }) => {
  const {
    classOfBusinessOptions,
    subSection1Options,
    subSection2Options,
    dashBoardOptions,
    yearOptions,
    classOfBusiness,
    subSection1,
    subSection2,
    dashBoard,
    year,
    handleCobChange,
    handleSubSection1Change,
    handleSubSection2Change,
    handleDashboardChange,
    handleYearChange,
    handleMonthChange,
  } = useCommetaryform();

  const commentaryState = useSelector(
    (state: AppStateType) => state.commentary
  );

  const {
    cobError,
    subSection1Error,
    subSection2Error,
    dashBoardError,
    yearError,
    monthError,
  } = commentaryState;
  return (
    <React.Fragment>
      <Row justifyContentStretch>
        <BlockCol size={6}>
          <SelectInput
            label='Class Of Business'
            options={[
              { id: '0', name: SEL_PLACEHOLDER },
              ...classOfBusinessOptions,
            ]}
            onChange={handleCobChange}
            error={cobError}
            ariaLabel='Select Class of Business'
          />
        </BlockCol>

        <BlockCol size={6}>
          <SelectInput
            label='Sub section 1'
            options={[
              { id: '0', name: SEL_PLACEHOLDER },
              ...subSection1Options,
            ]}
            onChange={handleSubSection1Change}
            error={subSection1Error}
            ariaLabel='Select Sub section 1'
          />
        </BlockCol>
      </Row>

      <Row justifyContentStretch>
        <BlockCol size={6}>
          <SelectInput
            label='Sub section 2'
            options={[
              { id: '0', name: SEL_PLACEHOLDER },
              ...subSection2Options,
            ]}
            onChange={handleSubSection2Change}
            error={subSection2Error}
            ariaLabel='Select Sub section 2'
          />
        </BlockCol>

        <BlockCol size={6}>
          <SelectInput
            label='Dashboard'
            options={[{ id: '0', name: SEL_PLACEHOLDER }, ...dashBoardOptions]}
            onChange={handleDashboardChange}
            error={dashBoardError}
            ariaLabel='Select Dashboard'
          />
        </BlockCol>
      </Row>
      {currentSubNav !== 'Configure' && (
        <Row justifyContentStretch>
          <BlockCol size={6}>
            <SelectInput
              label='Year'
              options={[{ id: '0', name: SEL_PLACEHOLDER }, ...yearOptions]}
              onChange={handleYearChange}
              error={yearError}
              ariaLabel='Select Year'
            />
          </BlockCol>
          <BlockCol size={6} style={{ paddingLeft: 5 }}>
            <SelectInput
              label='Month'
              options={[{ id: '0', name: SEL_PLACEHOLDER }, ...monthArray]}
              onChange={handleMonthChange}
              error={monthError}
              ariaLabel='Select Month'
            />
          </BlockCol>
        </Row>
      )}
    </React.Fragment>
  );
};
