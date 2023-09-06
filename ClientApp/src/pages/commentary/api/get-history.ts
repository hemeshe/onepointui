import { Api } from '../../../helpers/api';
import { Fetch } from '../../../helpers/fetch';

export const GetHistory = async (
  PageNumber: number | null = null,
  PageSize: number | null = null
) => {
  try {
    let response =
      PageNumber && PageSize
        ? await Fetch(
            `${Api}/History?PageNumber=${PageNumber}&PageSize=${PageSize}&originFrom=commentary`,
            'GET'
          )
        : await Fetch(`${Api}/History?originFrom=commentary`, 'GET');
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error: any) {
    console.log(error.message);
  }
};

export const GetHistoryForCSV = async () => {
  try {
    let response = await Fetch(
      `${Api}/History/HistoryExport?originFrom=commentary`,
      'GET'
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error: any) {
    console.log(error.message);
  }
};
