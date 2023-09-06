import { Api } from "../../../helpers/api";
import { newMappingType } from "../../../types/mapping";
import { AuthService } from "../../../helpers/sso/AuthService";
import { sanitizeInput } from "../../../helpers/sanitizeInput";

export const PostMethodMap = async (
  cdata: newMappingType[],
  mtid: string | number,
  cob: string
) => {
  const authService = new AuthService();

  let user = await authService.getUser();
  let token = user?.access_token;
  let trate = cdata.map((c: newMappingType) => {
    return {
      reportingLine: c.reportingLine,
      entityNm: c.entityNm,
      deskNm: sanitizeInput(c.deskNm),
      subDeskNm: sanitizeInput(c.subDeskNm),
      formula: sanitizeInput(c.formula),
      method: c.method,
      methodDesc: sanitizeInput(c.methodDesc),
      cob: c.cob,
      site: sanitizeInput(c.site),
      allocation: c.allocation ? Number(c.allocation) : 0,
      scaleFactor: c.scaleFactor ? Number(c.scaleFactor) : 0,
      actualPlanFlg: Number(c.actualPlanFlg),
      negAdminMarginFlg: c.negAdminMarginFlg ?? false,
      validFrom: c.validFrom,
      validTo: c.validTo,
      businessUnit: cob,
    };
  });
  let formData = {
    dataFile: trate,
    filePath: `sttrdallocmethodmap`, // Azure@Shell
    fileType: Number(mtid),
    overWrite: true,
  };
  try {
    return await fetch(`${Api}/Mapping/AddEdit/MethodMap`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error: any) {
    console.log(error);
  }
};
