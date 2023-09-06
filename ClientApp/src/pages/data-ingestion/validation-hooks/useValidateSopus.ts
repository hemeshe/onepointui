import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useValidateInput } from "../../../hooks/useValidateInput/useValidateInput";

import { failedRequest } from "../../../store/app/actions";

import { IngestionFileDataType } from "../../../types/data-ingestion";

export const useValidateSopus = () => {
  const dispatch = useDispatch();
  const { isEmpty } = useValidateInput();
  const validateSopus = useCallback(
    (nM: IngestionFileDataType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (isEmpty(element.reportingDate)) {
          dispatch(failedRequest("Invalid Reporting Date input!"));
          return true;
        } else if (isEmpty(element.pnlDescription)) {
          dispatch(failedRequest("Invalid Pnl Description input!"));
          return true;
        } else if (isEmpty(element.businessUnit)) {
          dispatch(failedRequest("Invalid Business Unit input!"));
          return true;
        } else if (isEmpty(element.entityNm)) {
          dispatch(failedRequest("Invalid Entity Nm input!"));
          return true;
        } else if (isEmpty(element.region)) {
          dispatch(failedRequest("Invalid region input!"));
          return true;
        } else if (isEmpty(element.deskNm)) {
          dispatch(failedRequest("Invalid  Desk Nm input!"));
          return true;
        } else if (element.amount && isNaN(Number(element.amount))) {
          dispatch(failedRequest("Invalid Amount input!"));
          return true;
        } else if (
          element.actualPlanFlgMthO1f &&
          isNaN(element.actualPlanFlgMthO1f)
        ) {
          dispatch(failedRequest("Invalid Actual Plan FlgMthO1f input!"));
          return true;
        } 
        // else if (isEmpty(element.planPeriod)) {
        //   dispatch(failedRequest("Invalid Plan Period input!"));
        //   return true;
        // }

        return false;
      });
      return isInvalid;
    },
    [dispatch, isEmpty]
  );

  const validateSopusConfig = useCallback(
    (nM: IngestionFileDataType[]): boolean => {
      let isInvalid: boolean = false;
      isInvalid = nM.some((element) => {
        if (element.pnlDescription === "" || !element.pnlDescription) {
          dispatch(failedRequest("Invalid Pnl Description input!"));
          return true;
        // } else if (element.businessUnit === "" || !element.businessUnit) {
        //   dispatch(failedRequest("Invalid Business Unit input!"));
        //   return true;
        } else if (!element.entityNm || element.entityNm === "") {
          dispatch(failedRequest("Invalid Entity Nm input!"));
          return true;
        } else if (element.region === "" || !element.region) {
          dispatch(failedRequest("Invalid region input!"));
          return true;
        } else if (element.deskNm === "" || !element.deskNm) {
          dispatch(failedRequest("Invalid Desk Nm input!"));
          return true;
        } 
        // else if (!element.planPeriod || element.planPeriod === "") {
        //   dispatch(failedRequest("Invalid Plan Period input!"));
        //   return true;
        // }

        return false;
      });
      return isInvalid;
    },
    [dispatch]
  );
  return { validateSopus, validateSopusConfig };
};
