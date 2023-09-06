import { Api } from "../../../helpers/api";
import { Fetch } from "../../../helpers/fetch";

export const GetTradingAllocFte = async () => {
  try {
    let response = await Fetch(`${Api}/Mapping/View/FtePlan`, "GET");
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
