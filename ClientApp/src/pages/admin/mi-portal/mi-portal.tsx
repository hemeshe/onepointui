import React, { FC, memo, useMemo } from "react";
import { Route } from "react-router-dom";
import { CSVLink } from "react-csv";

import { Menus } from "./constants";

import * as Styled from "./../styles";

import { Container } from "../../../components/container";
import { Header } from "../../../components/header";
import { HeaderContent } from "../../../components/header-content";
import {
  CardHeader,
  CardBody,
  CardNavItem,
  CardNavItemLink,
  CardNav,
} from "../../../components/card";
import { ViewList } from "./components/view-list";
import { AddList } from "./components/add-list";
import { UpdateList } from "./components/update-list";
import { History } from "./components/history";

import { Nav as AddNav } from "./components/add-list/components/nav";
import { Nav as EditNav } from "./components/update-list/components/nav";

import { useMiPortal } from "./hooks/useMiPortal";

export const MiPortal: FC = memo(() => {
  const {
    history,
    handleRefresh,
    csvData,
    handleSearchInput,
    appState,
    path,
    handleRouteChange,
  } = useMiPortal();

  const getFileName = useMemo(() => {
    if (history.location.pathname === "/admin/mi-portal/history")
      return `Portal-admin-history.csv`;
    else return `Portal-users.csv`;
  }, [history.location.pathname]);

  const TopNav = useMemo(() => {
    if (history.location.pathname.includes("add")) {
      return <AddNav handleRefresh={() => handleRefresh()} csvData={csvData} />;
    } else if (history.location.pathname.includes("update")) {
      return (
        <EditNav handleRefresh={() => handleRefresh()} csvData={csvData} />
      );
    } else return "";
  }, [history.location.pathname, handleRefresh, csvData]);

  return (
    <React.Fragment>
      <Header fixed>
        <Container fluid>
          {" "}
          <HeaderContent />
        </Container>
      </Header>
      <Styled.Main>
        <CardHeader>
          <Styled.Top>
            <Styled.TopRight>
              <div>
                <Styled.SrchInput
                  onChange={handleSearchInput}
                  placeholder="Search here"
                />
              </div>
              {history && history.location && (
                <div>
                  {history.location.pathname === "/admin/mi-portal" ||
                  history.location.pathname === "/admin/mi-portal/history" ? (
                    <React.Fragment>
                      <CSVLink data={csvData} filename={getFileName}>
                        <Styled.Button>Export File</Styled.Button>
                      </CSVLink>
                      <Styled.Button onClick={() => handleRefresh()}>
                        Refresh
                      </Styled.Button>
                    </React.Fragment>
                  ) : (
                    TopNav
                  )}
                </div>
              )}
            </Styled.TopRight>
          </Styled.Top>
          <CardNav style={{ marginLeft: "20px", marginRight: "20px" }}>
            {Menus.map((m) => (
              <CardNavItem
                activelink={m.name === appState.currentSubNavChild}
                key={m.route + m.name}
              >
                <CardNavItemLink
                  onClick={(e) =>
                    handleRouteChange(e, m.route, m.name, m.privilegeRequired)
                  }
                >
                  {m.name}
                </CardNavItemLink>
              </CardNavItem>
            ))}
          </CardNav>
        </CardHeader>
        <CardBody>
          <Route exact={true} path={path} component={ViewList} />
          <Route path={`${path}/update`} component={UpdateList} />
          <Route path={`${path}/add`} component={AddList} />
          <Route path={`${path}/history`} component={History} />
        </CardBody>
      </Styled.Main>
    </React.Fragment>
  );
});
