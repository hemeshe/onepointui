import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  finishLoading,
  startRequest,
  failedRequest,
} from '../../../../store/app/actions';
import {
  setSearchData,
  successGetUserData,
} from '../../../../store/admin/actions';

import { useGetData } from '../../../../hooks/useGetData';

export const useGetProfiles = () => {
  const [profileTeams, setProfileTeams] = useState<
    { teamName?: string; pbiRlsTeamAccessId?: string | number }[]
  >([]);
  const { Get } = useGetData();
  const dispatch = useDispatch();

  const removeNullItems = useCallback((items: string[]) => {
    if (!Array.isArray(items)) {
      return items;
    }
    return items.filter((itm) => itm !== null && itm !== '');
  }, []);

  const getProfiles = useCallback(
    (PageNumber, PageSize, searchValue = '', showLoader: boolean = true) => {
      if (showLoader) {
        dispatch(startRequest());
      }
      let queryParams =
        searchValue && searchValue !== ''
          ? `/${searchValue}?PageNumber=${PageNumber}&PageSize=${PageSize}`
          : `?PageNumber=${PageNumber}&PageSize=${PageSize}`;
      Get(`/Account/View/PowerBiDrlsProfilesPaging${queryParams}`)
        .then((data) => {
          if (data && data.length) {
            console.log(data);
            const DATA = data.map((d: any) => {
              d.homePages = removeNullItems(d.homePage);
              d.landingPages = removeNullItems(d.landingPage);
              d.subLandingPages = removeNullItems(d.subLandingPage);
              return d;
            });
            if (searchValue && searchValue !== '') {
              dispatch(setSearchData(DATA));
            } else {
              dispatch(successGetUserData(DATA));
            }
            if (showLoader) {
              dispatch(finishLoading());
            }
          }
        })
        .catch((error) => {
          dispatch(failedRequest(error.message));
        });
    },
    [dispatch, removeNullItems, Get]
  );

  const getProfileTeams = useCallback(async () => {
    let prof = await Get('/Account/PowerBiProfiles');
    setProfileTeams(prof);
  }, []);

  return {
    removeNullItems,
    getProfiles,
    getProfileTeams,
    profileTeams,
  };
};
