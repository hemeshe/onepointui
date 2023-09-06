import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import * as Styled from "./styles";

import { Container } from "../../../components/container";
import { Header } from "../../../components/header";
import { HeaderContent } from "../../../components/header-content";
import { Row, Col } from "../../../components/grid";

import { setCurrentNav } from "../../../store/app/actions";

export const Intro = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentNav("/power-bi-drls", "Introduction"));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header fixed>
        <Container fluid>
          {" "}
          <HeaderContent />
        </Container>
      </Header>
      <Styled.Main>
        <Row>
          <Col size={12}>
            <Styled.HomeContent>
              <Styled.HomePara>
                The Power BI DRLS page has been developed to control and manage
                the user access of various pages and reports used for Trading &
                Supply Management Information.
              </Styled.HomePara>
            </Styled.HomeContent>
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col size={6}>
            <Styled.Box>
              <Styled.BoxContent>
                <Row justifyContentRight>
                  <Col size={12}>
                    <Styled.BoxImage src="/admin-images/profiles.png" alt="" />
                    <Styled.BoxTitle to="/power-bi-drls/users">
                      Users:
                    </Styled.BoxTitle>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <Styled.MiddleContent>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>View:</Styled.HomeParaTitle>
                        Display Power BI access and current status of users.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Add:</Styled.HomeParaTitle>
                        Create new users with a specific access level.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Edit:</Styled.HomeParaTitle>
                        Modify existing user access and/or status of access.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>History:</Styled.HomeParaTitle>
                        Display trail of previous access and status changes.
                      </Styled.HomePara>
                    </Styled.MiddleContent>
                  </Col>
                </Row>
              </Styled.BoxContent>
            </Styled.Box>
          </Col>

          <Col size={6}>
            <Styled.Box>
              <Styled.BoxContent>
                <Row justifyContentRight>
                  <Col>
                    <Styled.BoxImage src="/admin-images/users.png" alt="" />
                    <Styled.BoxTitle to="/power-bi-drls/profiles">
                      Profiles:
                    </Styled.BoxTitle>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <Styled.MiddleContent>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>View:</Styled.HomeParaTitle>
                        Display Power BI access for current users.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Add:</Styled.HomeParaTitle>
                        Create new users by specific Power BI page.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Edit:</Styled.HomeParaTitle>
                        Modify existing user access and/or status of access.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>History:</Styled.HomeParaTitle>
                        Display trail of previous access and status changes.
                      </Styled.HomePara>
                    </Styled.MiddleContent>
                  </Col>
                </Row>
              </Styled.BoxContent>
            </Styled.Box>
          </Col>
        </Row>
      </Styled.Main>
    </React.Fragment>
  );
});
