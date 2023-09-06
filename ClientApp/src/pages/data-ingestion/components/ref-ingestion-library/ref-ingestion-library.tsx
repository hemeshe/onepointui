import React, { useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Styled from "./styles";
import { Row, Col } from "../../../../components/grid";

import { AppStateType } from "../../../../store";

import { GetDataIngestionHistory } from "../../api/get-history";

import {
  finishLoading,
  startRequest,
  failedRequest,
} from "../../../../store/app/actions";
import { successGetIngestionHistory } from "../../../../store/data-ingestion/actions";

type Props = {
  viewType: string;
};

export const RefIngestionLibrary = memo(({ viewType }: Props) => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const dispatch = useDispatch();
  const { historyData } = dataIngestionState;

  useEffect(() => {
    dispatch(startRequest());
    GetDataIngestionHistory(1, 1, 5)
      .then((data) => {
        if (data) {
          data = data.slice(0, 5);
          dispatch(successGetIngestionHistory(data));
          dispatch(finishLoading());
        }
      })
      .catch((error) => {
        dispatch(failedRequest(error.message));
      });
  }, [dispatch]);

  const dateFormat = useCallback((d) => {
    let nd = new Date(d);
    let splitted = nd.toLocaleDateString("en-GB").split("/"); // British English uses day-month-year order;
    let dd = splitted[0].length === 1 ? `0${splitted[0]}` : splitted[0];
    let mm = splitted[1].length === 1 ? `0${splitted[1]}` : splitted[1];
    let yyyy = splitted[2];
    return `${dd}/${mm}/${yyyy}`;
  }, []);

  return (
    <Styled.Container>
      <Styled.RecentlyAdded>
        <Styled.Title>Recently Added</Styled.Title>
        {historyData &&
          historyData.map((r, i) => (
            <Row key={r.fileName + i}>
              <Styled.RecentItem data-testid="recenty-added">
                <Col
                  size={12}
                  style={{ fontWeight: "bold" }}
                  data-testid="recent-item-name"
                >
                  {r.fileType}
                </Col>
                <Col size={12}>
                  <Styled.RecentItemDesc>{`${dateFormat(r.changeTime)} by ${
                    r.submittedBy
                  } `}</Styled.RecentItemDesc>
                </Col>
              </Styled.RecentItem>
            </Row>
          ))}
      </Styled.RecentlyAdded>
    </Styled.Container>
  );
});
