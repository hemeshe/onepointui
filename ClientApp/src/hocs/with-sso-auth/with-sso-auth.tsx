import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import userManager from '../../helpers/sso/userManager';
import { setUserAccess } from '../../store/app/actions';
//import { UserAccessType } from '../../types/app';
import { GetUserAccess } from '../../api/get-user-access';

import { AppStateType } from '../../store';

//import { useEncrypt } from "../../pages/admin/hooks/useDecrypt";

import { key } from '../../helpers/config';

type Props = {
  email?: string;
};

const Loading: React.FC = () => (
  <div style={{ margin: 0, padding: 0, textAlign: 'center', width: '100%' }}>
    <span>Loading...</span>
  </div>
);

export const WithSsoAuth = <T extends Props>(
  WrappedComponent: React.ComponentType<T>
) => {
  const HOC: React.FC<T & Props> = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    //const { encryptField } = useEncrypt();
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const appState = useSelector((state: AppStateType) => state.app);

    const { userName } = appState;
    useEffect(() => {
      if (!userName) {
        setIsAuthenticating(true);
      }
      userManager.getUser().then((user) => {
        console.log(user);
        if (user) {
          //let fullName = `${user.profile.givenName} ${user.profile.sn}`;
          let email = user.profile.mail;
          console.log('Auth success: ');
          console.log(email);
          localStorage.setItem('ssoToken', user.access_token);
          GetUserAccess()
            .then((resp) => {
              // console.log('user output result SSO', resp);
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
                console.log('User Inactive');
                setIsAuthenticating(false);
                history.push('/unauthorized');
              }
            })
            .catch((error) => {
              if (error.status === 204 || error || 401) {
                console.log('RBA failed: ');
                console.log(error);
                setIsAuthenticating(false);
                history.push('/unauthorized');
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
    }, [dispatch, history, userName]);

    if (isAuthenticating) {
      return <Loading />;
    }
    return <WrappedComponent {...props} />;
  };
  return HOC;
};
