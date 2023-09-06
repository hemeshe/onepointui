import { Api } from '../../../helpers/api';

import { IngestionFileDataType } from '../../../types/data-ingestion';
import { AuthService } from '../../../helpers/sso/AuthService';
import { sanitizeInput } from '../../../helpers/sanitizeInput';

export const SaveTaWorkingCapitalConfig = async (
  cdata: IngestionFileDataType[] | undefined,
  cob: string
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  let postData = cdata?.map((d) => {
    return {
      businessUnit: cob,
      entityNm: d.entityNm,
      deskNm: sanitizeInput(d.deskNm),
      subDeskNm: sanitizeInput(d.subDeskNm),
      currency: sanitizeInput(d.currency),
      reportingLine: d.reportingLine,
      pnlDescription: sanitizeInput(d.pnlDescription),
      site: sanitizeInput(d.site),
    };
  });

  return fetch(`${Api}/DataIngestion/Config/WorkingCapital`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};
