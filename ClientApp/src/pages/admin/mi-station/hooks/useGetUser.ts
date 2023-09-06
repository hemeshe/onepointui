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
  const getUsers = useCallback(
    (showLoader: boolean = true) => {
      if (showLoader) {
        dispatch(startRequest());
        dispatch(requestGetUserData());
      }
      Get('/Account/View/MiStation')
        .then((data) => {
          if (data && data.length) {
            console.log(data);
            let decryptedData = data.map((d: any) => {
              // //Decryption start here
              // {
              //   var iv = CryptoJS.enc.Base64.parse(d.iv);
              //   // var plaintextAccess = CryptoJS.AES.decrypt(d.access, key, {
              //   //   iv: iv,
              //   // });
              //   var plaincreatedBy = CryptoJS.AES.decrypt(d.createdBy, key, {
              //     iv: iv,
              //   });
              //   var plainUserEmail = CryptoJS.AES.decrypt(d.userEmail, key, {
              //     iv: iv1,
              //   });
              //   var plainModifiedBy = CryptoJS.AES.decrypt(d.modifiedBy, key, {
              //     iv: iv,
              //   });

              //   // var plainhomePage = CryptoJS.AES.decrypt(d.homePage, key, {
              //   //   iv: iv1,
              //   // });
              //   // var plainlandingPage = CryptoJS.AES.decrypt(d.landingPage, key, {
              //   //   iv: iv1,
              //   // });
              //   // var plainsubLandingPage = CryptoJS.AES.decrypt(
              //   //   d.subLandingPage,
              //   //   key,
              //   //   {
              //   //     iv: iv1,
              //   //   }
              //   // );

              //   //var plainaccess = plaintextAccess.toString(CryptoJS.enc.Latin1);
              //   var plainEmail = plainUserEmail.toString(CryptoJS.enc.Latin1);
              //   var createdBy = plaincreatedBy.toString(CryptoJS.enc.Latin1);
              //   var modifiedBy = plainModifiedBy.toString(CryptoJS.enc.Latin1);

              //   // var homePage = plainhomePage.toString(CryptoJS.enc.Latin1);
              //   // var landingPage = plainlandingPage.toString(CryptoJS.enc.Latin1);
              //   // var subLandingPage = plainsubLandingPage.toString(
              //   //   CryptoJS.enc.Latin1
              //   // );

              //   //d.access = plainaccess;
              //   d.userEmail = plainEmail;
              //   d.createdBy = createdBy;
              //   d.modifiedBy = modifiedBy;

              //   // d.homePage = homePage;
              //   // d.landingPage = landingPage;
              //   // d.subLandingPage = subLandingPage;
              // }
              // //Decryption start here

              return d;
            });

            //console.log(decryptedData);
            dispatch(successGetUserData(data));
            if (showLoader) {
              dispatch(finishLoading());
            }
          }
        })
        .catch((error) => {
          dispatch(failedRequest(error.message));
        });
    },
    [dispatch]
  );

  return {
    getUsers,
  };
};
