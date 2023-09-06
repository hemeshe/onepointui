import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as Styled from '../common-styles';

import { setCurrentNav } from '../../../../store/app/actions';

import { useCommetaryform } from '../commentary-form/useCommetaryform';
import { setCsvTemplate } from '../../../../store/mapping/actions';
import { setCommentarySelects } from '../../../../store/commentary/actions';
import { ParamsType } from '../../../../types/app';
import { ListType } from '../../../../store/commentary/types';
import { NoAccessMain } from '../../../../components/no-access';

import {
  CapitalEmployed,
  PerformanceDashboard,
  FinanceReport,
} from '../../../../helpers/commentary-tables-constants';

import { AddCommentForm } from './components/add-comment-form';
import { PerformanceDashboardForm } from './components/performance-dashboard-form';
import { FinanceReportForm } from './components/finance-report-form';

//import { AppStateType } from "../../../../store";

export const NoAccessWrapper: React.FC = () => (
  <div style={{ display: 'block', height: '60vh', width: '100%' }}>
    <NoAccessMain />
  </div>
);

export const AddList = () => {
  //const MappingState = useSelector((state: AppStateType) => state.mapping);
  const dispatch = useDispatch();
  //const { mappingData } = MappingState;

  let {
    cob,
    cobid,
    ss1id,
    ss1,
    ss2,
    ss2id,
    dashboard,
    dashboardid,
    report,
    reportid,
    year,
    month,
  }: ParamsType = useParams();
  const { createTemplate } = useCommetaryform();

  useEffect(() => {
    dispatch(setCurrentNav('/commentary', 'Add'));
    createTemplate(dashboardid);
    const classOfBusiness: ListType = {
      id: cobid ?? '',
      name: cob ?? '',
    };
    const subSection1: ListType = {
      id: ss1id ?? '',
      name: ss1 ?? '',
    };
    const subSection2: ListType = {
      id: ss2id ?? '',
      name: ss2 ?? '',
    };
    const dashBoard: ListType = {
      id: dashboardid ?? '',
      name: dashboard ?? '',
    };
    const reportS: ListType = {
      id: reportid ?? '',
      name: report ?? '',
    };
    dispatch(
      setCommentarySelects(
        classOfBusiness,
        subSection1,
        subSection2,
        dashBoard,
        year,
        month,
        reportS
      )
    );
    return () => {
      const blank: ListType = {
        id: '',
        name: '',
      };
      dispatch(setCsvTemplate([]));
      dispatch(setCommentarySelects(blank, blank, blank, blank, '', '', blank));
    };
  }, [
    dispatch,
    createTemplate,
    dashboardid,
    cob,
    cobid,
    dashboard,
    month,
    report,
    reportid,
    ss1,
    ss1id,
    ss2,
    ss2id,
    year,
  ]);

  switch (dashboard) {
    case CapitalEmployed:
      return (
        <Styled.Container>
          <AddCommentForm />
        </Styled.Container>
      );

    case PerformanceDashboard:
      return (
        <Styled.Container>
          <PerformanceDashboardForm reportTabName={report} />
        </Styled.Container>
      );

    case FinanceReport:
      return (
        <Styled.Container>
          <FinanceReportForm reportTabName={report} />
        </Styled.Container>
      );

    default:
      return <NoAccessWrapper />;
  }

  // return (
  //   <Styled.Container>
  //     <AddCommentForm />
  //   </Styled.Container>
  // );
};
