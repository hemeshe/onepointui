import React, { FC, Fragment } from 'react';
import NumberFormat from 'react-number-format';

import { IngestionFileDataType } from '../../../../../../types/data-ingestion';

import { DateFormat } from '../../../../../../components/date-format';

import * as T from '../../../../../../components/table';
import { setTdBgColor } from '../../../../helpers/setTdBgColor';

export type Props = {
  ing: IngestionFileDataType;
  errorFieldName: string | undefined;
};

export const Texts: FC<Props> = ({ ing, errorFieldName }) => {
  return (
    <Fragment>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_YEAR')}>
        {ing.ccpnYear}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_QUARTER')}>
        {ing.ccpnQuarter}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_CCPN_FLAG')}>
        {ing.ccpnCcpnFlag}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_SAP_ID')}>
        {ing.ccpnSapId}
      </T.TD>
      <T.TD
        backgroundColor={setTdBgColor(errorFieldName, 'CCPN_SAP_SHORT_NAME')}
      >
        {ing.ccpnSapShortName}
      </T.TD>
      <T.TD backgroundColor={setTdBgColor(errorFieldName, 'CCPN_COMPANY_CODE')}>
        {ing.ccpnCompanyCode}
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
