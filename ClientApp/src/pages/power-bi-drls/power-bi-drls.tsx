import React, { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch, useHistory } from "react-router-dom";

import { Menus } from "./constants";

import * as Styled from "./styles";

import { setCurrentNav } from "../../store/app/actions";
import { AppStateType } from "../../store";

import { Container } from "../../components/container";
import { Header } from "../../components/header";
import { HeaderContent } from "../../components/header-content";
import {
  CardHeader,
  CardBody,
  CardNavItem,
  CardNavItemLink,
  CardNav,
} from "../../components/card";
import { Intro } from "./intro";
import { Users } from "./users/users";
import { Profiles } from "./profiles/profiles";

export const PoweBiDrls = memo(() => {
  const { path } = useRouteMatch();
  let history = useHistory();
  const dispatch = useDispatch();
  const appState = useSelector((state: AppStateType) => state.app);

  const handleRouteChange = useCallback(
    (e, r, n) => {
      e.preventDefault();
      dispatch(setCurrentNav("/admin", n));
      history.push(r);
    },
    [history, dispatch]
  );

  return (
    <Container fluid>
      <Header fixed>
        <Container fluid>
          {" "}
          <HeaderContent />
        </Container>
      </Header>
      <Styled.Main>
        <CardHeader>
          <Styled.Top>
            <Styled.TopLeft>
              <CardNav style={{ marginLeft: "20px", marginRight: "20px" }}>
                {Menus.map((m) => (
                  <CardNavItem
                    activelink={m.name === appState.currentSubNav}
                    key={m.route + m.name}
                  >
                    <CardNavItemLink
                      onClick={(e) => handleRouteChange(e, m.route, m.name)}
                    >
                      {m.name}
                    </CardNavItemLink>
                  </CardNavItem>
                ))}
              </CardNav>
            </Styled.TopLeft>
          </Styled.Top>
        </CardHeader>
        <CardBody>
          <Route exact path={path} component={Intro} />
          <Route path={`${path}/users`} component={Users} />
          <Route path={`${path}/profiles`} component={Profiles} />
        </CardBody>
      </Styled.Main>
    </Container>
  );
});
