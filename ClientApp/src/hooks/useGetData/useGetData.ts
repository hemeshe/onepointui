import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPagination } from "../../store/app/actions";

import { Api } from "../../helpers/api";
import { Fetch } from "../../helpers/fetch";

export const useGetData = () => {
  const dispatch = useDispatch();
  const Get = useCallback(
    async (endPoint: string) => {
      try {
        let response = await Fetch(`${Api}${endPoint}`, "GET");
        if (!response.ok) {
          throw Error(response.statusText);
        }
        let json = await response.json();
        const pgn = response.headers.get("X-Pagination");
        if (pgn) {
          dispatch(setPagination(JSON.parse(pgn)));
        }
        json = json.map((j: any, i: number) => {
          if (!j.id) {
            j.id = i;
          }
          return j;
        });
        return json;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    [dispatch]
  );
  return {
    Get,
  };
};
