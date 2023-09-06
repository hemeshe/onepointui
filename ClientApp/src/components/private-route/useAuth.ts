import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';

import userManager from '../../helpers/sso/userManager';
import { setUserAccess } from '../../store/app/actions';

import { GetUserAccess } from '../../api/get-user-access';

import { AppStateType } from '../../store';

import { key } from '../../helpers/config';

export const useAuth = () => {
  const appState = useSelector((state: AppStateType) => state.app);

  const { userName } = appState;
  const dispatch = useDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  useEffect(() => {
    userManager.getUser().then((user) => {
      // console.log('useAuth initial user', user);
      if (user && !user.expired) {
        let email = user.profile.mail;
        // console.log('useAthu email', email);
        localStorage.setItem('ssoToken', user.access_token);
        GetUserAccess()
          .then((resp) => {
            if (resp.access && resp.userEmail && resp.isActive === true) {
              // var iv = CryptoJS.enc.Base64.parse(resp.iv);
              // var plaintextAccess = CryptoJS.AES.decrypt(resp.access, key, {
              //   iv: iv,
              // });
              // let access = plaintextAccess.toString(CryptoJS.enc.Latin1);
              let access = resp.access;
              console.log('Access Plain text value ', access);
              dispatch(setUserAccess(access, email, resp.isActive));
            }
            if (resp.userEmail && resp.isActive === false) {
              setIsAuthenticating(false);
              dispatch(setUserAccess('', '', false));
            }
          })
          .catch((error) => {
            if (error.status === 204 || error || 401) {
              setIsAuthenticating(false);
              dispatch(setUserAccess('', '', false));
            }
          })
          .finally(() => {
            setIsAuthenticating(false);
          });
      } else {
        console.log('Auth failed');
        userManager.signinRedirect();
      }
    });
  }, [dispatch]);

  return {
    isAuthenticating,
    userName,
  };
};
