import { Api } from '../../../helpers/api';

import { AuthService } from '../../../helpers/sso/AuthService';

export const PostCcpnFile = async (
  file: File,
  difId: string,
  year: string,
  quarter: string,
  companyCode: any[] | null
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;

  var formdata = new FormData();
  formdata.append('DataFile', file);
  formdata.append('FilePath', `directsql`); // Azure@shell
  formdata.append('FileType', difId);
  formdata.append('Year', year);
  formdata.append('Quarter', quarter);
  formdata.append('CompanyCode', JSON.stringify(companyCode));

  let response = await fetch(`${Api}/DataIngestion/UploadFile/Ccpn`, {
    method: 'POST',
    body: formdata,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return response.json();
};
