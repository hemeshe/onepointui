import { Api } from "../../../helpers/api";
import { IngestionFileDataType } from "../../../types/data-ingestion";
import { AuthService } from "../../../helpers/sso/AuthService";
import { sanitizeInput } from "../../../helpers/sanitizeInput";

export const SaveVolumeNumeratorConfig = async (
  cdata: IngestionFileDataType[] | undefined,
  cob: string
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  let postData = cdata?.map((d) => {
    return {
      businessUnit: cob,
      cob: sanitizeInput(d.cob),
      entityNm: sanitizeInput(d.entityNm),
      deskNm: sanitizeInput(d.deskNm),
      subDeskNm: sanitizeInput(d.subDeskNm),
      refinery: sanitizeInput(d.refinery),
      planPeriod: sanitizeInput(d.planPeriod),
    };
  });
  return fetch(`${Api}/DataIngestion/Config/VolNumerator`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
