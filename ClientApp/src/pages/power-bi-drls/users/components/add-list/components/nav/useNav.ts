import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppStateType } from "../../../../../../../store";

import {
  successRequest,
  startRequest,
  failedRequest,
} from "../../../../../../../store/app/actions";

import { successAddUserDrls } from "../../../../../../../store/admin/actions";

import { Api } from "../../../../../../../helpers/api";

import { AuthService } from "../../../../../../../helpers/sso/AuthService";

/* eslint-disable no-useless-escape */
const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const useNav = () => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const dispatch = useDispatch();
  const { newUser } = adminState;
  const authService = new AuthService();

  const handleSave = useCallback(async () => {
    const isValid = newUser.some((el) => {
      if (!validEmailRegex.test(el.userEmailId!!)) {
        dispatch(failedRequest("Invalid user email!"));
        return false;
      }
      return true;
    });

    if (!isValid) return;
    let user = await authService.getUser();
    let token = user?.access_token;
    try {
      dispatch(startRequest());
      let payload = newUser.map((u) => {
        return {
          userEmailId: u.userEmailId,
          role: u.access,
          isActive: u.isActive,
          pbiRlsTeamAccessId: Number(u.pbiRlsTeamAccessId),
        };
      });
      let response = await fetch(`${Api}/Account/Add/PowerBiDrlsUser`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status === 200) {
        let json = await response.json();
        if (json && json.length) {
          dispatch(successRequest("User Added Successfully"));
          dispatch(successAddUserDrls(json));
        }
      } else if (response.status === 400) {
        console.log(response);
        let json = await response.json();
        let msg = json.errorMessage ?? "Some api error!";
        throw new Error(msg);
      } else if (response.status === 401) {
        throw new Error("Unauthorized!");
      } else if (response.status === 500) {
        throw new Error("Internal Api Error!");
      }
    } catch (error: any) {
      dispatch(failedRequest(error.message));
    }
  }, [dispatch, newUser, authService]);

  return {
    newUser,
    handleSave,
  };
};
