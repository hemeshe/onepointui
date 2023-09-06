import React, { FC, Fragment, useCallback } from 'react';

import { MappingFileDataType } from '../../../../../../types/mapping';

import { ControlledInput } from '../../../../../../components/text-input';
import { DateInput } from '../../../../../../components/date-input';
import { DateFormat } from '../../../../../../components/date-format';

import * as T from '../../../../../../components/table';

import { useSetDateInputs } from '../../../../hooks/useSetDateInputsForEdit';

import { InputProps } from '../../../../helpers/types';

export const Inputs: FC<InputProps> = ({ d, handleChange }) => {
  const { setValidFromDate, setValidToDate, setCommonDateField } =
    useSetDateInputs();

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
      <T.TD>{d.sfsId}</T.TD>
      <T.TD>{d.logicCds}</T.TD>
      <T.TD>{d.statement}</T.TD>
      <T.TD>{d.kpi}</T.TD>
      <T.TD>{d.description}</T.TD>
      <T.TD>{d.subDescription}</T.TD>
      <T.TD>{renderControlInput('scoa')}</T.TD>
      <T.TD>{renderControlInput('multiplier')}</T.TD>
      <T.TD>{renderControlInput('sourceTable')}</T.TD>
      <T.TD>{renderControlInput('sourceField')}</T.TD>
      <T.TD>{renderControlInput('cfWalkFlg')}</T.TD>
      <T.TD>{d.alias_1}</T.TD>
      <T.TD>{renderControlInput('diAl')}</T.TD>
      <T.TD>{d.alias_2}</T.TD>
      <T.TD>
        {d.validFrom && <DateFormat date={d.validFrom} />}
        {/* {setValidFromDate && (
          <DateInput
            selected={new Date(d.validFrom)}
            onChange={(date: Date) => setValidFromDate(date, d.id)}
          />
        )} */}
      </T.TD>
      <T.TD>
        {setValidToDate && (
          <DateInput
            selected={new Date(d.validTo)}
            minDate={new Date(d.validFrom)}
            onChange={(date: Date) => setValidToDate(date, d.id, d.validFrom)}
          />
        )}
      </T.TD>
    </Fragment>
  );
};
