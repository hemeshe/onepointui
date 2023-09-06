import { Api } from '../../../helpers/api';
import { AuthService } from '../../../helpers/sso/AuthService';

export const PostReportFreezeMapFile = async (file: File, difId: string) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  try {
    var formdata = new FormData();
    formdata.append('DataFile', file);
    formdata.append('FilePath', `ctrptfrztime`); // Azure@shell
    formdata.append('FileType', difId);

    let response = await fetch(`${Api}/Mapping/UploadFile/ControlFrzTime`, {
      method: 'POST',
      body: formdata,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return await response.json();
  } catch (error: any) {
    console.log(error.message);
  }
};
