import React, { FC, Fragment } from 'react';

import * as T from '../../../../../../../../components/table';
import { ControlledInput } from '../../../../../../../../components/text-input';
import { DateInput } from '../../../../../../../../components/date-input';

import { useSetDateInputs } from '../../../../../../hooks/useSetDateInputsForAdd';

import * as Styled from './../../styles';

import { AddFormProps } from '../../../../types';

export const AddForm: FC<AddFormProps> = ({
  newMapping,
  handleInputChange,
  handleRemoveAddRow,
}) => {
  const { setValidFromDate, setValidToDate, setCommonDateField } =
    useSetDateInputs();
  return (
    <Fragment>
      {newMapping?.map((ing) => (
        <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
          <T.TD textAlign='center'></T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.sfsId}
              onChange={(e) => handleInputChange(e, ing.id, 'sfsId')}
              name='sfsId'
              placeholder='sfsId'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.logicCds}
              onChange={(e) => handleInputChange(e, ing.id, 'logicCds')}
              name='logicCds'
              placeholder='logicCds'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.statement}
              onChange={(e) => handleInputChange(e, ing.id, 'statement')}
              name='statement'
              placeholder='statement'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.kpi}
              onChange={(e) => handleInputChange(e, ing.id, 'kpi')}
              name='kpi'
              placeholder='kpi'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.description}
              onChange={(e) => handleInputChange(e, ing.id, 'description')}
              name='description'
              placeholder='description'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.subDescription}
              onChange={(e) => handleInputChange(e, ing.id, 'subDescription')}
              name='subDescription'
              placeholder='subDescription'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.scoa}
              onChange={(e) => handleInputChange(e, ing.id, 'scoa')}
              name='scoa'
              placeholder='scoa'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.multiplier}
              onChange={(e) => handleInputChange(e, ing.id, 'multiplier')}
              name='multiplier'
              placeholder='multiplier'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.sourceTable}
              onChange={(e) => handleInputChange(e, ing.id, 'sourceTable')}
              name='sourceTable'
              placeholder='sourceTable'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.sourceField}
              onChange={(e) => handleInputChange(e, ing.id, 'sourceField')}
              name='sourceField'
              placeholder='sourceField'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.cfWalkFlg}
              onChange={(e) => handleInputChange(e, ing.id, 'cfWalkFlg')}
              name='cfWalkFlg'
              placeholder='cfWalkFlg'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.alias_1}
              onChange={(e) => handleInputChange(e, ing.id, 'alias_1')}
              name='alias_1'
              placeholder='alias_1'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.diAl}
              onChange={(e) => handleInputChange(e, ing.id, 'diAl')}
              name='diAl'
              placeholder='diAl'
            />
          </T.TD>
          <T.TD textAlign='center'>
            <ControlledInput
              value={ing.alias_2}
              onChange={(e) => handleInputChange(e, ing.id, 'alias_2')}
              name='alias_2'
              placeholder='alias_2'
            />
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
