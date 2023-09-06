import { Api } from '../../../helpers/api';
import { Fetch } from '../../../helpers/fetch';
import { ClassOfBusinessSuccessResponse } from '../../../types/data-ingestion';

export const GetClassOfBusiness = async () => {
  try {
    let response = await Fetch(`${Api}/Shared/GetReport`, 'GET');
    if (!response.ok) {
      throw Error(response.statusText);
    }
    let json = await response.json();
    return await json.map((c: ClassOfBusinessSuccessResponse) => {
      return {
        id: c.reportId,
        name: c.reportName,
      };
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
