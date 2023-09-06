import { Api } from '../../../helpers/api';
//import { Fetch } from "../../../helpers/fetch";
//import { CommentaryDataType } from "../../../types/commentary";
import { AuthService } from '../../../helpers/sso/AuthService';
//import { filePath } from "../../../helpers/config";

export const PostCapEmplR1Comment = async (
  c: any,
  mtid: string | number,
  month: string | number,
  year: string
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  let data = {
    AOO: c.aoo ?? '',
    BUSINESS: c.business ?? '',
    COB: c.cob ?? '',
    COMMENT: c.comment ?? '',
    LEVEL_1_TEXT: c.level1Text ?? '',
    LEVEL_2_TEXT: c.level2Text ?? '',
    LEVEL_3_TEXT: c.level3Text ?? '',
    MONTH: Number(c.month),
    PBI_REPORT_TAB_ID: c.pbiReportTabId ?? '',
    PCAD: c.pcad ?? '',
    YEAR: c.year ?? '',
  };
  let formData = {
    dataFile: [data],
    filePath: `commentstcapitalemployedr1`, // Azure@Shell
    fileType: Number(mtid),
    overWrite: true,
    month: month,
    year: year,
  };
  console.log(JSON.stringify(formData));
  return await fetch(`${Api}/Commentary/AddEdit/CapitalEmpR1`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};
