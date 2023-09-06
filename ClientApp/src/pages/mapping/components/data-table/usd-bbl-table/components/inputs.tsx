import React, { FC, Fragment } from 'react';

import { ControlledInput } from '../../../../../../components/text-input';
import { DateInput } from '../../../../../../components/date-input';

import * as T from '../../../../../../components/table';

import { DateFormat } from '../../../../../../components/date-format';

import { InputProps } from '../../../../helpers/types';

import * as Styled from '../../styles';

import { ACTUAL_PLAN_FLAG_OPTIONS } from '../../../../constants';
import { years } from '../../../../../../helpers/years';

export const Inputs: FC<InputProps> = ({
  d,
  handleChange,
  setValidFromDate,
  setValidToDate,
}) => {
  return (
    <Fragment>
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
      <T.TD style={{ minWidth: '200px' }}>
        {d.manfSite}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.manfSite}
          name='manfSite'
        /> */}
      </T.TD>
      <T.TD>
        {d.buySell}
        {/* <Styled.Select
          onChange={(e) => handleChange(e, d.id)}
          value={d.buySell}
          name='buySell'
        >
          <Styled.Option value=''>Select</Styled.Option>
          <Styled.Option value='B'>B (Buy)</Styled.Option>
          <Styled.Option value='S'>S (Sell)</Styled.Option>
        </Styled.Select> */}
      </T.TD>
      <T.TD>
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.usdBbl}
          name='usdBbl'
        />
      </T.TD>
      <T.TD>
        {d.year}
        {/* <Styled.Select
          onChange={(e) => handleChange(e, d.id)}
          value={d.year}
          name='year'
        >
          <Styled.Option value=''>Select</Styled.Option>
          {years?.map((y) => (
            <Styled.Option key={y} value={y}>
              {y}
            </Styled.Option>
          ))}
        </Styled.Select> */}
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
      <T.TD>
        {d.subDeskNm}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.subDeskNm}
          name='subDeskNm'
        /> */}
      </T.TD>
      <T.TD>
        {
          <div>
            {
              ACTUAL_PLAN_FLAG_OPTIONS.filter(
                (el) => el.value === d.actualPlanFlgUsdBbl
              )[0]?.label
            }
          </div>
        }
        {/* <Styled.Select
          onChange={(e) => handleChange(e, d.id)}
          value={d.actualPlanFlgUsdBbl}
          name='actualPlanFlgUsdBbl'
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
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.planPeriod}
          name='planPeriod'
        />
      </T.TD>
      <T.TD>
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.cob}
          name='cob'
        />
      </T.TD>
      <T.TD>
        <ControlledInput
          onChange={(e) => handleChange(e, d.id)}
          value={d.leAdj}
          name='leAdj'
        />
      </T.TD>
    </Fragment>
  );
};
