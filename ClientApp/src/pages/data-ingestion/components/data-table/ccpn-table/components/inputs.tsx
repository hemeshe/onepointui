import React, { FC, Fragment } from 'react';

import { ControlledInput } from '../../../../../../components/text-input';

import * as T from '../../../../../../components/table';
import { DateInput } from '../../../../../../components/date-input';
import { DateFormat } from '../../../../../../components/date-format';
import { setTdBgColor } from '../../../../helpers/setTdBgColor';

import { InputsProps } from '../../../../helpers/types';

export const Inputs: FC<InputsProps> = ({
  ing,
  errorFieldName,
  handleChange,
  setReportingDate,
}) => {
  return (
    <Fragment>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_YEAR')}>
        {ing.ccpnYear}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.ccpnYear}
          name='ccpnYear'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_QUARTER')}>
        {ing.ccpnQuarter}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.ccpnQuarter}
          name='ccpnQuarter'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_CCPN_FLAG')}>
        {ing.ccpnCcpnFlag}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.businessUnit}
          name='businessUnit'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_SAP_ID')}>
        {ing.ccpnSapId}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.ccpnSapId}
          name='ccpnSapId'
        /> */}
      </T.TD>
      <T.TD
        backgroundColor={setTdBgColor(errorFieldName, 'CCPN_SAP_SHORT_NAME')}
      >
        {ing.ccpnSapShortName}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.ccpnSapShortName}
          name='ccpnSapShortName'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_COMPANY_CODE')}>
        {ing.ccpnCompanyCode}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.ccpnCompanyCode}
          name='ccpnCompanyCode'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_LOAD_DATE')}>
        {ing.ccpnLoadDate && (
          <div style={{ display: 'block', minWidth: 'max-content' }}>
            <DateFormat date={ing.ccpnLoadDate} />
          </div>
        )}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_UPDATED_BY')}>
        {ing.ccpnUpdatedBy}
        {/* <ControlledInput
          onChange={(e) => handleChange(e, ing.id)}
          value={ing.region}
          name='region'
        /> */}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_UPDATED_AT')}>
        {ing.ccpnUpdatedAt && (
          <div style={{ display: 'block', minWidth: 'max-content' }}>
            <DateFormat date={ing.ccpnUpdatedAt} />
          </div>
        )}
      </T.TD>
    </Fragment>
  );
};
