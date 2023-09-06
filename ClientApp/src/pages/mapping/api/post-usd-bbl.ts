import { Api } from '../../../helpers/api';
import { newMappingType } from '../../../types/mapping';
import { AuthService } from '../../../helpers/sso/AuthService';
import { sanitizeInput } from '../../../helpers/sanitizeInput';

export const PostUsdBbl = async (
  cdata: newMappingType[],
  mtid: string | number,
  cob: string
) => {
  const authService = new AuthService();

  let user = await authService.getUser();
  let token = user?.access_token;
  let trate = cdata.map((c: newMappingType) => {
    return {
      entityNm: c.entityNm,
      deskNm: sanitizeInput(c.deskNm),
      manfSite: sanitizeInput(c.manfSite),
      buySell: c.buySell,
      usdBbl: Number(c.usdBbl),
      year: c.year,
      validFrom: c.validFrom,
      validTo: c.validTo,
      businessUnit: cob,
      subDeskNm: sanitizeInput(c.subDeskNm),
      actualPlanFlgUsdBbl: Number(c.actualPlanFlgUsdBbl),
      planPeriod: sanitizeInput(c.planPeriod),
      cob: sanitizeInput(c.cob),
      leAdj: Number(c.leAdj),
    };
  });
  let formData = {
    dataFile: trate,
    filePath: `sttrdallocusdbbl`, // Azure@Shell
    fileType: Number(mtid),
    overWrite: true,
  };
  try {
    return await fetch(`${Api}/Mapping/AddEdit/UsdBbl`, {
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
