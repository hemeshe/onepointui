import { createUserManager } from 'redux-oidc';
import { UserManagerSettings } from 'oidc-client/dist/oidc-client';

import { MainUrl } from '../main-url';

/*
DEV
*/
const devuserManagerConfig: UserManagerSettings = {
  authority: 'https://sso-dev.shell.com/as/authorization.oauth2',
  client_id: '87d5c3e9d4fca98079d562418c03402b',
  client_secret:
    'fhYTEGmd4RjjByozMhVtybPH2rrkP5mpLeRfdGdAbZbr16bBrASZmFI2fAHMz3SW',
  //redirect_uri: `${MainUrl}/callback`,
  redirect_uri: 'http://localhost:3000/callback',
  metadataUrl: 'https://sso-dev.shell.com/.well-known/openid-configuration',
  post_logout_redirect_uri: `${MainUrl}/unauthorized`,
  response_type: 'code',
  response_mode: 'query',
  scope: 'openid profile email',
  silent_redirect_uri: `${MainUrl}/silentRenew.html`,
  filterProtocolClaims: true,
  automaticSilentRenew: true,
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true,
  monitorSession: true,
};

/* 
QAT
*/
const qatuserManagerConfig: UserManagerSettings = {
  authority: 'https://sso-uat.shell.com/as/authorization.oauth2',
  client_id: '5beceabe9ebda198d355bb952f3fe021', // UAT
  redirect_uri: `${MainUrl}/callback`, // UAT
  metadataUrl: 'https://sso-uat.shell.com/.well-known/openid-configuration', // UAT
  post_logout_redirect_uri: `${MainUrl}/unauthorized`, // UAT
  response_type: 'code',
  response_mode: 'query',
  scope: 'openid profile email',
  silent_redirect_uri: `${MainUrl}/silentRenew.html`, // UAT
  filterProtocolClaims: true,
  automaticSilentRenew: true,
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true,
  monitorSession: true,
};

/* 
PROD
*/
const produserManagerConfig: UserManagerSettings = {
  authority: 'https://sso.shell.com/as/authorization.oauth2',
  client_id: '26ded8c5dee71a729b86bc21439a7fdd', // UAT
  redirect_uri: `${MainUrl}/callback`, // UAT
  metadataUrl: 'https://sso.shell.com/.well-known/openid-configuration', // UAT
  post_logout_redirect_uri: `${MainUrl}/unauthorized`, // UAT
  response_type: 'code',
  response_mode: 'query',
  scope: 'openid profile email',
  silent_redirect_uri: `${MainUrl}/silentRenew.html`, // UAT
  filterProtocolClaims: true,
  automaticSilentRenew: true,
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true,
  monitorSession: true,
};

const userManagerConfig = function (): UserManagerSettings {
  if (process.env.REACT_APP_BUILD_TYPE === 'QAT') return qatuserManagerConfig;
  else if (process.env.REACT_APP_BUILD_TYPE === 'PROD')
    return produserManagerConfig;
  else return devuserManagerConfig;
};

const userManager = createUserManager(userManagerConfig());
export default userManager;

/*
Minerva Portal UAT client_id : 5beceabe9ebda198d355bb952f3fe021
Minerva Landing UAT Page client_id : 1236c1f706a7b3befcbfb004a2c3832e
*/
