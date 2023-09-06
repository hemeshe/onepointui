import { Api } from "../../../helpers/api";
import { Fetch } from "../../../helpers/fetch";

export const Get = async (endPoint: string) => {
  try {
    let response = await Fetch(`${Api}${endPoint}`, "GET");
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error: any) {
    console.log(error.message);
  }
};
