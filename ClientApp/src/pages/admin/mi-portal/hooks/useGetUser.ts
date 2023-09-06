import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';

import {
  finishLoading,
  startRequest,
  failedRequest,
} from '../../../../store/app/actions';
import {
  requestGetUserData,
  successGetUserData,
} from '../../../../store/admin/actions';

import { Get } from '../../api/get';

import { iv1, key } from '../../../../helpers/config';

export const useGetUsers = () => {
  const dispatch = useDispatch();
  const getUsers = useCallback(() => {
    dispatch(requestGetUserData());
    dispatch(startRequest());
    Get('/Account/View/Portal')
      .then((data) => {
        if (data && data.length) {
          let decryptedData = data.map((d: any) => {
            // //Decryption start here
            // {
            //   var iv = CryptoJS.enc.Base64.parse(d.iv);
            //   var plaintextAccess = CryptoJS.AES.decrypt(d.access, key, {
            //     iv: iv,
            //   });
            //   var plaincreateBy = CryptoJS.AES.decrypt(d.createBy, key, {
            //     iv: iv,
            //   });
            //   var plainUserEmail = CryptoJS.AES.decrypt(d.userEmail, key, {
            //     iv: iv1,
            //   });
            //   var plainModifiedBy = CryptoJS.AES.decrypt(d.modifiedBy, key, {
            //     iv: iv,
            //   });
            //   var plainaccess = plaintextAccess.toString(CryptoJS.enc.Latin1);
            //   var plainEmail = plainUserEmail.toString(CryptoJS.enc.Latin1);
            //   var createBy = plaincreateBy.toString(CryptoJS.enc.Latin1);
            //   var modifiedBy = plainModifiedBy.toString(CryptoJS.enc.Latin1);

            //   d.access = plainaccess;
            //   d.userEmail = plainEmail;
            //   d.createBy = createBy;
            //   d.modifiedBy = modifiedBy;
            // }
            // //Decryption end here

            return d;
          });

          dispatch(successGetUserData(decryptedData));
          dispatch(finishLoading());
        }
      })
      .catch((error) => {
        dispatch(failedRequest(error.message));
      });
  }, [dispatch]);

  return {
    getUsers,
  };
};
