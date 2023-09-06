import { Api } from '../../../helpers/api';
//import { Fetch } from "../../../helpers/fetch";
import { AuthService } from '../../../helpers/sso/AuthService';
//import { filePath } from "../../../helpers/config";

export const PostFinanceReportFile = async (
  file: File,
  difId: string,
  year: string,
  month: string
) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  //   console.log('User details', user);
  let token = user?.access_token;
  try {
    var formdata = new FormData();
    formdata.append('DataFile', file);
    formdata.append('FilePath', 'commentstfinancereport'); // Azure@shell
    formdata.append('FileType', difId);
    formdata.append('Year', year);
    formdata.append('Month', month);

    let response = await fetch(`${Api}/Commentary/UploadFile/FinanceReport`, {
      method: 'POST',
      body: formdata,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!response.ok) {
    }
    let json = await response.json();
    return json;
  } catch (error: any) {
    console.log(error.message);
  }
};
