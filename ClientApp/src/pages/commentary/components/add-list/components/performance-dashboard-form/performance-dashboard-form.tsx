import React, { FC } from 'react';

import Styled from 'styled-components/macro';

import * as CS from '../../../common-styles';

import { SelectInput } from '../../../../components/select-input';
import { Row, BlockCol as Col } from '../../../../../../components/grid';
import { ControlledTextArea } from '../../../../../../components/text-input/controlled-input';
import { Button } from '../../../../../../components/button';
import {
  Pd_Combined_Gp_Tab,
  Pd_Gross_Margin_Tab,
} from '../../../../../../helpers/commentary-tables-constants';

import { usePerformanceDashboardForm } from '../../../../hooks/usePerformanceDashboardFrom';

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

export const PerformanceDashboardForm: FC<Props> = ({
  currentSubNav,
  reportTabName,
}) => {
  const {
    reportingLineOptions,
    gmOptions,
    commercialPeriodOptions,
    reportingLine,
    gm,
    commercialPeriod,
    handleReportingLineChange,
    handleCommercialPeriodChange,
    handleGmChange,
    comment,
    handleCommentChange,
    reportingLineError,
    gmError,
    commercialPeriodError,
    commentError,
    handleSubmit,
    formRef,
  } = usePerformanceDashboardForm();

  const Selects = () => (
    <React.Fragment>
      {reportTabName && reportTabName !== Pd_Combined_Gp_Tab && (
        <Row justifyContentStretch>
          <BlockCol size={12}>
            <SelectInput
              label='Reporting Line'
              options={[
                { id: '0', name: SEL_PLACEHOLDER },
                ...reportingLineOptions,
              ]}
              onChange={handleReportingLineChange}
              error={reportingLineError}
              value={reportingLine}
              ariaLabel='Select Reporting Line'
            />
          </BlockCol>
        </Row>
      )}

      {reportTabName && reportTabName === Pd_Gross_Margin_Tab && (
        <Row justifyContentStretch>
          <BlockCol size={12}>
            <SelectInput
              label='GM'
              options={[{ id: '0', name: SEL_PLACEHOLDER }, ...gmOptions]}
              onChange={handleGmChange}
              error={gmError}
              value={gm}
              ariaLabel='Select GM'
            />
          </BlockCol>
        </Row>
      )}

      <Row justifyContentStretch>
        <BlockCol size={12}>
          <SelectInput
            label='Commercial Period'
            options={[
              { id: '0', name: SEL_PLACEHOLDER },
              ...commercialPeriodOptions,
            ]}
            onChange={handleCommercialPeriodChange}
            error={commercialPeriodError}
            value={commercialPeriod}
            ariaLabel='Select Commercial Period'
          />
        </BlockCol>
      </Row>
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
