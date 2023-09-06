import { Api } from "../../../helpers/api";
import { Fetch } from "../../../helpers/fetch";

export const Get = async (uri: string) => {
  try {
    let response = await Fetch(`${Api}${uri}`, "GET");
    if (!response.ok) {
      throw Error(response.statusText);
    }
    let json = await response.json();
    json = json.map((j: any, i: number) => {
      j.id = i;
      return j;
    });
    return json;
  } catch (error: any) {
    console.log(error.message);
  }
};
