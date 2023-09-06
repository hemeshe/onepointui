import { Api } from '../../../helpers/api';
import { newMappingType } from '../../../types/mapping';
import { AuthService } from '../../../helpers/sso/AuthService';
import { sanitizeInput } from '../../../helpers/sanitizeInput';

export const PostReportFreezeMap = async (
  cdata: newMappingType[],
  cob: string,
  mtid: string | number
) => {
  const authService = new AuthService();

  let user = await authService.getUser();
  let token = user?.access_token;
  let trate = cdata.map((c: newMappingType) => {
    return {
      cob: cob,
      year: c.year,
      reportingMonth: c.reportingMonth,
      rptNm: c.rptNm,
      frzDt: c.frzDt,
      frzTme: c.frzTme,
      frzTmeZne: c.frzTmeZne,
      loadDate: sanitizeInput(c.loadDate),
    };
  });
  let formData = {
    dataFile: trate,
    filePath: `ctrptfrztime`, // Azure@Shell
    fileType: Number(mtid),
    overWrite: true,
  };
  try {
    return await fetch(`${Api}/Mapping/AddEdit/ControlFrzTime`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error: any) {
    console.log(error);
  }
};
