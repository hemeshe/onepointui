import React, { useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as Styled from './styles';

import { Container } from '../../components/container';
import { Header } from '../../components/header';
import { HeaderContent } from '../../components/header-content';
import { Row, Col } from '../../components/grid';

import { setCurrentNav } from '../../store/app/actions';

import { AppStateType } from '../../store';

export const Home = memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector((state: AppStateType) => state.oidc);
  const { user } = authState;

  useEffect(() => {
    dispatch(setCurrentNav('/home'));
  }, [dispatch]);

  const handleRouteClick = useCallback(
    (r, event) => {
      event.preventDefault();
      history.push(r);
      console.log(user);
    },
    [history, user]
  );
  return (
    <Container fluid>
      <Header fixed>
        <Container fluid>
          {' '}
          <HeaderContent />
        </Container>
      </Header>
      <Styled.Main>
        <Row>
          <Col size={12}>
            <Styled.HomeTitle>T&S OnePoint Portal</Styled.HomeTitle>
          </Col>
          <Col size={12}>
            <Styled.HomeContent>
              <Styled.HomePara>
                The T&S OnePoint Portal has been developed as the front-end
                interface between select users and the T&S data platform. The
                key areas have been categorized into the following:
              </Styled.HomePara>
            </Styled.HomeContent>
          </Col>
        </Row>

        <Row style={{ marginTop: '20px' }}>
          {/* <Col size={4}>
            <Styled.Box>
              <Styled.BoxContent>
                <Row justifyContentRight>
                  <Col size={6}>
                    <Styled.BoxImage src="/home-images/Commentary.png" alt="" />
                  </Col>
                  <Col style={{ height: "100px" }} size={6}>
                    <Styled.BoxTitle to="/commentary">
                      Commentary:
                    </Styled.BoxTitle>
                  </Col>
                </Row>
                <Row>
                  <Col size={12} alignItemsCenter>
                    <Styled.MiddleContent
                      style={{
                        height: "170px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Styled.HomePara>
                        Supplement the existing reporting and visualization with
                        explanations and business insights. These observations
                        should enable business leaders to appraise and steer
                        their business.
                      </Styled.HomePara>
                    </Styled.MiddleContent>
                  </Col>
                </Row>
                <Styled.Footer>
                  <Styled.Button
                    onClick={(e) => handleRouteClick("/commentary", e)}
                  >
                    Get Started
                  </Styled.Button>
                </Styled.Footer>
              </Styled.BoxContent>
            </Styled.Box>
          </Col> */}

          <Col size={6}>
            <Styled.Box>
              <Styled.BoxContent>
                <Row justifyContentRight>
                  <Col size={6}>
                    <Styled.BoxImage src='/home-images/mapping.png' alt='' />
                  </Col>
                  <Col size={6} style={{ height: '80px' }}>
                    <Styled.BoxTitle to='/mapping'>Mapping:</Styled.BoxTitle>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <Styled.MiddleContent>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>View:</Styled.HomeParaTitle>
                        Outlines current configuration of mapping tables
                        established.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Add:</Styled.HomeParaTitle>
                        Include additional data into mapping tables.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Edit:</Styled.HomeParaTitle>
                        Allows users to modify existing mapping tables.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Library:</Styled.HomeParaTitle>
                        Identifies dashboards utilizing mapping tables for
                        various T&S reports and visualisations.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>History:</Styled.HomeParaTitle>
                        Provides audit trail of changes to mapping.
                      </Styled.HomePara>
                    </Styled.MiddleContent>
                  </Col>
                </Row>
                <Styled.Footer>
                  <Styled.Button
                    onClick={(e) => handleRouteClick('/mapping', e)}
                  >
                    Get Started
                  </Styled.Button>
                </Styled.Footer>
              </Styled.BoxContent>
            </Styled.Box>
          </Col>

          <Col size={6}>
            <Styled.Box>
              <Styled.BoxContent>
                <Row justifyContentRight>
                  <Col>
                    <Styled.BoxImage src='/home-images/ingestion.png' alt='' />
                  </Col>
                  <Col size={6} style={{ height: '80px' }}>
                    <Styled.BoxTitle to='/data-ingestion'>
                      Data Ingestion:
                    </Styled.BoxTitle>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <Styled.MiddleContent>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>View:</Styled.HomeParaTitle>
                        Examine current data ingested into T&S data platform and
                        review templates for ingestion.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Add:</Styled.HomeParaTitle>
                        Allows users to ingest key data sets.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Edit:</Styled.HomeParaTitle>
                        Change currently ingested data.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Configure:</Styled.HomeParaTitle>
                        Incorporate new data that amends validations for the add
                        or edit features.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>History:</Styled.HomeParaTitle>
                        Provides audit trail of data ingestion.
                      </Styled.HomePara>
                    </Styled.MiddleContent>
                  </Col>
                </Row>
                <Styled.Footer>
                  <Styled.Button
                    onClick={(e) => handleRouteClick('/data-ingestion', e)}
                  >
                    Get Started
                  </Styled.Button>
                </Styled.Footer>
              </Styled.BoxContent>
            </Styled.Box>
          </Col>
        </Row>
      </Styled.Main>
    </Container>
  );
});
