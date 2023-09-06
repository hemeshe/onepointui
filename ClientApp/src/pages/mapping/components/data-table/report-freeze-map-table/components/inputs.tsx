import React, { FC, Fragment, useCallback } from 'react';

import { MappingFileDataType } from '../../../../../../types/mapping';

import { ControlledInput } from '../../../../../../components/text-input';
import { DateInput } from '../../../../../../components/date-input';

import * as T from '../../../../../../components/table';
import * as Styled from '../../styles';

import { useSetDateInputs } from '../../../../hooks/useSetDateInputsForEdit';
import { DateFormat } from '../../../../../../components/date-format';
import { TIME_ZONE_OPTIONS } from '../../../../constants';

import { InputProps } from '../../../../helpers/types';

export const Inputs: FC<InputProps> = ({ d, handleChange }) => {
  const { setCommonDateField } = useSetDateInputs();

  const renderControlInput = useCallback(
    (f: keyof MappingFileDataType) => {
      return (
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d[f] as string}
          name={f}
        />
      );
    },
    [d, handleChange]
  );
  return (
    <Fragment>
      <T.TD>{d.cob}</T.TD>
      <T.TD>{d.year}</T.TD>
      <T.TD>{d.reportingMonth}</T.TD>
      <T.TD>{d.rptNm}</T.TD>
      <T.TD>
        <DateInput
          selected={d.frzDt ? new Date(d.frzDt) : null}
          onChange={(date: Date) => setCommonDateField(date, d.id, 'frzDt')}
        />
      </T.TD>
      <T.TD>{renderControlInput('frzTme')}</T.TD>
      <T.TD>
        <Styled.Select
          onChange={(e) => handleChange(e, d.id)}
          value={d.frzTmeZne}
          name='frzTmeZne'
        >
          <Styled.Option value=''>Select</Styled.Option>
          {TIME_ZONE_OPTIONS.map((apf) => (
            <Styled.Option key={apf.value} value={apf.value}>
              {apf.label}
            </Styled.Option>
          ))}
        </Styled.Select>
      </T.TD>
      <T.TD>{d.loadDate && <DateFormat date={d.loadDate} />}</T.TD>
    </Fragment>
  );
};
