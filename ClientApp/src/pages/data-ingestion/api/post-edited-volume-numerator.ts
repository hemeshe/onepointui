import { Api } from "../../../helpers/api";

import { IngestionFileDataType } from "../../../types/data-ingestion";
import { AuthService } from "../../../helpers/sso/AuthService";
import { sanitizeInput } from "../../../helpers/sanitizeInput";

export const PostEditedVolumeNumerator = async (
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
      BUSINESS_UNIT: sanitizeInput(cob),
      COB: sanitizeInput(d.cob),
      ENTITY_NM: sanitizeInput(d.entityNm),
      DESK_NM: sanitizeInput(d.deskNm),
      SUB_DESK_NM: sanitizeInput(d.subDeskNm),
      VOLUME_IG: d.volumeIg ? Number(d.volumeIg) : 0,
      REFINERY: sanitizeInput(d.refinery),
      BUY_SELL: sanitizeInput(d.buySell),
      ACTUAL_PLAN_FLG_IGVOL: d.actualPlanFlgIgvol
        ? Number(d.actualPlanFlgIgvol)
        : 0,
      PLAN_PERIOD: sanitizeInput(d.planPeriod),
    };
  });
  let formData = {
    dataFile: postData,
    filePath: `sttrdallocvolig`, // Azure@shell
    fileType: Number(difid),
    overWrite: true,
  };
  return fetch(`${Api}/DataIngestion/Edit/VolNumerator`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
