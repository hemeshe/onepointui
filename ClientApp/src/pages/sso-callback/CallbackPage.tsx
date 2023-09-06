import * as React from 'react';
import { User } from 'oidc-client';
import { useHistory } from 'react-router-dom';
import userManager from '../../helpers/sso/userManager';
import { CallbackComponent } from 'redux-oidc';

export const CallbackPage = () => {
  let history = useHistory();
  // just redirect to '/' in both cases
  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={(user: User) => {
        console.log('callback component', user.profile);
        //this.props.dispatch(push("/",user.profile));
        history.push('/');
      }}
      errorCallback={(error) => {
        history.push('/unauthorized');
        console.error(error);
      }}
    >
      <div
        style={{ margin: 0, padding: 0, textAlign: 'center', width: '100%' }}
      >
        <span>Redirecting...</span>
      </div>
    </CallbackComponent>
  );
};
