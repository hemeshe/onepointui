import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  finishLoading,
  startRequest,
  failedRequest,
} from "../../../../store/app/actions";
import {
  requestGetUserData,
  successGetUserData,
} from "../../../../store/admin/actions";

import { Get } from "../../api/get";
import { User } from "../../../../types/admin";

export const useGetHistory = () => {
  const dispatch = useDispatch();
  const getHistory = useCallback(() => {
    dispatch(requestGetUserData());
    dispatch(startRequest());
    Get("/Account/History/PowerBiDrlsProfiles")
      .then((data) => {
        if (data && data.length) {
          console.log(data);
          const DATA = data.map((d: User) => {
            d.profileName = d.teamName;
            d.subLandingPageName = d.subLandingPageCobName;
            return d;
          });
          dispatch(successGetUserData(DATA));
          dispatch(finishLoading());
        }
      })
      .catch((error) => {
        dispatch(failedRequest(error.message));
      });
  }, [dispatch]);

  return {
    getHistory,
  };
};
