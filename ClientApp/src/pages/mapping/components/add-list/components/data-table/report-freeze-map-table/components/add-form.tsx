import React, { FC, Fragment } from 'react';

import * as T from '../../../../../../../../components/table';
import { ControlledInput } from '../../../../../../../../components/text-input';
import { DateInput } from '../../../../../../../../components/date-input';

import { useSetDateInputs } from '../../../../../../hooks/useSetDateInputsForAdd';

import * as Styled from './../../styles';

import { AddFormProps } from '../../../../types';

import {
  TIME_ZONE_OPTIONS,
  MONTHS_NAME_OPTION,
} from '../../../../../../constants';

export const AddForm: FC<AddFormProps> = ({
  newMapping,
  handleInputChange,
  handleRemoveAddRow,
}) => {
  const { setCommonDateField } = useSetDateInputs();
  return (
    <Fragment>
      {newMapping?.map((ing) => (
        <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
          <T.TD textAlign='center'></T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.year}
              onChange={(e) => handleInputChange(e, ing.id, 'year')}
              name='year'
              placeholder='year'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <Styled.Select
              value={ing.reportingMonth}
              onChange={(e) => handleInputChange(e, ing.id, 'reportingMonth')}
              name='reportingMonth'
              placeholder='reportingMonth'
            >
              <Styled.Option value=''>Select</Styled.Option>
              {MONTHS_NAME_OPTION.map((apf) => (
                <Styled.Option key={apf.value} value={apf.value}>
                  {apf.label}
                </Styled.Option>
              ))}
            </Styled.Select>
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.rptNm}
              onChange={(e) => handleInputChange(e, ing.id, 'rptNm')}
              name='rptNm'
              placeholder='rptNm'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <DateInput
              selected={ing.frzDt ? new Date(ing.frzDt) : null}
              onChange={(date: Date) => {
                const offsetDate = new Date(
                  date.getTime() - date.getTimezoneOffset() * 60000
                );
                setCommonDateField(offsetDate, ing.id, 'frzDt');
              }}
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.frzTme}
              onChange={(e) => handleInputChange(e, ing.id, 'frzTme')}
              name='frzTme'
              placeholder='HH:MM:SS 24H'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <Styled.Select
              value={ing.frzTmeZne}
              onChange={(e) => handleInputChange(e, ing.id, 'frzTmeZne')}
              name='frzTmeZne'
              placeholder='frzTmeZne'
            >
              <Styled.Option value=''>Select</Styled.Option>
              {TIME_ZONE_OPTIONS.map((apf) => (
                <Styled.Option key={apf.value} value={apf.value}>
                  {apf.label}
                </Styled.Option>
              ))}
            </Styled.Select>
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
