import { Api } from '../../../helpers/api';
import { IngestionFileDataType } from '../../../types/data-ingestion';
import { AuthService } from '../../../helpers/sso/AuthService';
import { sanitizeInput } from '../../../helpers/sanitizeInput';

export const PostEditedTaWorkingCapital = async (
  cdata: IngestionFileDataType[] | undefined,
  difid: string | number,
  cob: string
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  let postData = cdata?.map((d) => {
    return {
      REPORTING_DATE: d.reportingDate,
      YEAR: sanitizeInput(d.year),
      QUARTER: sanitizeInput(d.quarter),
      MONTH: sanitizeInput(d.month),
      ENTITY_NM: d.entityNm,
      DESK_NM: sanitizeInput(d.deskNm),
      SUB_DESK_NM: sanitizeInput(d.subDeskNm),
      BUSINESS_UNIT: cob,
      CURRENCY: sanitizeInput(d.currency),
      AMOUNT: d.amount ? Number(d.amount) : 0,
      ACTUAL_PLAN_LE_FLG: d.actualPlanLeFlg ? Number(d.actualPlanLeFlg) : 0,
      REPORTING_LINE: sanitizeInput(d.reportingLine),
      PNL_DESCRIPTION: sanitizeInput(d.pnlDescription),
      SITE: sanitizeInput(d.site),
      LOAD_DATE: sanitizeInput(d.loadDate),
    };
  });
  let formData = {
    dataFile: postData,
    filePath: `sttrdallocwc`, // Azure@shell
    fileType: Number(difid),
    overWrite: true,
  };
  return fetch(`${Api}/DataIngestion/Edit/WorkingCapital`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};
