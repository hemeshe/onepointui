import { Api } from "../../../helpers/api";
import { IngestionFileDataType } from "../../../types/data-ingestion";
import { AuthService } from "../../../helpers/sso/AuthService";
import { sanitizeInput } from "../../../helpers/sanitizeInput";

export const PostEditedSopus = async (
  cdata: IngestionFileDataType[] | undefined,
  difid: string | number,
  cob: string
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  let postData = cdata?.map((d) => {
    return {
      //COB: cob,
      REPORTING_DATE: d.reportingDate,
      BUSINESS_UNIT: cob,
      REGION: sanitizeInput(d.region),
      DESK_NM: sanitizeInput(d.deskNm),
      ENTITY_NM: sanitizeInput(d.entityNm),
      AMOUNT: d.amount ? Number(d.amount) : 0,
      PLAN_PERIOD: sanitizeInput(d.planPeriod),
      PNL_DESCRIPTION: sanitizeInput(d.pnlDescription),
      ACTUAL_PLAN_FLG_MTH_O1F: d.actualPlanFlgMthO1f ? Number(d.actualPlanFlgMthO1f) : 0,
      SUB_DESK_NM: sanitizeInput(d.subDeskNm),
    };
  });
  let formData = {
    dataFile: postData,
    filePath: `sttrdallocmonthlyo1f`, // Azure@shell
    fileType: Number(difid),
    overWrite: true,
  };

  return fetch(`${Api}/DataIngestion/Edit/SopusO1F`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
