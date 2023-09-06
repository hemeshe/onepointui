import React, { FC } from 'react';

import Styled from 'styled-components/macro';

import * as CS from '../../../common-styles';

import { SelectInput } from '../../../../components/select-input';
import { Row, BlockCol as Col } from '../../../../../../components/grid';
import { ControlledTextArea } from '../../../../../../components/text-input/controlled-input';
import { Button } from '../../../../../../components/button';
import {
  Fr_Odc_Tab,
  Fr_Erp_R1_Tab,
} from '../../../../../../helpers/commentary-tables-constants';

import { useFinanceReportForm } from '../../../../hooks/useFinanceReportForm';

const SEL_PLACEHOLDER = 'Select a item from the list';
export interface OptionType {
  id: string | number;
  name: string;
}

type Props = {
  label?: string;
  currentSubNav?: string;
  reportTabName?: string;
};

export const BlockCol = Styled(Col)`
  margin-bottom: 1rem;
`;

export const FinanceReportForm: FC<Props> = ({
  currentSubNav,
  reportTabName,
}) => {
  const {
    aooOptions,
    scoaOptions,
    categoryOptions,
    comparisonPeriodOptions,
    aoo,
    scoa,
    category,
    comparisonPeriod,
    handleAooChange,
    handleScoaChange,
    handleComparisonPeriodChange,
    handleCategoryChange,
    comment,
    handleCommentChange,
    aooError,
    scoaError,
    categoryError,
    comparisonPeriodError,
    commentError,
    handleSubmit,
    formRef,
  } = useFinanceReportForm();

  const Selects = () => (
    <React.Fragment>
      <Row justifyContentStretch>
        <BlockCol size={12}>
          <SelectInput
            label='AOO'
            options={[{ id: '0', name: SEL_PLACEHOLDER }, ...aooOptions]}
            onChange={handleAooChange}
            error={aooError}
            value={aoo}
            ariaLabel='Select AOO'
          />
        </BlockCol>
      </Row>

      {reportTabName && reportTabName === Fr_Erp_R1_Tab && (
        <Row justifyContentStretch>
          <BlockCol size={12}>
            <SelectInput
              label='SCOA'
              options={[{ id: '0', name: SEL_PLACEHOLDER }, ...scoaOptions]}
              onChange={handleScoaChange}
              error={scoaError}
              value={scoa}
              ariaLabel='Select SCOA'
            />
          </BlockCol>
        </Row>
      )}

      {reportTabName && reportTabName === Fr_Odc_Tab && (
        <Row justifyContentStretch>
          <BlockCol size={12}>
            <SelectInput
              label='Category'
              options={[{ id: '0', name: SEL_PLACEHOLDER }, ...categoryOptions]}
              onChange={handleCategoryChange}
              error={categoryError}
              value={category}
              ariaLabel='Select Category'
            />
          </BlockCol>
        </Row>
      )}

      {reportTabName && reportTabName !== Fr_Erp_R1_Tab && (
        <Row justifyContentStretch>
          <BlockCol size={12}>
            <SelectInput
              label='Comparison Period'
              options={[
                { id: '0', name: SEL_PLACEHOLDER },
                ...comparisonPeriodOptions,
              ]}
              onChange={handleComparisonPeriodChange}
              error={comparisonPeriodError}
              value={comparisonPeriod}
              ariaLabel='Select Comparison Period'
            />
          </BlockCol>
        </Row>
      )}
    </React.Fragment>
  );

  return (
    <CS.Form ref={formRef}>
      <CS.Row style={{ borderRight: '1px solid #595959' }}>
        <CS.RowContent>
          <Selects />
        </CS.RowContent>
      </CS.Row>

      <CS.Row>
        <CS.RowContent>
          <BlockCol size={12} style={{ paddingLeft: 5, marginTop: '20px' }}>
            <ControlledTextArea
              label='Add Comments (Maximum of 1000 characters)'
              placeholder='Enter your comment here'
              backgroundColor='white'
              value={comment}
              onChange={handleCommentChange}
              error={commentError}
              style={{ height: '80px' }}
            />
          </BlockCol>
          <BlockCol size={12} style={{ paddingLeft: 5 }}>
            <Button
              primary
              size='block'
              label='Submit'
              style={{ marginTop: '10px' }}
              onClick={handleSubmit}
            />
          </BlockCol>
        </CS.RowContent>
      </CS.Row>
    </CS.Form>
  );
};
