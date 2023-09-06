import React, { FC, Fragment } from 'react';

import * as T from '../../../../../../../../components/table';
import { ControlledInput } from '../../../../../../../../components/text-input';
import { DateInput } from '../../../../../../../../components/date-input';

import { useSetDateInputs } from '../../../../../../hooks/useSetDateInputsForAdd';

import * as Styled from './../../styles';

import { AddFormProps } from '../../../../types';

import { ACTUAL_PLAN_FLAG_OPTIONS } from '../../../../../../constants';

export const AddForm: FC<AddFormProps> = ({
  newMapping,
  handleInputChange,
  handleRemoveAddRow,
}) => {
  const { setValidFromDate, setValidToDate } = useSetDateInputs();
  return (
    <Fragment>
      {newMapping?.map((ing) => (
        <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.reportingLine}
              onChange={(e) => handleInputChange(e, ing.id, 'reportingLine')}
              name='reportingLine'
              placeholder='reportingLine'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.entityNm}
              onChange={(e) => handleInputChange(e, ing.id, 'entityNm')}
              name='entityNm'
              placeholder='entityNm'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.deskNm}
              onChange={(e) => handleInputChange(e, ing.id, 'deskNm')}
              name='deskNm'
              placeholder='deskNm'
            />
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
            <ControlledInput
              value={ing.formula}
              onChange={(e) => handleInputChange(e, ing.id, 'formula')}
              name='formula'
              placeholder='formula'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.method}
              onChange={(e) => handleInputChange(e, ing.id, 'method')}
              name='method'
              placeholder='method'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.methodDesc}
              onChange={(e) => handleInputChange(e, ing.id, 'methodDesc')}
              name='methodDesc'
              placeholder='methodDesc'
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
              value={ing.site}
              onChange={(e) => handleInputChange(e, ing.id, 'site')}
              name='site'
              placeholder='site'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.allocation}
              onChange={(e) => handleInputChange(e, ing.id, 'allocation')}
              name='allocation'
              placeholder='allocation'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.scaleFactor}
              onChange={(e) => handleInputChange(e, ing.id, 'scaleFactor')}
              name='scaleFactor'
              placeholder='scaleFactor'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <Styled.Select
              value={ing.actualPlanFlg}
              onChange={(e) => handleInputChange(e, ing.id, 'actualPlanFlg')}
              name='actualPlanFlg'
              placeholder='actualPlanFlg'
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
            <Styled.Select
              value={ing.negAdminMarginFlg}
              onChange={(e) =>
                handleInputChange(e, ing.id, 'negAdminMarginFlg')
              }
              name='negAdminMarginFlg'
              placeholder='negAdminMarginFlg'
            >
              <Styled.Option value=''>Select</Styled.Option>
              <Styled.Option value='true'>Yes</Styled.Option>
              <Styled.Option value='false'>No</Styled.Option>
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
          <T.TD textAlign='center'>
            {/* <ControlledInput
             value={ing.loadDate}
             onChange={(e) => handleInputChange(e, ing.id, "loadDate")}
             name="loadDate"
             placeholder="loadDate"
           /> */}
          </T.TD>
          <T.TD textAlign='center'>
            {/* <ControlledInput
              value={ing.businessUnit}
              onChange={(e) => handleInputChange(e, ing.id, 'businessUnit')}
              name='businessUnit'
              placeholder='businessUnit'
            /> */}
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
