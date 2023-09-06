import React, { memo, FC, useMemo } from "react";
import { Route } from "react-router-dom";
import { CSVLink } from "react-csv";
import { AiOutlineSearch } from "react-icons/ai";

import { Menus } from "./constants";

import * as Styled from "../styles";

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
import { SrchInput } from "../../../components/text-input";

import { ViewList } from "./components/view-list";
import { AddList } from "./components/add-list";
import { UpdateList } from "./components/update-list";
import { History } from "./components/history";

import { Nav as AddNav } from "./components/add-list/components/nav";
import { Nav as EditNav } from "./components/update-list/components/nav";

import { useProfiles } from "./hooks/useProfiles";

export const Profiles: FC = memo(() => {
  const {
    handleSearchInput,
    handleSrchInputChange,
    handleRefresh,
    handleRouteChange,
    csvData,
    appState,
    path,
    history,
    srchInput,
  } = useProfiles();

  const getCsvFileName = useMemo(() => {
    if (history.location.pathname === "/power-bi-drls/profiles/history") {
      return `PowerBi-Drls-Profiles-History.csv`;
    } else {
      return `PowerBi-Drls-Profiles.csv`;
    }
  }, [history]);

  const getNav = useMemo(() => {
    if (history.location.pathname.split("/").indexOf("add") !== -1) {
      return <AddNav handleRefresh={() => handleRefresh()} csvData={csvData} />;
    } else if (history.location.pathname.split("/").indexOf("update") !== -1) {
      return (
        <EditNav handleRefresh={() => handleRefresh()} csvData={csvData} />
      );
    } else {
      return "";
    }
  }, [history, csvData, handleRefresh]);

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
              {history.location.pathname !==
                "/power-bi-drls/profiles/history" && (
                <div>
                  <form
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#e6e6e6",
                      borderRadius: "4px",
                    }}
                  >
                    <div>
                      <SrchInput
                        onChange={handleSrchInputChange}
                        placeholder="Enter search text here"
                        style={{ border: 0, outline: 0 }}
                        value={srchInput}
                        title="Enter search text here and press enter to search"
                      />
                    </div>
                    <div style={{ display: "flex" }}>
                      <Styled.Button
                        style={{ marginLeft: 0, padding: 0 }}
                        onClick={handleSearchInput}
                        title="Press to start searching..."
                      >
                        <AiOutlineSearch />
                      </Styled.Button>
                    </div>
                  </form>
                </div>
              )}
              {history && history.location && (
                <div>
                  {history.location.pathname === "/power-bi-drls/profiles" ||
                  history.location.pathname ===
                    "/power-bi-drls/profiles/history" ? (
                    <React.Fragment>
                      {csvData && !!csvData.length && (
                        <CSVLink data={csvData} filename={getCsvFileName}>
                          <Styled.Button>Export File</Styled.Button>
                        </CSVLink>
                      )}
                      <Styled.Button onClick={() => handleRefresh()}>
                        Refresh
                      </Styled.Button>
                    </React.Fragment>
                  ) : (
                    getNav
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
