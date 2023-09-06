import { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { OptionType } from './commentary-form';

import { Api } from '../../../../helpers/api';
import { Fetch } from '../../../../helpers/fetch';

import {
  togglePreview,
  setCommentarySelects,
  setCommentarySelectsError,
  setCsvTemplate,
} from '../../../../store/commentary/actions';

import {
  CobHomePageSuccessResponse,
  Ss1LandingPageSuccessResponse,
  Ss2SubLandPageSuccessResponse,
  DashboardReportSuccessResponse,
} from '../../../../types/commentary';

//import { CommRepList } from "../../constants";

import {
  startRequest,
  failedRequest,
  finishLoading,
} from '../../../../store/app/actions';

import { useCreateCsvData } from '../../../data-ingestion/hooks/useCreateCsvData';
import { ParamsType } from '../../../../types/app';
import { monthArray } from '../../../../helpers/month';

//type OptionsType = OptionType[];

const ENV = { DEV: 'DEVELOPMENT', PROD: 'TECHNICAL' };

type respType = {
  pbiProfileId: number;
  cob: string;
  businessUnit: string;
  sector: object;
  homePage: string;
  landingPage: string;
  environment: string;
  profileId: string;
  profileDesc: string;
  loadDate: string;
};

export const useCommetaryform = () => {
  let { year, month, reportid, report, ss2 }: ParamsType = useParams();
  const [classOfBusinessOptions, setClassOfBusinessOptions] = useState<
    OptionType[]
  >([]);
  const [subSection1Options, setSubSection1Options] = useState<OptionType[]>(
    []
  ); // landingPage based upon homepage selection
  const [subSection2Options, setSubSection2Options] = useState<OptionType[]>(
    []
  ); // cob based upon both homepage & landingPage
  const [dashBoardOptions, setDashBoardOptions] = useState<OptionType[]>([]); // /api/Shared/CommentaryDashboard/{pbiProfileId},  pbiProfileId: 69
  const [yearOptions, setYearOptions] = useState<OptionType[]>([]);

  const [classOfBusiness, setClassOfBusiness] = useState<OptionType['id']>();
  const [subSection1, setSubSection1] = useState<OptionType['id']>();
  const [subSection2, setSubSection2] = useState<OptionType['id']>();
  const [dashBoard, setDashBoard] = useState<OptionType['id']>();

  const dispatch = useDispatch();

  const { createCsvData } = useCreateCsvData();

  // const createOptionsFromStringArr = useCallback((strArr: string[]) => {
  //   return strArr.map((el: string) => ({
  //     id: Math.random().toString(),
  //     name: el,
  //   }));
  // }, []);

  const optionsFromCobHomePage = useCallback(
    (strArr: CobHomePageSuccessResponse[]) => {
      return strArr.map((el: CobHomePageSuccessResponse) => ({
        id: el.id.toString(),
        name: el.pageName,
      }));
    },
    []
  );

  const optionsFromSs1 = useCallback(
    (strArr: Ss1LandingPageSuccessResponse[]) => {
      return strArr.map((el: Ss1LandingPageSuccessResponse) => ({
        id: el.id.toString(),
        name: el.pageName,
      }));
    },
    []
  );

  const getData = useCallback(async (endPoint: string) => {
    const response = await Fetch(`${Api}${endPoint}`, 'GET');
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    // const CObs = json.map((el: respType) => el.homePage).filter((el: any, i: any, arr: any) => arr.indexOf(el) === i);
    return json;
  }, []);

  const getCommentaryCob = useCallback(async () => {
    try {
      const endPoint = `/Account/View/HomePage`; //`/Shared/CommentaryCob/${ENV["DEV"]}`; ///api/Shared/CommentaryCob/{environment}
      const COBOptios = optionsFromCobHomePage(await getData(endPoint));
      console.log(COBOptios);
      setClassOfBusinessOptions(COBOptios);
    } catch (error) {
      console.log(error);
    }
  }, [optionsFromCobHomePage, getData]);

  useEffect(() => {
    getCommentaryCob();
  }, [getCommentaryCob]);

  const handleCobChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      console.log('selected Value', value);
      const cob = classOfBusinessOptions.find((x) => x.id === value);
      console.log('Cob details', cob);
      setSubSection1Options([]);
      setSubSection2Options([]);
      setDashBoardOptions([]);
      setYearOptions([]);
      dispatch(setCommentarySelectsError('', '', '', '', '', '', ''));
      dispatch(togglePreview(false, []));
      dispatch(startRequest());
      if (value === '0') {
        dispatch(finishLoading());
      } else {
        try {
          const endPoint = `/Account/View/LandingPage/${cob?.id}`; //`/Shared/CommentarySub1/${ENV["DEV"]}/${cob?.name}`;
          setClassOfBusiness(cob?.name);
          dispatch(setCommentarySelects(cob));
          const Lps = optionsFromSs1(await getData(endPoint));
          console.log(Lps);
          setSubSection1Options(Lps);
          dispatch(finishLoading());
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [classOfBusinessOptions, optionsFromSs1, getData, dispatch]
  );

  const handleSubSection1Change = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setSubSection2Options([]);
      setDashBoardOptions([]);
      setYearOptions([]);
      dispatch(togglePreview(false, []));
      dispatch(setCommentarySelectsError('', '', '', '', '', '', ''));
      const sec1 = subSection1Options.find((x) => x.id === value);
      dispatch(togglePreview(false, []));
      dispatch(startRequest());
      if (value === '0') {
        dispatch(finishLoading());
      } else {
        try {
          setSubSection1(sec1?.name);
          dispatch(setCommentarySelects(undefined, sec1));
          const endPoint = `/Account/View/SubLandingPage/${sec1?.id}`; //`/Shared/CommentarySub2/${ENV["DEV"]}/${classOfBusiness}/${sec1?.name}`;
          // const Sec2Ops = (await getData(endPoint)).map((el: respType) => ({
          //   id: el.pbiProfileId.toString(),
          //   name: el.cob,
          // }));
          const Sec2Ops = (await getData(endPoint)).map(
            (el: Ss2SubLandPageSuccessResponse) => ({
              id: el.id.toString(),
              name: el.cob,
            })
          );
          console.log(Sec2Ops);
          setSubSection2Options(Sec2Ops);
          dispatch(finishLoading());
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [classOfBusiness, subSection1Options, getData, dispatch]
  );

  const handleSubSection2Change = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setDashBoardOptions([]);
      setYearOptions([]);
      dispatch(togglePreview(false, []));
      dispatch(setCommentarySelectsError('', '', '', '', '', '', ''));
      const subSec2 = subSection2Options.find((x) => x.id === value);
      const pbiProfileId = subSec2?.id;
      dispatch(togglePreview(false, []));
      dispatch(startRequest());
      if (value === '0') {
        dispatch(finishLoading());
      } else {
        try {
          setSubSection2(pbiProfileId);
          dispatch(setCommentarySelects(undefined, undefined, subSec2));
          const endPoint = `/Shared/CommentaryDashboard/${pbiProfileId}`;
          const dashBOps = (await getData(endPoint)).map(
            (el: { mainReportName: string; pbiReportId: number }) => ({
              id: el.pbiReportId.toString(),
              name: el.mainReportName,
            })
          );
          console.log(dashBOps);
          setDashBoardOptions(dashBOps);
          dispatch(finishLoading());
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [subSection2Options, getData, dispatch]
  );

  const getReports = useCallback(
    async (pbiProfileId: string | number | undefined) => {
      try {
        const endPoint = `/Shared/CommentaryTab/${pbiProfileId}`;
        const reprts = (await getData(endPoint)).map(
          (el: { tabName: string; pbiReportTabId: number }) => ({
            id: el.pbiReportTabId.toString(),
            name: el.tabName,
          })
        );
        console.log(reprts);
        dispatch(togglePreview(true, reprts));
      } catch (error: any) {
        console.log(error);
        dispatch(failedRequest(`Reports error: ${error.message}`));
      }
    },
    [getData, dispatch]
  );

  const handleDashboardChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setYearOptions([]);
      dispatch(togglePreview(false, []));
      dispatch(setCommentarySelectsError('', '', '', '', '', '', ''));
      const dashbBoard = dashBoardOptions.find((x) => x.id === value);
      dispatch(togglePreview(false, []));
      dispatch(startRequest());
      if (event.target.value === '0') {
        dispatch(finishLoading());
      } else {
        //setShowPreview(true);
        try {
          setDashBoard(dashbBoard?.id);
          dispatch(
            setCommentarySelects(undefined, undefined, undefined, dashbBoard)
          );
          const endPoint = `/Shared/CommentaryYear`;
          const Yrs = (await getData(endPoint)).map((el: number[]) => ({
            id: el.toString(),
            name: el,
          }));
          console.log(Yrs);
          setYearOptions(Yrs);
          getReports(dashbBoard?.id);
          dispatch(finishLoading());
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [dispatch, dashBoardOptions, getData, getReports]
  );

  const handleYearChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const year = event.target.value;
      dispatch(setCommentarySelectsError('', '', '', '', '', '', ''));
      if (year === '0') {
      } else {
        //setShowPreview(true);
        dispatch(
          setCommentarySelects(undefined, undefined, undefined, undefined, year)
        );
      }
    },
    [dispatch]
  );

  const handleMonthChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const month = event.target.value;
      dispatch(setCommentarySelectsError('', '', '', '', '', '', ''));
      if (month === '0') {
      } else {
        //setShowPreview(true);
        dispatch(
          setCommentarySelects(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            month
          )
        );
      }
    },
    [dispatch]
  );

  const createTemplate = useCallback(
    async (pbiProfileId: string | number | undefined) => {
      try {
        const endPoint = `/Shared/CommentaryFilter/${pbiProfileId}`;
        const data = await getData(endPoint);
        let updatedData = [];
        for (var index in data) {
          const key = data[index];
          const uptVal = '';
          updatedData.push({ [key]: uptVal });
        }
        const tmplData = createCsvData(updatedData, '') ?? [];
        // let obj = Object.assign(
        //   {},
        //   ...Object.entries({ ...tmplData }).map(([a, b]: any) => ({
        //     [b]: '',
        //   }))
        // );
        let obj = Object.assign({}, ...tmplData);
        delete obj['COMMENT'];
        obj['PBI_REPORT_TAB_ID'] = String(reportid);
        obj['TAB_NAME'] = String(report);
        obj['MONTH'] = `${monthArray
          .find((m) => m.id === month)
          ?.name.substring(0, 3)}`; //String(month);
        obj['YEAR'] = String(year);
        obj['COB'] = ss2;
        obj['COMMENT'] = '';
        obj['PERIOD'] = `${year}-${month}-01`;
        console.log(obj);
        dispatch(setCsvTemplate([obj]));
      } catch (error: any) {
        console.log(error);
        dispatch(failedRequest(`Error: ${error.message}`));
      }
    },
    [getData, dispatch, createCsvData, month, year, reportid, report, ss2]
  );

  return {
    classOfBusiness,
    subSection1,
    subSection2,
    dashBoard,
    year,
    classOfBusinessOptions,
    subSection1Options,
    subSection2Options,
    dashBoardOptions,
    yearOptions,
    handleCobChange,
    handleSubSection1Change,
    handleSubSection2Change,
    handleDashboardChange,
    handleYearChange,
    handleMonthChange,
    createTemplate,
  };
};
