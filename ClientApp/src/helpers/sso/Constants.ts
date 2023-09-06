/*
 DEV
*/
export const devConstants = {
  stsAuthority: 'https://sso-dev.shell.com/as/authorization.oauth2',
  clientId: '87d5c3e9d4fca98079d562418c03402b',
  clientSecret:
    'fhYTEGmd4RjjByozMhVtybPH2rrkP5mpLeRfdGdAbZbr16bBrASZmFI2fAHMz3SW',
  clientRoot: 'https://localhost:44380/',
  clientScope: 'openid profile email',
  apiRoot: 'https://demo.identityserver.io/api/',
  metadataUrl: 'https://sso-dev.shell.com/.well-known/openid-configuration',
  redirectUrl: 'https://localhost:44380/callback',
  responseType: 'code',
  responseMode: 'query',
};

/*
 QAT
*/
export const qatConstants = {
  stsAuthority: 'https://sso-uat.shell.com/as/authorization.oauth2',
  clientId: '5beceabe9ebda198d355bb952f3fe021',
  // clientSecret: '',
  clientRoot: 'https://localhost:44380/',
  clientScope: 'openid profile email',
  apiRoot: 'https://demo.identityserver.io/api/',
  metadataUrl: 'https://sso-uat.shell.com/.well-known/openid-configuration',
  redirectUrl: 'https://localhost:44380/callback',
  responseType: 'code',
  responseMode: 'query',
};

/*
 PROD
*/
export const prodConstants = {
  stsAuthority: 'https://sso.shell.com/as/authorization.oauth2',
  clientId: '26ded8c5dee71a729b86bc21439a7fdd',
  // clientSecret: '',
  clientRoot: 'https://localhost:44380/',
  clientScope: 'openid profile email',
  apiRoot: 'https://demo.identityserver.io/api/',
  metadataUrl: 'https://sso.shell.com/.well-known/openid-configuration',
  redirectUrl: 'https://localhost:44380/callback',
  responseType: 'code',
  responseMode: 'query',
};

export const Constants =
  process.env.REACT_APP_BUILD_TYPE === 'QAT'
    ? qatConstants
    : process.env.REACT_APP_BUILD_TYPE === 'PROD'
    ? prodConstants
    : devConstants;
