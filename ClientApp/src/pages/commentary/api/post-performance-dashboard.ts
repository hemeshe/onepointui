import { Api } from '../../../helpers/api';
//import { Fetch } from "../../../helpers/fetch";
//import { CommentaryDataType } from "../../../types/commentary";
import { AuthService } from '../../../helpers/sso/AuthService';
//import { filePath } from "../../../helpers/config";
import { getCurrentDate } from '../../../helpers/date-format';

export const PostPerformanceDashboard = async (
  c: any,
  mtid: string | number,
  month: string | number,
  year: string
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  let data = {
    TAB_NAME: c.tabName ?? '',
    COB: c.cob ?? '',
    COMMENT: c.comment ?? '',
    MONTH: c.month,
    REPORTING_LINE: c.reportingLine ?? '',
    GM: c.gm ?? '',
    COMMERCIAL_PERIOD: c.commercialPeriod ?? '',
    PBI_REPORT_TAB_ID: c.pbiReportTabId ?? '',
    YEAR: c.year ?? '',
    PERIOD: c.period ?? '',
    CREATED_DATE: getCurrentDate(),
    MODIFIED_DATE: getCurrentDate(),
    CREATED_BY: user?.profile.mail,
    MODIFIED_BY: user?.profile.mail,
  };
  let formData = {
    dataFile: [data],
    filePath: `commentstcashflowr1`, // Azure@Shell
    fileType: Number(mtid),
    overWrite: true,
    month: month,
    year: year,
  };
  console.log(JSON.stringify(formData));
  return await fetch(`${Api}/Commentary/AddEdit/CashFlowPerformance`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};
