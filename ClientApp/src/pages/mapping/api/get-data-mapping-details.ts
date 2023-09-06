import { Api } from "../../../helpers/api";
import { Fetch } from "../../../helpers/fetch";

export const GetDataMappingDetails = async (id: number, c: string) => {
  try {
    let response = await Fetch(`${Api}/Shared/File/${id}/${c}`, "GET");
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error: any) {
    console.log(error.message);
  }
};
