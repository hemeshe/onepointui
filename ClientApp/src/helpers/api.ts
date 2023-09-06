// DEV SERVER
export const sandboxApi = 'https://onepoint-api-eun-dev.azurewebsites.net/api';
// export const sandboxApi =
//   'https://mnrv-def-pub-dev-euw-100-appw-minerva.azurewebsites.net/api';

// export const sandboxApi = 'https://localhost:44358/api';

// DEV SERVER
export const devApi = 'https://onepoint-api-eun-dev.azurewebsites.net/api';

// QAT SERVER
export const qatApi =
  'https://mnrv-def-pub-qat-euw-100-appw-minerva.azurewebsites.net/api';

// PROD SERVER
export const prodApi =
  'https://mnrv-def-pub-prd-eun-100-appw-minerva.azurewebsites.net/api';

export const Api =
  process.env.REACT_APP_BUILD_TYPE === 'QAT'
    ? qatApi
    : process.env.REACT_APP_BUILD_TYPE === 'DEV'
    ? devApi
    : process.env.REACT_APP_BUILD_TYPE === 'SANDBOX'
    ? sandboxApi
    : process.env.REACT_APP_BUILD_TYPE === 'PROD'
    ? prodApi
    : '';
