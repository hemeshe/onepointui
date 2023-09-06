import { AuthService } from "./sso/AuthService";

//export const token = localStorage.getItem('ssoToken');
export const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  Authorization: "Bearer ",
};

export const Fetch = (
  api: string,
  method: string,
  body: any = {}
): Promise<any> => {
  const authService = new AuthService();

  switch (method) {
    case "POST":
      let postApi = (token: string) => {
        headers.Authorization = "Bearer " + token;
        return fetch(api, {
          method: method,
          body: body,
          headers: headers,
        }).catch((error) => {
          console.log(error);
          Promise.reject();
        });
      };
      return authService.getUser().then((user) => {
        if (user && user.access_token) {
          return postApi(user.access_token).catch((error) => {
            if (error.status === 401) {
              return authService.renewToken().then((renewedUser) => {
                return postApi(renewedUser.access_token);
              });
            }
            console.log(error);
            //throw error;
          });
        } else if (user) {
          return authService.renewToken().then((renewedUser) => {
            return postApi(renewedUser.access_token);
          });
        } else {
          //throw new Error('user is not logged in');
          authService.login().then((r) => {
            console.log(r);
          });
        }
      });

    case "GET":
      let getApi = (token: string) => {
        headers.Authorization = "Bearer " + token;
        return fetch(api, {
          method: method,
          headers: headers,
        });
      };
      return authService.getUser().then((user) => {
        if (user && user.access_token) {
          return getApi(user.access_token).catch((error) => {
            if (error.status === 401) {
              return authService.renewToken().then((renewedUser) => {
                return getApi(renewedUser.access_token);
              });
            }
            throw error;
          });
        } else if (user) {
          return authService.renewToken().then((renewedUser) => {
            return getApi(renewedUser.access_token);
          });
        } else {
          //throw new Error('user is not logged in');
          authService.login().then((r) => {
            console.log(r);
          });
        }
      });

    default:
      return fetch(api);
  }
};
