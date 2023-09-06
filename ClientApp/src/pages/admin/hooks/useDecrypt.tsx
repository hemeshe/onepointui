import { useCallback } from 'react';
import CryptoJS from 'crypto-js';

import { globalIv, key } from '../../../helpers/config';

export const useEncrypt = () => {
  const encryptField = useCallback((field: string, IV: any) => {
    // //Decrypt starts here
    // let iv = CryptoJS.enc.Base64.parse(IV);
    // let plaintext = CryptoJS.AES.decrypt(field, key, {
    //   iv: iv,
    // });
    // return plaintext.toString(CryptoJS.enc.Latin1);
    // //Decrypt ends here
    return field;
  }, []);
  const encryptFieldByGlobalIv = useCallback((field: string) => {
    // //Decrypt starts here
    // let plaintext = CryptoJS.AES.decrypt(field, key, {
    //   iv: globalIv,
    // });
    // return plaintext.toString(CryptoJS.enc.Latin1);
    // //Decrypt ends here
    return field;
  }, []);
  return {
    encryptField,
    encryptFieldByGlobalIv,
  };
};
