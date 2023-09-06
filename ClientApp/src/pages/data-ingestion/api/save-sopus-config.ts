import { Api } from "../../../helpers/api";

import { IngestionFileDataType } from "../../../types/data-ingestion";
import { AuthService } from "../../../helpers/sso/AuthService";
import { sanitizeInput } from "../../../helpers/sanitizeInput";

export const SaveSopusConfig = async (
  cdata: IngestionFileDataType[] | undefined,
  cob: string
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  let postData = cdata?.map((d) => {
    return {
      //cob: cob,
      businessUnit: cob,
      pnlDescription: sanitizeInput(d.pnlDescription),
      entityNm: sanitizeInput(d.entityNm),
      deskNm: sanitizeInput(d.deskNm),
      region: sanitizeInput(d.region),
      planPeriod: sanitizeInput(d.planPeriod),
      subDeskNm: sanitizeInput(d.subDeskNm),
    };
  });

  return fetch(`${Api}/DataIngestion/Config/SopusO1F`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
