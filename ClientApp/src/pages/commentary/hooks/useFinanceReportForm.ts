import { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { OptionType } from '../components/add-list/components/finance-report-form/finance-report-form';

import { Api } from '../../../helpers/api';
import { Fetch } from '../../../helpers/fetch';

import {
  Fr_Odc_Tab,
  Fr_Erp_R1_Tab,
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

import { PostFinanceReport } from '../api/post-finance-report';
import { AppStateType } from '../../../store';
import { monthArray } from '../../../helpers/month';
import { UploadError } from '../../../helpers/constants';

export const useFinanceReportForm = () => {
  let history = useHistory();
  let { year, month, ss2, reportid, dashboardid, report }: ParamsType =
    useParams();
  const [aooOptions, setAooOptions] = useState<OptionType[]>([]);
  const [scoaOptions, setScoaOptions] = useState<OptionType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]); // cob based upon both homepage & landingPage
  const [comparisonPeriodOptions, setComparisonPeriodOptions] = useState<
    OptionType[]
  >([]); // /api/Shared/CommentaryDashboard/{pbiProfileId},  pbiProfileId: 69

  const [aoo, setAoo] = useState<OptionType['id']>();
  const [scoa, setScoa] = useState<OptionType['id']>();
  const [category, setCategory] = useState<OptionType['id']>();
  const [comparisonPeriod, setComparisonPeriod] = useState<OptionType['id']>();
  const [comment, setComment] = useState('');

  const [aooError, setAooError] = useState<boolean>(false);
  const [scoaError, setScoaError] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [comparisonPeriodError, setComparisonPeriodError] =
    useState<boolean>(false);
  const [commentError, setCommentError] = useState<boolean>(false);
  const [json, setJson] = useState<CommentaryDataType[]>();
  const [erpR1Json, setErpR1Json] = useState<CommentaryDataType[]>();

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

  const getAoo = useCallback(async () => {
    try {
      dispatch(startRequest());
      if (report === Fr_Erp_R1_Tab) {
        const erpR1EndPoint = `/Commentary/AddFilter/FinanceReportErpR1/${year}/${month}`;
        const erpR1Data = await getData(erpR1EndPoint);
        setErpR1Json(erpR1Data);
        const erpR1Nd = JSON.parse(JSON.stringify(erpR1Data));
        const erpR1AooOps = createOptionsFromStringArr(erpR1Nd!!, 'aoo');
        // console.log('ERP R1 Aoo values', erpR1AooOps);
        setAooOptions(erpR1AooOps);
      } else {
        const endPoint = `/Commentary/AddFilter/FinanceReport/${report}/${ss2}`; ///api/Shared/CommentaryCob/{environment}
        const data = await getData(endPoint);
        const aooEndPoint = `/Commentary/AddFilter/FinanceReportAoo`; ///api/Shared/CommentaryCob/{environment}
        const aooData = await getData(aooEndPoint);
        const aooJson = aooData.map((y: string) => {
          return {
            id: y,
            name: y.toString(),
          };
        });
        setAooOptions(aooJson);
        // console.log('Add Filter Response', JSON.stringify(data));
        setJson(data);
        const nd = JSON.parse(JSON.stringify(data));
        const comparisonPeriodOps = createOptionsFromStringArr(
          nd!!,
          'comparisonPeriod'
        );
        setComparisonPeriodOptions(comparisonPeriodOps);
      }
      dispatch(finishLoading());
    } catch (error: any) {
      console.log(error);
      dispatch(failedRequest(error.message ?? 'Some error!'));
    }
  }, [createOptionsFromStringArr, getData, ss2, report, dispatch, year, month]);

  const getAooForEdit = useCallback(async () => {
    try {
      dispatch(startRequest()); ///api/Commentary/EditFilter/CapitalEmpR1/{reportTabId}/{year}/{month}
      const endPoint = `/Commentary/EditFilter/FinanceReport/${reportid}/${ss2}/${year}/${month}`; ///api/Shared/CommentaryCob/{environment}
      const data = await getData(endPoint);
      //console.log(JSON.stringify(data))
      setJson(data);
      const nd = JSON.parse(JSON.stringify(data));
      const aooOptions = createOptionsFromStringArr(nd!!, 'aoo');
      const comparisonPeriodOps = createOptionsFromStringArr(
        nd!!,
        'comparisonPeriod'
      );
      // console.log(RLOptions);
      setAooOptions(aooOptions);
      // setGmOptions(GmOps);
      // console.log('CP Options', commercialPeriodOps);
      setComparisonPeriodOptions(comparisonPeriodOps);
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
      getAoo();
    }
    if (currentSubNav === 'Edit') {
      getAooForEdit();
    }
  }, [getAoo, currentSubNav, getAooForEdit]);

  const handleAooChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.currentTarget;
      // console.log('Aoo Selected value', value);
      const aoo = aooOptions.find((x) => x.id === value);
      setScoaOptions([]);
      setCategoryOptions([]);
      setComparisonPeriodOptions([]);
      setAooError(false);
      setScoa('');
      setCategory('');
      setComparisonPeriod('');
      setComment('');

      if (value !== '0') {
        try {
          if (report === Fr_Erp_R1_Tab) {
            if (currentSubNav === 'Edit') {
              const arr = JSON.parse(JSON.stringify(json))?.filter(
                (x: any) => x.aoo === aoo?.name
              );
              const ScoaOps = createOptionsFromStringArr(arr!!, 'scoa');
              setScoaOptions(ScoaOps);
              setAoo(aoo?.name);
            } else {
              const arr = JSON.parse(JSON.stringify(erpR1Json))?.filter(
                (x: any) => x.aoo === aoo?.name
              );
              const ScoaOps = createOptionsFromStringArr(arr!!, 'scoa');
              setScoaOptions(ScoaOps);
              setAoo(aoo?.name);
            }
            // const arr = JSON.parse(JSON.stringify(erpR1Json))?.filter(
            //   (x: any) => x.aoo === aoo?.name
            // );
            // const ScoaOps = createOptionsFromStringArr(arr!!, 'scoa');
            // setScoaOptions(ScoaOps);
            // setAoo(aoo?.name);
          } else {
            const nd = JSON.parse(JSON.stringify(json));
            if (Fr_Odc_Tab === report) {
              const categoryOptions = createOptionsFromStringArr(
                nd!!,
                'category'
              );
              setCategoryOptions(categoryOptions);
            }
            setAoo(aoo?.name);
            const comparisonPeriodOps = createOptionsFromStringArr(
              nd!!,
              'comparisonPeriod'
            );
            setComparisonPeriodOptions(comparisonPeriodOps);
          }
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      } else setAoo(aoo?.name);
    },
    [
      aooOptions,
      createOptionsFromStringArr,
      dispatch,
      json,
      erpR1Json,
      categoryOptions,
      comparisonPeriodOptions,
    ]
  );

  const handleScoaChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setScoaError(false);
      setScoa('');
      setComment('');
      // console.log('SCOA ID Value', value);
      const scoa = scoaOptions.find((x) => x.id === value);

      dispatch(togglePreview(false, []));
      //dispatch(startRequest());
      if (value !== '0') {
        try {
          setScoa(scoa?.name);
          if (currentSubNav === 'Edit') {
            const nd = json?.filter(
              (x) => x.aoo === aoo && x.scoa === scoa?.name
            );
            // const commentOptions = createOptionsFromStringArr(nd!!, 'comment');
            let commentData = nd!![0].comment;
            if (commentData !== undefined) setComment(commentData);
          }
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      } else setScoa(scoa?.name);
    },
    [dispatch, scoaOptions, createOptionsFromStringArr, erpR1Json, aoo]
  );

  const handleCategoryChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setComparisonPeriodOptions([]);
      // setYearOptions([]);
      setCategoryError(false);
      setCategory('');
      setComparisonPeriod('');
      setComment('');
      // dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));
      const category = categoryOptions.find((x) => x.id === value);

      if (value !== '0') {
        try {
          setCategory(category?.name);
          //dispatch(setCommentarySelects(undefined, undefined, subSec2));
          //   const arr = json?.filter(
          //     (x) => getReportingLineVal(x) === reportingLine && x.gm === gm?.name
          //   );
          const nd = JSON.parse(JSON.stringify(json));
          const commercialPeriodOps = createOptionsFromStringArr(
            nd!!,
            'comparisonPeriod'
          );
          // console.log('CP Options', commercialPeriodOps);
          setComparisonPeriodOptions(commercialPeriodOps);
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      } else setCategory(category?.name);
    },
    [
      categoryOptions,
      aoo,
      dispatch,
      createOptionsFromStringArr,
      json,
      // getReportingLineVal,
      comparisonPeriodOptions,
    ]
  );

  const handleComparisonPeriodChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      // setYearOptions([]);
      setComparisonPeriodError(false);
      setComment('');
      const comparisonPeriod = comparisonPeriodOptions.find(
        (x) => x.id === value
      );
      dispatch(togglePreview(false, []));
      //dispatch(startRequest());
      if (event.target.value !== '0') {
        try {
          setComparisonPeriod(comparisonPeriod?.name);
          if (currentSubNav === 'Edit') {
            if (report === Fr_Odc_Tab) {
              const nd = json?.filter(
                (x) =>
                  x.comparisonPeriod === comparisonPeriod?.name &&
                  x.aoo === aoo &&
                  x.category === category
              );
              // const commentOptions = createOptionsFromStringArr(
              //   nd!!,
              //   'comment'
              // );
              let commentData = nd!![0].comment;
              if (commentData !== undefined) setComment(commentData);
              // console.log('First if', commentData);
            } else {
              const nd = json?.filter(
                (x) =>
                  x.comparisonPeriod === comparisonPeriod?.name && x.aoo === aoo
              );
              // const commentOptions = createOptionsFromStringArr(
              //   nd!!,
              //   'comment'
              // );
              let commentData = nd!![0].comment;
              if (commentData !== undefined) setComment(commentData);
              // console.log('Last else if', commentData);
            }
          }
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      } else setComparisonPeriod(comparisonPeriod?.name);
    },
    [
      dispatch,
      comparisonPeriodOptions,
      createOptionsFromStringArr,
      json,
      category,
      aoo,
      //   getReportingLineVal,
    ]
  );

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
      if (!aoo) {
        setAooError(true);
        return;
      }
      if (!scoa && report === Fr_Erp_R1_Tab) {
        setScoaError(true);
        return;
      }
      if (!category && report === Fr_Odc_Tab) {
        setCategoryError(true);
        return;
      }
      if (!comparisonPeriod && report !== Fr_Erp_R1_Tab) {
        setComparisonPeriodError(true);
        return;
      }
      if (!comment) {
        setCommentError(true);
        return;
      }
      const data = {
        category,
        aoo,
        scoa,
        cob: ss2,
        comment,
        month: `${monthArray
          .find((m) => m.id === month)
          ?.name.substring(0, 3)}`,
        pbiReportTabId: reportid,
        tabName: report,
        comparisonPeriod,
        year,
        period: `${year}-${month}-01`,
        // month && month < 10 ? `${year}-0${month}-01` : `${year}-${month}-01`,
      };
      try {
        dispatch(startRequest());
        const resp = await PostFinanceReport(
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
          setAoo('');
          setScoa('');
          setCategory('');
          setComparisonPeriod('');
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
      aoo,
      scoa,
      category,
      comparisonPeriod,
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
    aoo,
    scoa,
    category,
    comparisonPeriod,
    year,
    aooOptions,
    scoaOptions,
    categoryOptions,
    comparisonPeriodOptions,
    handleAooChange,
    handleScoaChange,
    handleCategoryChange,
    handleComparisonPeriodChange,
    comment,
    handleCommentChange,
    aooError,
    scoaError,
    categoryError,
    comparisonPeriodError,
    commentError,
    handleSubmit,
    formRef,
  };
};
