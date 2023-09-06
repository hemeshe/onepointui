import { Api } from "../../../helpers/api";
import { Fetch } from "../../../helpers/fetch";

export const GetDataIngestionInstructions = async (id: number) => {
  try {
    let response = await Fetch(
      `${Api}/DataIngestion/Instructions/${id}`,
      "GET"
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  } catch (error: any) {
    console.log(error.message);
  }
};
