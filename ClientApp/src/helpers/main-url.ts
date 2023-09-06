// SANDBOX URL
export const sandboxUrl = 'https://onepoint-eun-dev.azurewebsites.net';

// DEV URL
export const devUrl = 'https://onepoint-eun-dev.azurewebsites.net';

// QAT URL
export const qatUrl =
  'https://mnrv-def-pub-qat-euw-100-appw-minerva-portal-ui.azurewebsites.net';

// PROD URL
export const prodUrl =
  'https://mnrv-def-pub-prd-eun-100-appw-minerva-portal-ui.azurewebsites.net';

export const MainUrl =
  process.env.REACT_APP_BUILD_TYPE === 'QAT'
    ? qatUrl
    : process.env.REACT_APP_BUILD_TYPE === 'DEV'
    ? devUrl
    : process.env.REACT_APP_BUILD_TYPE === 'SANDBOX'
    ? sandboxUrl
    : process.env.REACT_APP_BUILD_TYPE === 'PROD'
    ? prodUrl
    : '';
