import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  OptionType,
  IngestionFileDataType,
} from '../../../../types/data-ingestion';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
  Ccpn,
} from '../../../../helpers/ingestion-tables-constants';

import {
  requestDataIngestionDetails,
  successDataIngestionDetails,
  successGetClassOfBusiness,
  requestGetClassOfBusiness,
  requestGetDataIngestionInstructions,
  successGetDataIngestionInstructions,
  setCsvTemplate,
  setDataIngestionQueryParams,
  successGetIngestionHistory,
  successGetDataIngestionData,
  setSearchIngestionData,
  updateCompanyCodeSelection,
} from '../../../../store/data-ingestion/actions';
import {
  setCurrentNav,
  startLoading,
  finishLoading,
  failedRequest,
} from '../../../../store/app/actions';

import { GetClassOfBusiness } from '../../api/get-class-of-business';
import { GetDataIngestionDetails } from '../../api/get-data-ingestion-details';
import { GetDataIngestionInstructions } from '../../api/get-data-ingestion-instructions';
//import { GetDataIngestionYears } from "../../api/get-data-ingestion-years";
import { Get } from '../../api/get';

import { AppStateType } from '../../../../store';

import { useGetIngestionYears } from '../../hooks/useGetIngestionYears';
import { useCreateCsvData } from '../../hooks/useCreateCsvData';

//import { DateFormat } from "../../../../helpers/date-format";

export const WithIngestionHelpers = <T extends object>(
  WrappedComponent: React.JSXElementConstructor<T>,
  currentSubNav: string
) => {
  const HOC = (props: T) => {
    const dispatch = useDispatch();
    const [showPreview, setShowPreview] = useState(false);
    const [selectedCOF, setSelectCOF] = useState<OptionType>({
      id: '',
      name: '',
    });
    const [selectedDIF, setSelectDIF] = useState<OptionType>({
      id: '',
      name: '',
    });
    const [selectedYear, setSelectYear] = useState<number | undefined>();
    const [selectedMonth, setSelectMonth] = useState<string | undefined>();
    const [selectedQuarter, setSelectQuarter] = useState<number | undefined>();
    const [dataIngestionYears, setDataIngestionYears] = useState<
      OptionType[] | null
    >(null);
    const [ingstionPreviewList, setIngestionPreviewList] = useState<
      IngestionFileDataType[] | null
    >(null);
    const [cofError, setCofError] = useState<boolean>(false);
    const [difError, setDifError] = useState<boolean>(false);
    const [yearError, setYearError] = useState<boolean>(false);
    const [monthError, setMonthError] = useState<boolean>(false);
    const [quarterError, setQuarterError] = useState<boolean>(false);

    const dataIngestionState = useSelector(
      (state: AppStateType) => state.dataIngestion
    );

    const {
      classOfBusiness,
      dataIngestionFileList,
      dataIngestionFileInstructions,
      csvTemplate,
      companyCodeSel,
    } = dataIngestionState;

    const appState = useSelector((state: AppStateType) => state.app);

    const { userAccess } = appState;

    const { getIngestionYears } = useGetIngestionYears();
    const { createCsvData } = useCreateCsvData();

    useEffect(() => {
      dispatch(setCurrentNav('/data-ingestion', currentSubNav));
      dispatch(setDataIngestionQueryParams('', '', '', '', '', '', ''));
      dispatch(requestGetClassOfBusiness());
      dispatch(startLoading());
      GetClassOfBusiness()
        .then((cob) => {
          if (cob) {
            dispatch(finishLoading());
            dispatch(successGetClassOfBusiness(cob));
          }
        })
        .catch((error) => dispatch(failedRequest(error.message)));

      return () => {
        dispatch(successGetIngestionHistory([]));
        dispatch(successGetDataIngestionData([]));
        dispatch(setSearchIngestionData([]));
        dispatch(setCsvTemplate([]));
      };
    }, [dispatch]);

    const handleCOFhange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options, selectedIndex, value } = event.target;
        setIngestionPreviewList([]);
        setDataIngestionYears([]);
        setSelectYear(undefined);
        setSelectMonth(undefined);
        setSelectQuarter(undefined);
        dispatch(setDataIngestionQueryParams('', '', '', '', '', '', ''));
        setShowPreview(false);
        if (value === '0') {
          setShowPreview(false);
        } else {
          //setShowPreview(true);
          setCofError(false);
          setDifError(false);
          setMonthError(false);
          setQuarterError(false);
          setYearError(false);
          let cof = { id: value, name: options[selectedIndex].innerHTML };
          console.log(cof);
          setSelectCOF(cof);
          dispatch(requestDataIngestionDetails());
          dispatch(startLoading());
          let id = Number(value);
          GetDataIngestionDetails(id, 'data ingestion').then((data) => {
            dispatch(finishLoading());
            dispatch(successDataIngestionDetails(data));
          });
        }
      },
      [dispatch]
    );

    const handleDIFChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options, selectedIndex, value } = event.target;
        setIngestionPreviewList([]);
        setDataIngestionYears([]);
        setSelectYear(undefined);
        setSelectMonth(undefined);
        setSelectQuarter(undefined);
        dispatch(setDataIngestionQueryParams('', '', '', '', '', '', ''));
        setShowPreview(false);
        if (value === '0') {
          setShowPreview(false);
        } else {
          setCofError(false);
          setDifError(false);
          setMonthError(false);
          setQuarterError(false);
          setYearError(false);
          let id = Number(value);
          let dif = {
            id: value,
            name: String(options[selectedIndex].innerHTML).replace(
              /\&amp;/g,
              '&'
            ),
          };
          setShowPreview(true);
          setSelectDIF(dif);
          dispatch(
            setDataIngestionQueryParams('', '', dif.name, dif.id, '', '', '')
          );

          // if (currentSubNav !== 'View') {
          //   dispatch(requestGetDataIngestionInstructions());
          //   GetDataIngestionInstructions(id)
          //     .then((data) => {
          //       if (data) {
          //         dispatch(successGetDataIngestionInstructions(data));
          //       } else {
          //         dispatch(
          //           failedRequest(
          //             'Server Error. Ingestion Instructions Request Failed'
          //           )
          //         );
          //       }
          //     })
          //     .catch((e) => alert('Some Error'));
          // }
          dispatch(startLoading());
          getIngestionYears(selectedCOF.name, dif.id, dif.name, selectedDIF.id)
            .then((data) => {
              console.log(data);
              setDataIngestionYears(data);
            })
            .catch((error) => console.log(error));

          // if (dif.name === "Other Contributions") {
          //   GetDataIngestionYears()
          //     .then((data) => {
          //       if (data) {
          //         setDataIngestionYears(data);
          //       }
          //     })
          //     .catch((e) => alert("Some Error"));
          // }
          let PreviewPromise =
            dif.name === SopusO1F
              ? Get.bind(
                  null,
                  `/DataIngestion/Preview/SopusO1F/${selectedCOF.name}`
                )
              : dif.name === VolumeNumerator
              ? Get.bind(
                  null,
                  `/DataIngestion/Preview/VolNumerator/${selectedCOF.name}`
                )
              : dif.name === TaWorkingCapital
              ? Get.bind(
                  null,
                  `/DataIngestion/Preview/WorkingCapital/${selectedCOF.name}`
                )
              : dif.name === Ccpn
              ? Get.bind(null, `/DataIngestion/Preview/Ccpn`)
              : null;
          if (PreviewPromise) {
            PreviewPromise()
              .then((data) => {
                if (data) {
                  const ifd = createCsvData(data, dif.name);
                  dispatch(setCsvTemplate([ifd[0]]));
                  setIngestionPreviewList(data);
                }
              })
              .catch((e) => dispatch(failedRequest(e.message)));
          }
        }
      },
      [dispatch, selectedCOF, createCsvData, getIngestionYears, selectedDIF.id]
    );

    const validateView = (event: React.MouseEvent<HTMLAnchorElement>) => {
      setCofError(false);
      setDifError(false);
      setMonthError(false);
      setQuarterError(false);
      setYearError(false);
      if (
        !selectedDIF.id ||
        !selectedCOF.id ||
        // !selectedMonth ||
        !selectedQuarter ||
        !selectedYear
      ) {
        event.preventDefault();
        if (!selectedDIF.id) {
          setDifError(true);
        }
        if (!selectedCOF.id) {
          setCofError(true);
        }
        if (!selectedMonth && selectedDIF.name !== Ccpn) {
          setMonthError(true);
        }
        if (!selectedQuarter && selectedDIF.name === Ccpn) {
          setQuarterError(true);
        }
        if (!selectedYear) {
          setYearError(true);
        }
      }
    };

    const validateConfigure = (event: React.MouseEvent<HTMLAnchorElement>) => {
      setCofError(false);
      setDifError(false);
      setMonthError(false);
      setYearError(false);
      if (!selectedDIF.id || !selectedCOF.id) {
        event.preventDefault();
        if (!selectedDIF.id) {
          setDifError(true);
        }
        if (!selectedCOF.id) {
          setCofError(true);
        }
      }
    };

    const handleYearChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === 'Select year') {
          setSelectYear(undefined);
        } else {
          setCofError(false);
          setDifError(false);
          setMonthError(false);
          setQuarterError(false);
          setYearError(false);
          let y = Number(event.target.value);
          console.log('selected year', y);
          setSelectYear(y);
          console.log('after selected year', selectedYear);
        }
      },
      []
    );

    const handleMonthChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === 'Select month') {
          setSelectMonth(undefined);
        } else {
          setCofError(false);
          setDifError(false);
          setMonthError(false);
          setYearError(false);
          let m = event.target.value;
          setSelectMonth(m);
        }
      },
      []
    );

    const handleQuarterChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === 'Select quarter') {
          setSelectQuarter(undefined);
        } else {
          setCofError(false);
          setDifError(false);
          setMonthError(false);
          setQuarterError(false);
          setYearError(false);
          let q = Number(event.target.value);
          console.log('selected quarter', q);
          setSelectQuarter(q);
          console.log('after selected quarter', selectedQuarter);
        }
      },
      []
    );

    const handleCompCodeChange = useCallback(
      (
        event: React.ChangeEvent<HTMLInputElement>
        // id: string,
        // key: keyof User,
        // newUser: User[]
      ) => {
        // console.log(newUser);
        const { value, checked } = event.target;
        const lpId = Number(value);
        // const usr = newUser.filter((nu) => nu.id === id)[0];
        // console.log(usr);
        console.log('checked detail:', checked);
        console.log(value);
        // const { landingPage1 } = usr;
        let newlandingPage1: number[];
        if (checked && companyCodeSel) {
          // console.log('before selected company code:', companyCodeSel);
          newlandingPage1 = [...companyCodeSel, lpId];
          // console.log('Inside checked:', newlandingPage1);
          dispatch(updateCompanyCodeSelection(newlandingPage1));
          // console.log('after selected company code:', companyCodeSel);
        } else if (!checked && companyCodeSel) {
          // console.log('before selected !company code:', companyCodeSel);
          newlandingPage1 = companyCodeSel.filter((lp) => lp !== lpId);
          // console.log('Inside !checked:', newlandingPage1);
          dispatch(updateCompanyCodeSelection(newlandingPage1));
          // console.log('after selected !company code:', companyCodeSel);
        }
      },
      [dispatch, companyCodeSel]
    );
    return (
      <WrappedComponent
        {...props}
        classOfBusiness={classOfBusiness}
        dataIngestionFileList={dataIngestionFileList}
        handleCOFhange={handleCOFhange}
        handleDIFChange={handleDIFChange}
        dataIngestionYears={dataIngestionYears}
        handleYearChange={handleYearChange}
        handleMonthChange={handleMonthChange}
        handleQuarterChange={handleQuarterChange}
        handleCompCodeChange={handleCompCodeChange}
        cofError={cofError}
        difError={difError}
        yearError={yearError}
        monthError={monthError}
        quarterError={quarterError}
        ingstionPreviewList={ingstionPreviewList}
        validateView={validateView}
        selectedCOF={selectedCOF}
        selectedDIF={selectedDIF}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedQuarter={selectedQuarter}
        showPreview={showPreview}
        dataIngestionFileInstructions={dataIngestionFileInstructions}
        csvTemplate={csvTemplate}
        userAccess={userAccess}
        validateConfigure={validateConfigure}
        companyCodeSel={companyCodeSel}
      />
    );
  };
  return HOC;
};
