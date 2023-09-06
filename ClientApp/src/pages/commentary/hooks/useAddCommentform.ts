import { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { OptionType } from '../components/add-list/components/add-comment-form/add-comment-form';

import { Api } from '../../../helpers/api';
import { Fetch } from '../../../helpers/fetch';

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

import { PostCapEmplR1Comment } from '../api/post-cap-empl-r1-comment';
import { AppStateType } from '../../../store';

export const useAddCommentform = () => {
  let history = useHistory();
  let { year, month, ss2, reportid, dashboardid }: ParamsType = useParams();
  const [businessOptions, setBusinessOptions] = useState<OptionType[]>([]);
  const [level1TextOptions, setLevel1TextOptions] = useState<OptionType[]>([]); // landingPage based upon homepage selection
  const [aooOptions, setAooOptions] = useState<OptionType[]>([]); // cob based upon both homepage & landingPage
  const [level2TextOptions, setLevel2TextOptions] = useState<OptionType[]>([]);
  const [level3TextOptions, setLevel3TextOptions] = useState<OptionType[]>([]);
  const [pcadOptions, setPcadOptions] = useState<OptionType[]>([]); // /api/Shared/CommentaryDashboard/{pbiProfileId},  pbiProfileId: 69
  const [yearOptions, setYearOptions] = useState<OptionType[]>([]);

  const [business, setBusiness] = useState<OptionType['id']>();
  const [level1Text, setLevel1Text] = useState<OptionType['id']>();
  const [aoo, setAoo] = useState<OptionType['id']>();
  const [level2Text, setLevel2Text] = useState<OptionType['id']>();
  const [level3Text, setLevel3Text] = useState<OptionType['id']>();
  const [pcad, setPcad] = useState<OptionType['id']>();
  const [comment, setComment] = useState('');

  const [businessError, setBusinessError] = useState<boolean>(false);
  const [level1TextError, setLevel1TextError] = useState<boolean>(false);
  const [aooError, setAooError] = useState<boolean>(false);
  const [level2TextError, setLevel2TextError] = useState<boolean>(false);
  const [level3TextError, setLevel3TextError] = useState<boolean>(false);
  const [pcadError, setPcadError] = useState<boolean>(false);
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

  const getBusiness = useCallback(async () => {
    try {
      dispatch(startRequest());
      const endPoint = `/Commentary/AddFilter/CapitalEmpR1/${ss2}/${year}/${month}`; ///api/Shared/CommentaryCob/{environment}
      const data = await getData(endPoint);
      //console.log(JSON.stringify(data))
      setJson(data);
      const nd = JSON.parse(JSON.stringify(data));
      const COBOptions = createOptionsFromStringArr(nd!!, 'centralReport');
      console.log(COBOptions);
      setBusinessOptions(COBOptions);
      dispatch(finishLoading());
    } catch (error: any) {
      console.log(error);
      dispatch(failedRequest(error.message ?? 'Some error!'));
    }
  }, [createOptionsFromStringArr, getData, ss2, year, month, dispatch]);

  const getBusinessForEdit = useCallback(async () => {
    try {
      dispatch(startRequest()); ///api/Commentary/EditFilter/CapitalEmpR1/{reportTabId}/{year}/{month}
      const endPoint = `/Commentary/EditFilter/CapitalEmpR1/${reportid}/${year}/${month}`; ///api/Shared/CommentaryCob/{environment}
      const data = await getData(endPoint);
      //console.log(JSON.stringify(data))
      setJson(data);
      const nd = JSON.parse(JSON.stringify(data));
      const COBOptions = createOptionsFromStringArr(nd!!, 'business');
      console.log(COBOptions);
      setBusinessOptions(COBOptions);
      dispatch(finishLoading());
    } catch (error: any) {
      console.log(error);
      dispatch(failedRequest(error.message ?? 'Some error!'));
    }
  }, [createOptionsFromStringArr, getData, year, month, dispatch, reportid]);

  useEffect(() => {
    if (currentSubNav === 'Add') {
      getBusiness();
    }
    if (currentSubNav === 'Edit') {
      getBusinessForEdit();
    }
  }, [getBusiness, currentSubNav, getBusinessForEdit]);

  const getBusinnessVal = useCallback(
    (x: any) => {
      return currentSubNav === 'Add' ? x['centralReport'] : x['business'];
    },
    [currentSubNav]
  );

  const handleBusinessChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.currentTarget;
      console.log(value);
      const bs = businessOptions.find((x) => x.id === value);
      setLevel1TextOptions([]);
      setAooOptions([]);
      setPcadOptions([]);
      setYearOptions([]);
      setLevel2TextOptions([]);
      setLevel3TextOptions([]);
      setBusinessError(false);
      setAoo('');
      setPcad('');
      setLevel1Text('');
      setLevel2Text('');
      setLevel3Text('');
      // dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));

      if (value !== '0') {
        try {
          //dispatch(setCommentarySelects(business));
          const arr = JSON.parse(JSON.stringify(json))?.filter(
            (x: any) => getBusinnessVal(x) === bs?.name
          );
          const AooOps = createOptionsFromStringArr(arr!!, 'aoo');
          console.log(AooOps);
          setBusiness(bs?.name);
          setAooOptions(AooOps);
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [
      businessOptions,
      createOptionsFromStringArr,
      dispatch,
      json,
      getBusinnessVal,
    ]
  );

  const handleAooChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setPcadOptions([]);
      setYearOptions([]);
      setLevel1TextOptions([]);
      setLevel2TextOptions([]);
      setLevel3TextOptions([]);
      setAooError(false);
      setAoo('');
      setPcad('');
      setLevel1Text('');
      setLevel2Text('');
      setLevel3Text('');
      // dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));
      const aoo = aooOptions.find((x) => x.id === value);

      if (value !== '0') {
        try {
          setAoo(aoo?.name);
          //dispatch(setCommentarySelects(undefined, undefined, subSec2));
          const arr = json?.filter(
            (x) => getBusinnessVal(x) === business && x.aoo === aoo?.name
          );
          const pcadOps = createOptionsFromStringArr(arr!!, 'pcad');
          console.log(pcadOps);
          setPcadOptions(pcadOps);
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [
      aooOptions,
      business,
      dispatch,
      createOptionsFromStringArr,
      json,
      getBusinnessVal,
    ]
  );

  const handlePcadChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setYearOptions([]);
      setLevel1TextOptions([]);
      setLevel2TextOptions([]);
      setLevel3TextOptions([]);
      setPcadError(false);
      setLevel1Text('');
      setLevel2Text('');
      setLevel3Text('');
      const pcad = pcadOptions.find((x) => x.id === value);
      dispatch(togglePreview(false, []));
      //dispatch(startRequest());
      if (event.target.value === '0') {
        // dispatch(finishLoading());
      } else {
        //setShowPreview(true);
        try {
          setPcad(pcad?.name);
          // dispatch(
          //   setCommentarySelects(undefined, undefined, undefined, pcad)
          // );
          // const endPoint = `/Shared/CommentaryYear`;
          // const Yrs = (await getData(endPoint)).map((el: number[]) => ({
          //   id: el.toString(),
          //   name: el,
          // }));
          // console.log(Yrs);
          // setYearOptions(Yrs);
          //getReports(dashbBoard?.id);
          const arr = json?.filter(
            (x) =>
              getBusinnessVal(x) === business &&
              x.aoo === aoo &&
              x.pcad === pcad?.name
          );
          const lev1TOps = createOptionsFromStringArr(arr!!, 'level1Text');
          console.log(lev1TOps);
          setLevel1TextOptions(lev1TOps);
          // dispatch(finishLoading());
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [
      dispatch,
      pcadOptions,
      createOptionsFromStringArr,
      json,
      aoo,
      business,
      getBusinnessVal,
    ]
  );

  const handleLevel1TextChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setLevel1TextError(false);
      setLevel2TextOptions([]);
      setLevel3TextOptions([]);

      const lev1T = level1TextOptions.find((x) => x.id === value);

      if (value !== '0') {
        try {
          setLevel1Text(lev1T?.name);
          const arr = json?.filter(
            (x) =>
              getBusinnessVal(x) === business &&
              x.aoo === aoo &&
              x.pcad === pcad &&
              x.level1Text === lev1T?.name
          );
          const lev2TOps = createOptionsFromStringArr(arr!!, 'level2Text');
          console.log(lev2TOps);
          setLevel2TextOptions(lev2TOps);
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [
      business,
      level1TextOptions,
      dispatch,
      createOptionsFromStringArr,
      aoo,
      json,
      pcad,
      getBusinnessVal,
    ]
  );

  const handleLevel2TextChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setLevel2TextError(false);
      setLevel3TextOptions([]);
      const lev2T = level2TextOptions.find((x) => x.id === value);

      if (value !== '0') {
        try {
          setLevel2Text(lev2T?.name);
          // dispatch(setCommentarySelects(undefined, sec1));
          const arr = json?.filter(
            (x) =>
              getBusinnessVal(x) === business &&
              x.aoo === aoo &&
              x.pcad === pcad &&
              x.level1Text === level1Text &&
              x.level2Text === lev2T?.name
          );
          const lev3TOps = createOptionsFromStringArr(arr!!, 'level3Text');
          console.log(lev3TOps);
          setLevel3TextOptions(lev3TOps);
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [
      business,
      dispatch,
      createOptionsFromStringArr,
      aoo,
      pcad,
      level1Text,
      json,
      level2TextOptions,
      getBusinnessVal,
    ]
  );

  const handleLevel3TextChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setLevel3TextError(false);
      const lev3T = level3TextOptions.find((x) => x.id === value);

      if (value !== '0') {
        try {
          setLevel3Text(lev3T?.name);
          if (currentSubNav === 'Edit') {
            const arr = json?.filter(
              (x) =>
                getBusinnessVal(x) === business &&
                x.aoo === aoo &&
                x.pcad === pcad &&
                x.level1Text === level1Text &&
                x.level2Text === level2Text &&
                x.level3Text === lev3T?.name
            );
            const cm =
              arr && arr.length && arr[0].comment ? arr[0].comment : '';
            console.log(arr);
            setComment(String(cm));
          }
          //const lev3TOps = createOptionsFromStringArr(arr!!, "level3Text");
        } catch (error: any) {
          console.log(error);
          dispatch(failedRequest(error.message));
        }
      }
    },
    [
      level3TextOptions,
      dispatch,
      aoo,
      pcad,
      level1Text,
      level2Text,
      getBusinnessVal,
      json,
      business,
      currentSubNav,
    ]
  );

  const handleYearChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const year = event.target.value;
      //dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));
      dispatch(
        setCommentarySelects(undefined, undefined, undefined, undefined, year)
      );
      history.push(
        '/add-comment/:cobid/:cob/:ss1id/:ss1/:ss2id/:ss2/:dashboardid/:dashboard/:year/:month/:reportid/:report'
      );
    },
    [dispatch, history]
  );

  const handleMonthChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const month = event.target.value;
      //dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));
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
    },
    [dispatch]
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
      if (!business) {
        setBusinessError(true);
        return;
      }
      if (!aoo) {
        setAooError(true);
        return;
      }
      if (!pcad) {
        setPcadError(true);
        return;
      }
      if (!level1Text) {
        setLevel1TextError(true);
        return;
      }
      if (!level2Text) {
        setLevel2TextError(true);
        return;
      }
      if (!level3Text) {
        setLevel3TextError(true);
        return;
      }
      if (!comment) {
        setCommentError(true);
        return;
      }
      const data = {
        aoo,
        business,
        cob: ss2,
        comment,
        level1Text,
        level2Text,
        level3Text,
        month,
        pbiReportTabId: reportid,
        pcad,
        year,
      };
      try {
        dispatch(startRequest());
        const resp = await PostCapEmplR1Comment(
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
          setLevel1TextOptions([]);
          setLevel2TextOptions([]);
          setLevel3TextOptions([]);
          setBusiness('');
          setAoo('');
          setPcad('');
          setLevel1Text('');
          setLevel2Text('');
          setLevel3Text('');
          setComment('');
        }
      } catch (error: any) {
        console.log(error);
        dispatch(failedRequest(error.message ?? 'Some Error!'));
      }
    },
    [
      business,
      aoo,
      pcad,
      level1Text,
      level2Text,
      level3Text,
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
    business,
    level1Text,
    level2Text,
    level3Text,
    aoo,
    pcad,
    year,
    businessOptions,
    level1TextOptions,
    level2TextOptions,
    level3TextOptions,
    aooOptions,
    pcadOptions,
    yearOptions,
    handleBusinessChange,
    handleLevel1TextChange,
    handleLevel2TextChange,
    handleLevel3TextChange,
    handleAooChange,
    handlePcadChange,
    handleYearChange,
    handleMonthChange,
    comment,
    handleCommentChange,
    businessError,
    level1TextError,
    level2TextError,
    level3TextError,
    aooError,
    pcadError,
    yearError,
    commentError,
    handleSubmit,
    formRef,
  };
};
