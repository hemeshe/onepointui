import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  finishLoading,
  startRequest,
  failedRequest,
} from "../../../../store/app/actions";
import { addDrlsProfilesPages } from "../../../../store/admin/actions";

import { Fetch } from "../../../../helpers/fetch";
import { Api } from "../../../../helpers/api";

function checkStatus(response: {
  status: number;
  statusText: string | undefined;
}) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else if (response.status === 404) {
    return Promise.reject(new Error("No data found!"));
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function createjson(response: any) {
  return response.json();
}

export const useGetPageOptions = () => {
  const dispatch = useDispatch();

  const getPages = useCallback(() => {
    dispatch(startRequest());
    Fetch(`${Api}/Account/MasterData/PageReportDetails`, "GET")
      .then(checkStatus)
      .then(createjson)
      .then((data) => {
        if (data) {
          console.log(data);
          dispatch(
            addDrlsProfilesPages(
              data.homePages,
              data.landingPages,
              data.subLandingPages,
              data.reportDetails
            )
          );
          dispatch(finishLoading());
        }
      })
      .catch((error) => {
        if (error.message !== "No data found!") {
          dispatch(failedRequest(error.message));
        } else {
          dispatch(finishLoading());
        }
      });
  }, [dispatch]);

  return {
    getPages,
  };
};
