import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCurrentNav,
  startLoading,
  finishLoading,
  failedRequest,
} from '../../../../store/app/actions';

import { OptionType, MappingFileDataType } from '../../../../types/mapping';

import {
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Trading_Allocation_Methodology_Mapping,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../../helpers/mapping-tables-constants';

import {
  requestMappingDetails,
  successMappingDetails,
  successGetClassOfBusiness,
  requestGetClassOfBusiness,
  // requestGetMappingInstructions,
  successGetMappingInstructions,
  failedGetMappingInstructions,
  setCsvTemplate,
  setMappingQueryParams,
  successGetDashboardData,
  successGetMappingHistory,
} from '../../../../store/mapping/actions';

import { GetClassOfBusiness } from '../../api/get-class-of-business';
import { GetDataMappingDetails } from '../../api/get-data-mapping-details';
import { GetDataIngestionInstructions } from '../../api/get-data-ingestion-instructions';

import { GetTaxRatePreview } from '../../api/get-tax-rate-preview';
import { GetTradingAllocFtePreview } from '../../api/get-trading-alloc-fte-preview';
import { GetMethodMapPreview } from '../../api/get-method-map-preview';
import { Get } from '../../api/get';

import { AppStateType } from '../../../../store';
import { useSnakeCase } from '../../../../hooks/useSnakeCase';
import { DateFormat } from '../../../../helpers/date-format';

export const WithMappingHelpers = <T extends object>(
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
    const [selectedMT, setSelectMT] = useState<OptionType>({
      id: '',
      name: '',
    });
    const [selectedYear, setSelectYear] = useState<number | undefined>();
    const [selectedMonth, setSelectMonth] = useState<string | undefined>();
    // const [dataMappingYears, setDataMappingYears] = useState<
    //   OptionType[] | null
    // >(null);
    const [mappingPreviewList, setIngestionPreviewList] = useState<
      MappingFileDataType[] | null
    >(null);
    const [cofError, setCofError] = useState<boolean>(false);
    const [mtError, setMtError] = useState<boolean>(false);
    const [yearError, setYearError] = useState<boolean>(false);
    const [monthError, setMonthError] = useState<boolean>(false);

    const dataMappingState = useSelector(
      (state: AppStateType) => state.mapping
    );

    const {
      classOfBusiness,
      dataMappingFileList,
      dataMappingFileInstructions,
      csvTemplate,
    } = dataMappingState;

    const appState = useSelector((state: AppStateType) => state.app);

    const { userAccess } = appState;

    const { convertToSnakeCase } = useSnakeCase();

    useEffect(() => {
      dispatch(setCurrentNav('/mapping', currentSubNav));
      dispatch(setMappingQueryParams('', '', '', ''));
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
        dispatch(successGetMappingHistory([]));
      };
    }, [dispatch]);

    const handleCOFhange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options, selectedIndex, value } = event.target;
        setIngestionPreviewList([]);
        setShowPreview(false);
        dispatch(setMappingQueryParams('', '', '', ''));
        if (value === 'Select an item from list' || value === '1') {
          setShowPreview(false);
        } else {
          //setShowPreview(true);
          setCofError(false);
          setMtError(false);
          setMonthError(false);
          setYearError(false);
          let cof = { id: value, name: options[selectedIndex].innerHTML };
          setSelectCOF(cof);
          dispatch(requestMappingDetails());
          dispatch(startLoading());
          let id = Number(value);
          GetDataMappingDetails(id, 'mapping').then((data) => {
            dispatch(finishLoading());
            dispatch(successMappingDetails(data));
          });
        }
      },
      [dispatch]
    );

    const handleMTChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options, selectedIndex, value } = event.target;
        setIngestionPreviewList([]);
        if (value === 'Select an item from list' || value === '0') {
          setShowPreview(false);
        } else {
          setCofError(false);
          setMtError(false);
          setMonthError(false);
          setYearError(false);
          let id = Number(value);
          let dif = {
            id: value,
            name: String(options[selectedIndex].innerHTML).replace(
              /\&amp;/g,
              '&'
            ),
          };
          //let dif = { id: value, name: options[selectedIndex].innerHTML };
          setShowPreview(true);
          setSelectMT(dif);
          dispatch(setMappingQueryParams('', '', dif.name, dif.id));
          if (currentSubNav !== 'View') {
            // dispatch(requestGetMappingInstructions());
            // dispatch(startLoading());
            GetDataIngestionInstructions(id)
              .then((data) => {
                if (data) {
                  dispatch(successGetMappingInstructions(data));
                  dispatch(finishLoading());
                } else {
                  dispatch(failedRequest(''));
                  dispatch(failedGetMappingInstructions());
                }
              })
              .catch((error) => console.log(error));

            Get(`/Shared/Dashboard/${id}`)
              .then((data) => {
                console.log(data);
                dispatch(successGetDashboardData('', '', data));
              })
              .catch((error) => console.log(error));
          }
          dispatch(startLoading());

          let PreviewPromise =
            dif.name === Trading_Allocation_Methodology_Mapping
              ? GetMethodMapPreview.bind(null)
              : dif.name === Trading_Allocation_Dollar_Per_Barrel_USD
              ? Get.bind(null, '/Mapping/Preview/UsdBbl')
              : dif.name === Le_Sfs_Codes
              ? Get.bind(null, `/Mapping/Preview/LeSfsCode/${selectedCOF.name}`)
              : dif.name === Report_Freeze_Map
              ? Get.bind(
                  null,
                  `/Mapping/Preview/ControlFrzTime/${selectedCOF.name}`
                )
              : null;
          if (PreviewPromise) {
            PreviewPromise()
              .then((data) => {
                if (data && data.length) {
                  const ifd = JSON.parse(JSON.stringify(data));
                  ifd.forEach((el: any) => {
                    for (var key in el) {
                      if (key.toUpperCase() !== key) {
                        if (
                          key === 'loadDate' ||
                          key === 'reportingDate' ||
                          key === 'loadDate' ||
                          key === 'reportingDate' ||
                          key === 'validFrom' ||
                          key === 'validTo'
                        ) {
                          el[convertToSnakeCase(key)] = DateFormat(el[key]);
                        } else {
                          el[convertToSnakeCase(key)] = el[key];
                        }
                        delete el[key];
                        delete el['ID'];
                        delete el['id'];
                      }
                    }
                  });

                  dispatch(setCsvTemplate([ifd[0]]));
                  setIngestionPreviewList(data);
                  dispatch(finishLoading());
                } else {
                  dispatch(
                    failedRequest(`No data available for ${selectedCOF.name}`)
                  );
                  setIngestionPreviewList([]);
                }
              })
              .catch((e) => dispatch(failedRequest(e.message)));
          }
        }
      },
      [dispatch, selectedCOF.name, convertToSnakeCase]
    );

    const validateView = (event: React.MouseEvent<HTMLAnchorElement>) => {
      setCofError(false);
      setMtError(false);
      setMonthError(false);
      setYearError(false);
      if (!selectedMT.id || !selectedCOF.id) {
        event.preventDefault();
        if (!selectedMT.id) {
          setMtError(true);
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
          setMtError(false);
          setMonthError(false);
          setYearError(false);
          let y = Number(event.target.value);
          setSelectYear(y);
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
          setMtError(false);
          setMonthError(false);
          setYearError(false);
          let m = event.target.value;
          setSelectMonth(m);
        }
      },
      []
    );
    return (
      <WrappedComponent
        {...props}
        classOfBusiness={classOfBusiness}
        dataMappingFileList={dataMappingFileList}
        handleCOFhange={handleCOFhange}
        handleMTChange={handleMTChange}
        handleYearChange={handleYearChange}
        handleMonthChange={handleMonthChange}
        cofError={cofError}
        mtError={mtError}
        yearError={yearError}
        monthError={monthError}
        mappingPreviewList={mappingPreviewList}
        validateView={validateView}
        selectedCOF={selectedCOF}
        selectedMT={selectedMT}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        showPreview={showPreview}
        dataMappingFileInstructions={dataMappingFileInstructions}
        csvTemplate={csvTemplate}
        userAccess={userAccess}
      />
    );
  };
  return HOC;
};
