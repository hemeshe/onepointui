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

export const useGetHistory = () => {
  const dispatch = useDispatch();
  const getHistory = useCallback(() => {
    dispatch(requestGetUserData());
    dispatch(startRequest());
    Get("/Account/History/PowerBiDrlsUser")
      .then((data) => {
        if (data && data.length) {
          console.log(data);
          dispatch(successGetUserData(data));
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
