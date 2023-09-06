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
    dispatch(setCurrentNav("/admin", "Introduction"));
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
                The Admin page has been developed to control & manage the user
                access in various platforms used for Trading & Supply Management
                Information. The key platforms are the following:
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
                    <Styled.BoxImage src="/admin-images/mi-portal.png" alt="" />
                    <Styled.BoxTitle to="/admin/mi-portal">
                      MI Portal:
                    </Styled.BoxTitle>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <Styled.MiddleContent>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>View:</Styled.HomeParaTitle>
                        Display MI Portal access and current status of users.
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
                    <Styled.BoxImage
                      src="/admin-images/mi-station.png"
                      alt=""
                    />
                    <Styled.BoxTitle to="/admin/mi-station">
                      MI Station:
                    </Styled.BoxTitle>
                  </Col>
                </Row>
                <Row>
                  <Col size={12}>
                    <Styled.MiddleContent>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>View:</Styled.HomeParaTitle>
                        Display T&S MI Station access for current users.
                      </Styled.HomePara>
                      <Styled.HomePara>
                        <Styled.HomeParaTitle>Add:</Styled.HomeParaTitle>
                        Create new users by specific MI Station page.
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
