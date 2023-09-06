import { Api } from "../../../helpers/api";
import { Fetch } from "../../../helpers/fetch";

export const GetDataIngestionYears = async () => {
  try {
    let response = await Fetch(`${Api}/DataIngestion/Years/Ocat`, "GET");
    if (!response.ok) {
      throw Error(response.statusText);
    }
    let json = await response.json();
    json = json.map((y: number) => {
      return {
        id: y,
        name: y.toString(),
      };
    });
    return json;
  } catch (error: any) {
    console.log(error.message);
  }
};
