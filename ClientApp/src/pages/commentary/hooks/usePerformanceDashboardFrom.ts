import { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { OptionType } from '../components/add-list/components/performance-dashboard-form/performance-dashboard-form';

import { Api } from '../../../helpers/api';
import { Fetch } from '../../../helpers/fetch';

import {
  Pd_Combined_Gp_Tab,
  Pd_Gross_Margin_Tab,
} from '../../../helpers/commentary-tables-constants';

import {
  togglePreview,
  setCommentarySelects,
} from '../../../store/commentary/actions';

import {
  startRequest,
  failedRequest,
  finishLoading,
  successRequest,
} from '../../../store/app/actions';

import { ParamsType } from '../../../types/app';
import { CommentaryDataType } from '../../../types/commentary';

import { PostPerformanceDashboard } from '../api/post-performance-dashboard';
import { AppStateType } from '../../../store';
import { monthArray } from '../../../helpers/month';
import { UploadError } from '../../../helpers/constants';

export const usePerformanceDashboardForm = () => {
  let history = useHistory();
  let { year, month, ss2, reportid, dashboardid, report }: ParamsType =
    useParams();
  const [reportingLineOptions, setReportingLineOptions] = useState<
    OptionType[]
  >([]);
  const [gmOptions, setGmOptions] = useState<OptionType[]>([]); // cob based upon both homepage & landingPage
  const [commercialPeriodOptions, setCommercialPeriodOptions] = useState<
    OptionType[]
  >([]); // /api/Shared/CommentaryDashboard/{pbiProfileId},  pbiProfileId: 69
  // const [yearOptions, setYearOptions] = useState<OptionType[]>([]);

  const [reportingLine, setReportingLine] = useState<OptionType['id']>();
  const [gm, setGm] = useState<OptionType['id']>();
  const [commercialPeriod, setCommercialPeriod] = useState<OptionType['id']>();
  const [comment, setComment] = useState('');

  const [reportingLineError, setReportingLineError] = useState<boolean>(false);
  const [gmError, setGmError] = useState<boolean>(false);
  const [commercialPeriodError, setCommercialPeriodError] =
    useState<boolean>(false);
  const [commentError, setCommentError] = useState<boolean>(false);
  const [yearError, setYearError] = useState<boolean>(false);
  const [json, setJson] = useState<CommentaryDataType[]>();

  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useDispatch();

  const appState = useSelector((state: AppStateType) => state.app);

  const { currentSubNav } = appState;

  const createOptionsFromStringArr = useCallback(
    (strArr: CommentaryDataType[], field: keyof CommentaryDataType) => {
      return strArr
        .map((el: CommentaryDataType) => el[field])
        .filter((x, index, arr) => arr.indexOf(x) === index)
        .map((el) => {
          return {
            id: el?.toString()!!,
            name: el?.toString()!!,
          };
        });
    },
    []
  );

  const getData = useCallback(async (endPoint: string) => {
    const response = await Fetch(`${Api}${endPoint}`, 'GET');
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    // const CObs = json.map((el: CommentaryDataType) => el.homePage).filter((el: any, i: any, arr: any) => arr.indexOf(el) === i);
    return json;
  }, []);

  const getReportingLine = useCallback(async () => {
    try {
      dispatch(startRequest());
      const endPoint = `/Commentary/AddFilter/CashFlowPerformance/${report}/${ss2}`; ///api/Shared/CommentaryCob/{environment}
      const data = await getData(endPoint);
      // console.log('Add Filter Response', JSON.stringify(data));
      setJson(data);
      const nd = JSON.parse(JSON.stringify(data));
      const RLOptions = createOptionsFromStringArr(nd!!, 'reportingLine');
      // const GmOps = createOptionsFromStringArr(nd!!, 'gm');
      const commercialPeriodOps = createOptionsFromStringArr(
        nd!!,
        'commercialPeriod'
      );
      // console.log('RL Options', RLOptions);
      setReportingLineOptions(RLOptions);
      // console.log('GM Options', GmOps);
      // setGmOptions(GmOps);
      // console.log('CP Options', commercialPeriodOps);
      setCommercialPeriodOptions(commercialPeriodOps);
      dispatch(finishLoading());
    } catch (error: any) {
      console.log(error);
      dispatch(failedRequest(error.message ?? 'Some error!'));
    }
  }, [createOptionsFromStringArr, getData, ss2, report, dispatch]);

  const getReportingLineForEdit = useCallback(async () => {
    try {
      dispatch(startRequest()); ///api/Commentary/EditFilter/CapitalEmpR1/{reportTabId}/{year}/{month}
      const endPoint = `/Commentary/EditFilter/CashFlowPerformance/${reportid}/${ss2}/${year}/${month}`; ///api/Shared/CommentaryCob/{environment}
      const data = await getData(endPoint);
      //console.log(JSON.stringify(data))
      setJson(data);
      const nd = JSON.parse(JSON.stringify(data));
      const RLOptions = createOptionsFromStringArr(nd!!, 'reportingLine');
      // const GmOps = createOptionsFromStringArr(nd!!, 'gm');
      const commercialPeriodOps = createOptionsFromStringArr(
        nd!!,
        'commercialPeriod'
      );
      // console.log(RLOptions);
      setReportingLineOptions(RLOptions);
      // setGmOptions(GmOps);
      // console.log('CP Options', commercialPeriodOps);
      setCommercialPeriodOptions(commercialPeriodOps);
      dispatch(finishLoading());
    } catch (error: any) {
      console.log(error);
      dispatch(failedRequest(error.message ?? 'Some error!'));
    }
  }, [
    createOptionsFromStringArr,
    getData,
    ss2,
    year,
    month,
    dispatch,
    reportid,
  ]);

  useEffect(() => {
    if (currentSubNav === 'Add') {
      getReportingLine();
    }
    if (currentSubNav === 'Edit') {
      getReportingLineForEdit();
    }
  }, [getReportingLine, currentSubNav, getReportingLineForEdit]);

  const getReportingLineVal = useCallback(
    (x: any) => {
      return currentSubNav === 'Add' ? x['reportingLine'] : x['reportingLine'];
    },
    [currentSubNav]
  );

  const handleReportingLineChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.currentTarget;
      console.log('RL Selected value', value);
      const bs = reportingLineOptions.find((x) => x.id === value);
      setGmOptions([]);
      setCommercialPeriodOptions([]);
      // setYearOptions([]);
      setReportingLineError(false);
      setGm('');
      setCommercialPeriod('');
      setComment('');

      if (value !== '0') {
        try {
          //   const arr = JSON.parse(JSON.stringify(json))?.filter(
          //     (x: any) => getReportingLineVal(x) === bs?.name
          //   );
          // console.log('RL Change to populate ', json);
          const nd = JSON.parse(JSON.stringify(json));
          const GmOps = createOptionsFromStringArr(nd!!, 'gm');
          // console.log('GM Options', GmOps);
          setReportingLine(bs?.name);
          setGmOptions(GmOps);
          const commercialPeriodOps = createOptionsFromStringArr(
            nd!!,
            'commercialPeriod'
          );
          // console.log('CP Options', commercialPeriodOps);
          setCommercialPeriodOptions(commercialPeriodOps);
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      } else setReportingLine(bs?.name);
    },
    [
      reportingLineOptions,
      createOptionsFromStringArr,
      dispatch,
      json,
      gmOptions,
      commercialPeriodOptions,
      // getReportingLineVal,
    ]
  );

  const handleGmChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setCommercialPeriodOptions([]);
      // setYearOptions([]);
      setGmError(false);
      setGm('');
      setCommercialPeriod('');
      setComment('');
      // dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));
      const gm = gmOptions.find((x) => x.id === value);

      if (value !== '0') {
        try {
          setGm(gm?.name);
          //dispatch(setCommentarySelects(undefined, undefined, subSec2));
          //   const arr = json?.filter(
          //     (x) => getReportingLineVal(x) === reportingLine && x.gm === gm?.name
          //   );
          const nd = JSON.parse(JSON.stringify(json));
          const commercialPeriodOps = createOptionsFromStringArr(
            nd!!,
            'commercialPeriod'
          );
          // console.log('CP Options', commercialPeriodOps);
          setCommercialPeriodOptions(commercialPeriodOps);
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      } else setGm(gm?.name);
    },
    [
      gmOptions,
      reportingLine,
      dispatch,
      createOptionsFromStringArr,
      json,
      // getReportingLineVal,
      commercialPeriodOptions,
    ]
  );

  const handleCommercialPeriodChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      // setYearOptions([]);
      setCommercialPeriodError(false);
      setComment('');
      const commercialPeriod = commercialPeriodOptions.find(
        (x) => x.id === value
      );
      dispatch(togglePreview(false, []));
      //dispatch(startRequest());
      if (event.target.value !== '0') {
        try {
          setCommercialPeriod(commercialPeriod?.name);
          if (currentSubNav === 'Edit') {
            if (report === Pd_Combined_Gp_Tab) {
              const nd = json?.filter(
                (x) => x.commercialPeriod === commercialPeriod?.name
              );
              const commentOptions = createOptionsFromStringArr(
                nd!!,
                'comment'
              );
              let commentData = nd!![0].comment;
              if (commentData !== undefined) setComment(commentData);
              // console.log('First if', commentData);
            } else if (report === Pd_Gross_Margin_Tab) {
              const nd = json?.filter(
                (x) =>
                  x.commercialPeriod === commercialPeriod?.name &&
                  x.reportingLine === reportingLine &&
                  x.gm === gm
              );
              const commentOptions = createOptionsFromStringArr(
                nd!!,
                'comment'
              );
              let commentData = nd!![0].comment;
              if (commentData !== undefined) setComment(commentData);
              // console.log('Second if', commentData);
            } else {
              const nd = json?.filter(
                (x) =>
                  x.commercialPeriod === commercialPeriod?.name &&
                  x.reportingLine === reportingLine
              );
              const commentOptions = createOptionsFromStringArr(
                nd!!,
                'comment'
              );
              let commentData = nd!![0].comment;
              if (commentData !== undefined) setComment(commentData);
              // console.log('Last else if', commentData);
            }
          }
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      } else setCommercialPeriod(commercialPeriod?.name);
    },
    [
      dispatch,
      commercialPeriodOptions,
      createOptionsFromStringArr,
      json,
      gm,
      reportingLine,
      getReportingLineVal,
    ]
  );

  // const handleYearChange = useCallback(
  //   (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const year = event.target.value;
  //     //dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));
  //     dispatch(
  //       setCommentarySelects(undefined, undefined, undefined, undefined, year)
  //     );
  //     history.push(
  //       '/add-comment/:cobid/:cob/:ss1id/:ss1/:ss2id/:ss2/:dashboardid/:dashboard/:year/:month/:reportid/:report'
  //     );
  //   },
  //   [dispatch, history]
  // );

  // const handleMonthChange = useCallback(
  //   (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const month = event.target.value;
  //     //dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));
  //     dispatch(
  //       setCommentarySelects(
  //         undefined,
  //         undefined,
  //         undefined,
  //         undefined,
  //         undefined,
  //         month
  //       )
  //     );
  //   },
  //   [dispatch]
  // );

  const handleCommentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.currentTarget.value);
      setCommentError(false);
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!reportingLine && report !== Pd_Combined_Gp_Tab) {
        setReportingLineError(true);
        return;
      }
      if (!gm && report === Pd_Gross_Margin_Tab) {
        setGmError(true);
        return;
      }
      if (!commercialPeriod) {
        setCommercialPeriodError(true);
        return;
      }
      if (!comment) {
        setCommentError(true);
        return;
      }
      const data = {
        gm,
        reportingLine,
        cob: ss2,
        comment,
        month: `${monthArray
          .find((m) => m.id === month)
          ?.name.substring(0, 3)}`,
        pbiReportTabId: reportid,
        tabName: report,
        commercialPeriod,
        year,
        period: `${year}-${month}-01`,
        // month && month < 10 ? `${year}-0${month}-01` : `${year}-${month}-01`,
      };
      try {
        // console.log('input data', data);
        dispatch(startRequest());
        const resp = await PostPerformanceDashboard(
          data,
          dashboardid!!,
          month!!,
          year!!
        );
        const json = await resp?.json();
        console.log(json);
        if (json.fileName) {
          const MESSAGE =
            currentSubNav === 'Add'
              ? 'Comment Added Successfully'
              : 'Comment Updated Successfully';
          dispatch(successRequest(MESSAGE));
          formRef.current?.reset();
          setReportingLine('');
          setGm('');
          setCommercialPeriod('');
          setComment('');
        } else if (
          json &&
          json.ColumnName &&
          json.ErrorType === 'Data' &&
          json.CsvData &&
          json.ErrorData &&
          json.ErrorMessage
        ) {
          let newErMsg = `${UploadError} (${json.ErrorMessage})`;
          dispatch(failedRequest(newErMsg));
        } else if (json && json.ErrorMessage) {
          let newErMsg = `${UploadError} (${json.ErrorMessage})`;
          dispatch(failedRequest(newErMsg));
        } else {
          dispatch(failedRequest(UploadError));
        }
      } catch (error: any) {
        console.log(error);
        dispatch(failedRequest(error.message ?? 'Some Error!'));
      }
    },
    [
      reportingLine,
      gm,
      commercialPeriod,
      comment,
      dispatch,
      month,
      reportid,
      ss2,
      year,
      currentSubNav,
      dashboardid,
    ]
  );

  return {
    reportingLine,
    gm,
    commercialPeriod,
    year,
    reportingLineOptions,
    gmOptions,
    commercialPeriodOptions,
    // yearOptions,
    handleReportingLineChange,
    handleGmChange,
    handleCommercialPeriodChange,
    // handleYearChange,
    // handleMonthChange,
    comment,
    handleCommentChange,
    reportingLineError,
    gmError,
    commercialPeriodError,
    yearError,
    commentError,
    handleSubmit,
    formRef,
  };
};
