import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as T from '../../../../../components/table';

import { HistoryDataType } from '../../../../../types/data-ingestion';
import { sortHistoryTable } from '../../../../../store/data-ingestion/actions';
import { HistoryHeadings } from '../../../constants';

import { DateFormat } from '../../../../../components/date-format';
import { Headings } from '../../headings';
import { DefaultMsg } from '../../../../../helpers/constants';
import { failedRequest } from '../../../../../store/app/actions';

import * as Styled from './styles';

type headings = {
  id: string;
  name: string;
  sorted?: boolean;
  label: string;
};

type Props = {
  headings?: headings[];
  historyData?: HistoryDataType[];
};

export const DataTable = ({ historyData }: Props) => {
  const [headings, setHeadings] = useState<headings[]>(HistoryHeadings);

  const dispatch = useDispatch();

  const handleSortClick = useCallback(
    (h: headings) => {
      if (h && h.sorted) {
        let hds = headings?.map((el) => {
          el.sorted = false;
          return el;
        });
        setHeadings(hds);
        dispatch(sortHistoryTable(h.name, false));
      } else {
        let hds = headings?.map((el) => {
          el.sorted = true;
          return el;
        });
        setHeadings(hds);
        dispatch(sortHistoryTable(h.name, true));
      }
    },
    [dispatch, headings]
  );

  const timeFormat = useCallback((d) => {
    let nd = new Date(d);
    return nd.toLocaleTimeString();
  }, []);

  const handleShowError = useCallback(
    (d: string | undefined) => {
      let msg = d ? d : DefaultMsg;
      dispatch(failedRequest(msg));
    },
    [dispatch]
  );

  return (
    <T.Table>
      <T.THead>
        <T.TRow borderBottom='1px solid #D9D9D9'>
          <Headings headings={headings} handleSortClick={handleSortClick} />
        </T.TRow>
      </T.THead>
      <T.TBody>
        {historyData?.map((ing) => (
          <T.TRow key={ing.historyId} borderBottom='1px solid #D9D9D9'>
            <T.TD>{ing.fileName}</T.TD>
            <T.TD>{timeFormat(ing.changeTime)}</T.TD>
            <T.TD>
              {ing.changeTime && <DateFormat date={ing.changeTime} />}
            </T.TD>
            <T.TD>{ing.fileSize}</T.TD>
            <T.TD>{ing.fileType}</T.TD>
            <T.TD>{ing.classOfBusiness}</T.TD>
            <T.TD>{ing.submittedBy}</T.TD>
            <T.TD>
              {ing.fileStatus && ing.fileStatus === 'Failed' ? (
                <Styled.FailedMessage
                  onClick={() => handleShowError(ing.errorDetails)}
                >
                  {ing.fileStatus}
                </Styled.FailedMessage>
              ) : (
                ing.fileStatus
              )}
            </T.TD>
            {/* <T.TD>{ing.fileStatus}</T.TD>
            <T.TD>{ing.reasonForFailure}</T.TD> */}
          </T.TRow>
        ))}
      </T.TBody>
    </T.Table>
  );
};
