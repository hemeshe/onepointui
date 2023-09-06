import { Api } from "../../../helpers/api";

import { AuthService } from "../../../helpers/sso/AuthService";

export const PostSopusFile = async (file: File, difId: string) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;

  var formdata = new FormData();
  formdata.append("DataFile", file);
  formdata.append("FilePath", `sttrdallocmonthlyo1f`); // Azure@shell
  formdata.append("FileType", difId);

  let response = await fetch(`${Api}/DataIngestion/UploadFile/SopusO1F`, {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.json();
};
