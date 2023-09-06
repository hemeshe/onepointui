import { useCallback, useState } from "react";
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

export const useGetUsers = () => {
  const [profiles, setProfiles] = useState<
    { teamName?: string; pbiRlsTeamAccessId?: string | number }[]
  >([]);
  const dispatch = useDispatch();
  const getUsers = useCallback(() => {
    dispatch(requestGetUserData());
    dispatch(startRequest());
    Get("/Account/View/PowerBiDrlsUser")
      .then((data) => {
        if (data && data.length) {
          data = data.map((j: any, i: number) => {
            if (!j.id) j.id = i;
            return j;
          });
          dispatch(successGetUserData(data));
          dispatch(finishLoading());
        }
      })
      .catch((error) => {
        dispatch(failedRequest(error.message));
      });
  }, [dispatch]);

  const getProfiles = useCallback(async () => {
    let prof = await Get("/Account/PowerBiProfiles");
    setProfiles(prof);
  }, []);

  return {
    getUsers,
    getProfiles,
    profiles,
  };
};
