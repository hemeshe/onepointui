import React, { FC } from 'react';
//import { useSelector } from "react-redux";
import Styled from 'styled-components/macro';

import * as CS from '../../../common-styles';

import { SelectInput } from '../../../../components/select-input';
import { Row, BlockCol as Col } from '../../../../../../components/grid';

import { useAddCommentform } from '../../../../hooks/useAddCommentform';

//import { AppStateType } from "../../../../../../store";
import { ControlledTextArea } from '../../../../../../components/text-input/controlled-input';
import { Button } from '../../../../../../components/button';

const SEL_PLACEHOLDER = 'Select a item from the list';
export interface OptionType {
  id: string | number;
  name: string;
}

type Props = {
  label?: string;
  currentSubNav?: string;
};

export const BlockCol = Styled(Col)`
  margin-bottom: 1rem;
`;

export const AddCommentForm: FC<Props> = ({ currentSubNav }) => {
  // const [monthError, setMonthError] = useState<boolean>(false);
  const {
    businessOptions,
    level1TextOptions,
    level2TextOptions,
    level3TextOptions,
    aooOptions,
    pcadOptions,
    // yearOptions,
    business,
    level1Text,
    level2Text,
    level3Text,
    aoo,
    pcad,
    handleBusinessChange,
    handleLevel1TextChange,
    handleLevel2TextChange,
    handleLevel3TextChange,
    handleAooChange,
    handlePcadChange,
    // handleYearChange,
    // handleMonthChange,
    comment,
    handleCommentChange,
    businessError,
    level1TextError,
    level2TextError,
    level3TextError,
    aooError,
    pcadError,
    // yearError,
    commentError,
    handleSubmit,
    formRef,
  } = useAddCommentform();

  // const commentaryState = useSelector(
  //   (state: AppStateType) => state.commentary
  // );

  // const { year, month } = commentaryState;

  const Selects = () => (
    <React.Fragment>
      <Row justifyContentStretch>
        <BlockCol size={12}>
          <SelectInput
            label='Business'
            options={[{ id: '0', name: SEL_PLACEHOLDER }, ...businessOptions]}
            onChange={handleBusinessChange}
            error={businessError}
            value={business}
            ariaLabel='Select Business'
          />
        </BlockCol>
      </Row>

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
      <Row justifyContentStretch>
        <BlockCol size={12}>
          <SelectInput
            label='PCAD'
            options={[{ id: '0', name: SEL_PLACEHOLDER }, ...pcadOptions]}
            onChange={handlePcadChange}
            error={pcadError}
            value={pcad}
            ariaLabel='Select PCAD'
          />
        </BlockCol>
        <BlockCol size={12}>
          <SelectInput
            label='Level 1 Text'
            options={[{ id: '0', name: SEL_PLACEHOLDER }, ...level1TextOptions]}
            onChange={handleLevel1TextChange}
            error={level1TextError}
            value={level1Text}
            ariaLabel='Select Level 1 Text'
          />
        </BlockCol>
      </Row>
      {/* <Row justifyContentStretch>
        <BlockCol size={6}>
          <SelectInput
            label="Year"
            options={[{ id: "0", name: SEL_PLACEHOLDER }, ...yearOptions]}
            onChange={handleYearChange}
            error={yearError}
            value={year}
          />
        </BlockCol>
        <BlockCol size={6} style={{ paddingLeft: 5 }}>
          <SelectInput
            label="Month"
            options={[{ id: "0", name: SEL_PLACEHOLDER }, ...monthArray]}
            onChange={handleMonthChange}
            error={monthError}
            value={month}
          />
        </BlockCol>
      </Row> */}
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
          <BlockCol size={12}>
            <SelectInput
              label='Level 2 Text'
              options={[
                { id: '0', name: SEL_PLACEHOLDER },
                ...level2TextOptions,
              ]}
              onChange={handleLevel2TextChange}
              error={level2TextError}
              value={level2Text}
              ariaLabel='Select Level 2 Text'
            />
          </BlockCol>
          <BlockCol size={12} style={{ paddingLeft: 5 }}>
            <SelectInput
              label='Level 3 Text'
              options={[
                { id: '0', name: SEL_PLACEHOLDER },
                ...level3TextOptions,
              ]}
              onChange={handleLevel3TextChange}
              error={level3TextError}
              value={level3Text}
              ariaLabel='Select Level 3 Text'
            />
          </BlockCol>
          <BlockCol size={12} style={{ paddingLeft: 5, marginTop: '20px' }}>
            <ControlledTextArea
              label='Add Comments (Maximum of 250 characters)'
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
