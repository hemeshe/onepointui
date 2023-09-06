import { Api } from '../../../helpers/api';
import { newMappingType } from '../../../types/mapping';
import { AuthService } from '../../../helpers/sso/AuthService';
import { sanitizeInput } from '../../../helpers/sanitizeInput';

export const PostLeSfsCodes = async (
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
      sfsId: sanitizeInput(c.sfsId),
      logicCds: sanitizeInput(c.logicCds),
      statement: sanitizeInput(c.statement),
      kpi: sanitizeInput(c.kpi),
      description: sanitizeInput(c.description),
      subDescription: sanitizeInput(c.subDescription),
      scoa: sanitizeInput(c.scoa),
      multiplier: sanitizeInput(c.multiplier),
      sourceTable: sanitizeInput(c.sourceTable),
      sourceField: sanitizeInput(c.sourceField),
      cfWalkFlg: sanitizeInput(c.cfWalkFlg),
      alias_1: sanitizeInput(c.alias_1),
      diAl: sanitizeInput(c.diAl),
      alias_2: sanitizeInput(c.alias_2),
      validFrom: c.validFrom,
      validTo: c.validTo,
    };
  });
  let formData = {
    dataFile: trate,
    filePath: `stforecastcfsfscodes`, // Azure@Shell
    fileType: Number(mtid),
    overWrite: true,
  };
  try {
    return await fetch(`${Api}/Mapping/AddEdit/LeSfsCode`, {
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
