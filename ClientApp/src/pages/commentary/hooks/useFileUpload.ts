import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import {
//   Trading_Allocation_FTE_Plan,
// } from "../../../helpers/mapping-tables-constants";

import { UploadError, AckM } from '../../../helpers/constants';

import {
  startRequest,
  failedRequest,
  successRequest,
} from '../../../store/app/actions';

import { AppStateType } from '../../../store';

import { PostCapitalEmplComFile } from '../api/post-capital-empl-com-file';
import { PostPerformanceDashboardFile } from '../api/post-performance-dashboard-file';
import { PostFinanceReportFile } from '../api/post-finance-report-file';

export const useFileUpload = () => {
  const dispatch = useDispatch();
  const commentaryState = useSelector(
    (state: AppStateType) => state.commentary
  );
  const { dashBoard, year, month } = commentaryState;
  const postfile = useCallback(
    (file) => {
      dispatch(startRequest());
      let postPromise =
        dashBoard?.name === 'Capital Employed'
          ? PostCapitalEmplComFile.bind(
              null,
              file,
              dashBoard?.id.toString(),
              year?.toString() ?? '',
              month?.toString() ?? ''
            )
          : dashBoard?.name === 'Performance Dashboard'
          ? PostPerformanceDashboardFile.bind(
              null,
              file,
              dashBoard?.id.toString(),
              year?.toString() ?? '',
              month?.toString() ?? ''
            )
          : dashBoard?.name === 'FR Pack'
          ? PostFinanceReportFile.bind(
              null,
              file,
              dashBoard?.id.toString(),
              year?.toString() ?? '',
              month?.toString() ?? ''
            )
          : null;
      try {
        if (postPromise) {
          postPromise().then((data: any) => {
            console.log(data);
            if (data && data.fileName) {
              dispatch(successRequest(AckM));
            } else if (
              data &&
              data.ColumnName &&
              data.ErrorType === 'Data' &&
              data.CsvData &&
              data.ErrorData &&
              data.ErrorMessage
            ) {
              let newErMsg = `${UploadError} (${data.ErrorMessage})`;
              dispatch(failedRequest(newErMsg));
            } else if (data && data.ErrorMessage) {
              let newErMsg = `${UploadError} (${data.ErrorMessage})`;
              dispatch(failedRequest(newErMsg));
            } else {
              dispatch(failedRequest(UploadError));
            }
          });
        }
      } catch (error: any) {
        dispatch(failedRequest(error.message));
      }
    },
    [dispatch, dashBoard, year, month]
  );
  return { postfile };
};
