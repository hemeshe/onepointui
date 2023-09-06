import userManager from "./sso/userManager";

import { IngestionPostError } from "./constants";

export const handleResponse = (resp: any) => {
  if (resp) {
    if (resp.status === 400) {
      console.log("400");
      return Promise.resolve(resp);
    } else if (resp.status === 401) {
      console.log(new Error("Auth failed"));
      userManager.signinRedirect();
      return Promise.reject(new Error("Authentication failed!"));
    } else if (resp.status !== 200) {
      return Promise.reject(new Error(resp.statusText));
    } else if (resp.status === 200) {
      return Promise.resolve(resp);
    } else {
      return Promise.reject("Api Error");
    }
  } else {
    return Promise.reject(IngestionPostError);
  }
};
