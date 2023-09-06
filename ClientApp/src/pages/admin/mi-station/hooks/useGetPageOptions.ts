import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  finishLoading,
  startRequest,
  failedRequest,
} from '../../../../store/app/actions';
import {
  setHomePageOptions,
  setLandingPageOptions,
  setLandingPageOptionsForEdit,
  setSubLandingPageOptions,
  setSubLandingPageOptionsForEdit,
} from '../../../../store/admin/actions';

import { Fetch } from '../../../../helpers/fetch';
import { Api } from '../../../../helpers/api';

function checkStatus(response: {
  status: number;
  statusText: string | undefined;
}) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else if (response.status === 404) {
    return Promise.reject(new Error('No data found!'));
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function createjson(response: any) {
  return response.json();
}

export const useGetPageOptions = () => {
  const dispatch = useDispatch();

  const getHomePages = useCallback(() => {
    dispatch(startRequest());
    Fetch(`${Api}/Account/View/HomePage`, 'GET')
      .then(checkStatus)
      .then(createjson)
      .then((data) => {
        if (data && data.length) {
          dispatch(setHomePageOptions(data));
          dispatch(finishLoading());
        }
      })
      .catch((error) => {
        if (error.message !== 'No data found!') {
          dispatch(failedRequest(error.message));
        } else {
          dispatch(finishLoading());
        }
      });
  }, [dispatch]);

  const getLandingPages = useCallback(
    (id: string | number, userId: string, pageType: string) => {
      dispatch(startRequest());
      Fetch(`${Api}/Account/View/LandingPage/${id}`, 'GET')
        .then(checkStatus)
        .then(createjson)
        .then((data) => {
          if (data && data.length) {
            if (pageType === 'Add') {
              dispatch(setLandingPageOptions(data, userId));
            } else if (pageType === 'Edit') {
              dispatch(setLandingPageOptionsForEdit(data, userId));
            }
            dispatch(finishLoading());
          }
        })
        .catch((error) => {
          if (error.message !== 'No data found!') {
            dispatch(failedRequest(error.message));
          } else {
            dispatch(finishLoading());
          }
          console.log(error);
          if (pageType === 'Add') {
            dispatch(setLandingPageOptions([], userId));
            dispatch(setSubLandingPageOptions([], userId));
          } else if (pageType === 'Edit') {
            dispatch(setLandingPageOptionsForEdit([], userId));
            dispatch(setSubLandingPageOptionsForEdit([], userId));
          }
        });
    },
    [dispatch]
  );

  const getSubLandingPages = useCallback(
    (id: string | number, userId: string, pageType: string) => {
      dispatch(startRequest());
      Fetch(`${Api}/Account/View/SubLandingPage/${id}`, 'GET')
        .then(checkStatus)
        .then(createjson)
        .then((data) => {
          if (data && data.length) {
            if (pageType === 'Add') {
              dispatch(setSubLandingPageOptions(data, userId));
            } else if (pageType === 'Edit') {
              dispatch(setSubLandingPageOptionsForEdit(data, userId));
            }
            dispatch(finishLoading());
          }
        })
        .catch((error) => {
          if (error.message !== 'No data found!') {
            dispatch(failedRequest(error.message));
          } else {
            dispatch(finishLoading());
          }
          console.log(error);
          if (pageType === 'Add') {
            dispatch(setSubLandingPageOptions([], userId));
          } else if (pageType === 'Edit') {
            dispatch(setSubLandingPageOptionsForEdit([], userId));
          }
        });
    },
    [dispatch]
  );

  return {
    getHomePages,
    getLandingPages,
    getSubLandingPages,
  };
};
