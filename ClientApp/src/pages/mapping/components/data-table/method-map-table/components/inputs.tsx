import React, { FC, Fragment } from 'react';

import * as Styled from '../../styles';

import { ControlledInput } from '../../../../../../components/text-input';
import { DateInput } from '../../../../../../components/date-input';

import * as T from '../../../../../../components/table';

import { DateFormat } from '../../../../../../components/date-format';

import { InputProps } from '../../../../helpers/types';
import { ACTUAL_PLAN_FLAG_OPTIONS } from '../../../../constants';

export const Inputs: FC<InputProps> = ({
  d,
  handleChange,
  setValidFromDate,
  setValidToDate,
}) => {
  return (
    <Fragment>
      <T.TD>{d.reportingLine}</T.TD>
      <T.TD>
        {d.entityNm}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.entityNm}
          name='entityNm'
        /> */}
      </T.TD>
      <T.TD>
        {d.deskNm}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.deskNm}
          name='deskNm'
        /> */}
      </T.TD>
      <T.TD>
        {d.subDeskNm}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.subDeskNm}
          name='subDeskNm'
        /> */}
      </T.TD>
      <T.TD style={{ minWidth: '200px' }}>
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.formula}
          name='formula'
        />
      </T.TD>
      <T.TD>
        {d.method}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.method}
          name='method'
        /> */}
      </T.TD>
      <T.TD>
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.methodDesc}
          name='methodDesc'
        />
      </T.TD>
      <T.TD>
        {d.cob}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.cob}
          name='cob'
        /> */}
      </T.TD>
      <T.TD>
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.site}
          name='site'
        />
      </T.TD>
      <T.TD>
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.allocation}
          name='allocation'
        />
      </T.TD>
      <T.TD>
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.scaleFactor}
          name='scaleFactor'
        />
      </T.TD>
      <T.TD>
        {
          <div>
            {
              ACTUAL_PLAN_FLAG_OPTIONS.filter(
                (el) => el.value === d.actualPlanFlg
              )[0]?.label
            }
          </div>
        }
        {/* <Styled.Select
          onChange={(e) => handleChange(e, d.id)}
          value={d.actualPlanFlg}
          name='actualPlanFlg'
        >
          <Styled.Option value=''>Select</Styled.Option>
          {ACTUAL_PLAN_FLAG_OPTIONS.map((apf) => (
            <Styled.Option key={apf.value} value={apf.value}>
              {apf.label}
            </Styled.Option>
          ))}
        </Styled.Select> */}
      </T.TD>
      <T.TD>
        <Styled.Select
          onChange={(e) => handleChange(e, d.id)}
          value={d.negAdminMarginFlg}
          name='negAdminMarginFlg'
        >
          <Styled.Option value=''>Select</Styled.Option>
          <Styled.Option value='true'>Yes</Styled.Option>
          <Styled.Option value='false'>No</Styled.Option>
        </Styled.Select>
      </T.TD>
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
      <T.TD>{d.loadDate && <DateFormat date={d.loadDate} />}</T.TD>
      <T.TD>
        {d.businessUnit}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.businessUnit}
          name='businessUnit'
        /> */}
      </T.TD>
    </Fragment>
  );
};
