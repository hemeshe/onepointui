import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { UploadError, AckM } from "../../../../helpers/constants";

import {
  startRequest,
  failedRequest,
  successRequest,
} from "../../../../store/app/actions";

import { AuthService } from "../../../../helpers/sso/AuthService";
import { Api } from "../../../../helpers/api";

export const PostFile = async (file: File, difId: string) => {
  const authService = new AuthService();
  let user = await authService.getUser();
  let token = user?.access_token;
  var formdata = new FormData();
  formdata.append("DataFile", file);
  formdata.append("FilePath", `User`); // Azure@shell
  formdata.append("FileType", "1");

  return fetch(`${Api}/Account/UploadFile/PowerBiDrlsUser`, {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const useFileUpload = () => {
  const dispatch = useDispatch();

  const displayError = useCallback(
    (data) => {
      let newErMsg = `${UploadError} (${data.ErrorMessage})`;
      dispatch(failedRequest(newErMsg));
    },
    [dispatch]
  );
  const postfile = useCallback(
    async (file) => {
      dispatch(startRequest());
      let postPromise = PostFile.bind(null, file, "");
      try {
        if (postPromise) {
          const resp = await postPromise();
          const data = await resp.json();
          if (data && data.length) {
            dispatch(successRequest(AckM));
          } else if (
            data &&
            data.ColumnName &&
            data.ErrorType === "Data" &&
            data.CsvData &&
            data.ErrorData &&
            data.ErrorMessage
          ) {
            displayError(data);
          } else if (data && data.ErrorMessage) {
            displayError(data);
          } else {
            dispatch(failedRequest(UploadError));
          }
        }
      } catch (error: any) {
        dispatch(failedRequest(error.message));
      }
    },
    [dispatch, displayError]
  );
  return { postfile };
};
