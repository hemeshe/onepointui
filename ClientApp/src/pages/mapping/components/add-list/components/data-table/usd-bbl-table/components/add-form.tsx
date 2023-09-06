import React, { FC, Fragment, useMemo } from 'react';

import * as T from '../../../../../../../../components/table';
import { ControlledInput } from '../../../../../../../../components/text-input';
import { DateInput } from '../../../../../../../../components/date-input';

import { useSetDateInputs } from '../../../../../../hooks/useSetDateInputsForAdd';

import * as Styled from './../../styles';

import { range } from '../../../../../../../../helpers/range';

import { ACTUAL_PLAN_FLAG_OPTIONS } from '../../../../../../constants';

import { AddFormProps } from '../../../../types';

export const AddForm: FC<AddFormProps> = ({
  newMapping,
  handleInputChange,
  handleRemoveAddRow,
}) => {
  const { setValidFromDate, setValidToDate } = useSetDateInputs();
  const years = useMemo(() => range(2010, 2100, 1), []);
  return (
    <Fragment>
      {newMapping?.map((ing) => (
        <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.entityNm}
              onChange={(e) => handleInputChange(e, ing.id, 'entityNm')}
              name='entityNm'
              placeholder='Entity Name'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.deskNm}
              onChange={(e) => handleInputChange(e, ing.id, 'deskNm')}
              name='deskNm'
              placeholder='Desk Name'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.manfSite}
              onChange={(e) => handleInputChange(e, ing.id, 'manfSite')}
              name='manfSite'
              placeholder='manf. Site'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <Styled.Select
              onChange={(e) => handleInputChange(e, ing.id, 'buySell')}
              value={ing.buySell}
              name='buySell'
            >
              <Styled.Option value=''>Select</Styled.Option>
              <Styled.Option value='B'>B (Buy)</Styled.Option>
              <Styled.Option value='S'>S (Sell)</Styled.Option>
            </Styled.Select>
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.usdBbl}
              onChange={(e) => handleInputChange(e, ing.id, 'usdBbl')}
              name='usdBbl'
              placeholder='usdBbl'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <Styled.Select
              onChange={(e) => handleInputChange(e, ing.id, 'year')}
              value={ing.year}
              name='year'
            >
              <Styled.Option value=''>Select</Styled.Option>
              {years.map((y) => (
                <Styled.Option key={y} value={y}>
                  {y}
                </Styled.Option>
              ))}
            </Styled.Select>
          </T.TD>
          <T.TD textAlign='center'>
            <DateInput
              selected={ing.validFrom ? new Date(ing.validFrom) : null}
              onChange={(date: Date) => {
                const offsetDate = new Date(
                  date.getTime() - date.getTimezoneOffset() * 60000
                );
                setValidFromDate(offsetDate, ing.id);
              }}
            />
          </T.TD>
          <T.TD textAlign='center'>
            <DateInput
              selected={ing.validTo ? new Date(ing.validTo) : null}
              minDate={new Date(ing.validFrom)}
              onChange={(date: Date) => {
                const offsetDate = new Date(
                  date.getTime() - date.getTimezoneOffset() * 60000
                );
                setValidToDate(offsetDate, ing.id, ing.validFrom);
              }}
            />
          </T.TD>
          <T.TD textAlign='center'></T.TD>
          <T.TD textAlign='center'>
            {/* <ControlledInput
              value={ing.businessUnit}
              onChange={(e) => handleInputChange(e, ing.id, 'businessUnit')}
              name='businessUnit'
              placeholder='businessUnit'
            /> */}
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.subDeskNm}
              onChange={(e) => handleInputChange(e, ing.id, 'subDeskNm')}
              name='subDeskNm'
              placeholder='subDeskNm'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <Styled.Select
              value={ing.actualPlanFlgUsdBbl}
              onChange={(e) =>
                handleInputChange(e, ing.id, 'actualPlanFlgUsdBbl')
              }
              name='actualPlanFlgUsdBbl'
              placeholder='actualPlanFlgUsdBbl'
            >
              <Styled.Option value=''>Select</Styled.Option>
              {ACTUAL_PLAN_FLAG_OPTIONS.map((apf) => (
                <Styled.Option key={apf.value} value={apf.value}>
                  {apf.label}
                </Styled.Option>
              ))}
            </Styled.Select>
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.planPeriod}
              onChange={(e) => handleInputChange(e, ing.id, 'planPeriod')}
              name='planPeriod'
              placeholder='planPeriod'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.cob}
              onChange={(e) => handleInputChange(e, ing.id, 'cob')}
              name='cob'
              placeholder='cob'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.leAdj}
              onChange={(e) => handleInputChange(e, ing.id, 'leAdj')}
              name='leAdj'
              placeholder='leAdj'
            />
          </T.TD>

          <T.TD>
            <Styled.RemoveAddInput onClick={() => handleRemoveAddRow(ing)}>
              X
            </Styled.RemoveAddInput>
          </T.TD>
        </T.TRow>
      ))}
    </Fragment>
  );
};
