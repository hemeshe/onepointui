import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Styled from './styles';
import { Row, Col } from '../../../../components/grid';

import { successGetMappingHistory } from '../../../../store/mapping/actions';
import { finishLoading, failedRequest } from '../../../../store/app/actions';

import { AppStateType } from '../../../../store';

import { GetHistory } from '../../api/get-history';

export const RecentComments = () => {
  const dataMappingState = useSelector((state: AppStateType) => state.mapping);
  const dispatch = useDispatch();
  const { historyData } = dataMappingState;

  useEffect(() => {
    GetHistory(1, 5)
      .then((data) => {
        if (data) {
          data = data.slice(0, 5);
          dispatch(successGetMappingHistory(data));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(failedRequest(error.message));
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(finishLoading());
        }, 1000);
      });
  }, [dispatch]);

  const dateFormat = useCallback((d) => {
    let nd = new Date(d);
    let splitted = nd.toLocaleDateString('en-GB').split('/'); // British English uses day-month-year order;
    let dd = splitted[0].length === 1 ? `0${splitted[0]}` : splitted[0];
    let mm = splitted[1].length === 1 ? `0${splitted[1]}` : splitted[1];
    let yyyy = splitted[2];
    return `${dd}/${mm}/${yyyy}`;
  }, []);

  return (
    <Styled.Container>
      <Styled.RecentlyAdded>
        <Styled.Title>Recent Comments</Styled.Title>
        {historyData &&
          historyData.map((r, i) => (
            <Row key={r.fileName + i}>
              <Styled.RecentItem>
                <Col size={12} style={{ fontWeight: 'bold' }}>
                  {r.fileType}
                </Col>
                <Col size={12}>
                  <Styled.RecentItemDesc>{`on ${dateFormat(r.changeTime)} by ${
                    r.submittedBy
                  } `}</Styled.RecentItemDesc>
                </Col>
              </Styled.RecentItem>
            </Row>
          ))}
      </Styled.RecentlyAdded>
    </Styled.Container>
  );
};
