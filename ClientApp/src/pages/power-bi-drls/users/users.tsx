import React, { memo, useMemo } from "react";
import { Route } from "react-router-dom";
import { CSVLink } from "react-csv";

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
import { ViewList } from "./components/view-list";
import { AddList } from "./components/add-list";
import { UpdateList } from "./components/update-list";
import { History } from "./components/history";

import { Nav as AddNav } from "./components/add-list/components/nav";
import { Nav as EditNav } from "./components/update-list/components/nav";

import { Modal } from "../../../components/modal";
import { ImportFile } from "../../../components/import-file";

import { useUsers } from "./hooks/useUsers";

export const Users = memo(() => {
  const {
    handleSearchInput,
    history,
    csvData,
    handleRefresh,
    appState,
    handleRouteChange,
    path,
    showImportFile,
    setShowImportFile,
    handleFileUploadSubmit,
    csvTemplate,
  } = useUsers();

  const getCsvFileName = useMemo(() => {
    if (history.location.pathname === "/power-bi-drls/users/history") {
      return `PowerBi-Drls-Users-History.csv`;
    } else {
      return `PowerBi-Drls-Users.csv`;
    }
  }, [history]);

  const UserNav = useMemo(() => {
    if (history.location.pathname.split("/").indexOf("add") !== -1) {
      return (
        <AddNav
          handleRefresh={() => handleRefresh()}
          csvData={csvData}
          csvTemplate={csvTemplate}
          onImportClick={() => setShowImportFile(true)}
        />
      );
    } else if (history.location.pathname.split("/").indexOf("update") !== -1) {
      return (
        <EditNav handleRefresh={() => handleRefresh()} csvData={csvData} />
      );
    } else return "";
  }, [
    history.location.pathname,
    csvData,
    handleRefresh,
    csvTemplate,
    setShowImportFile,
  ]);

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
                  {history.location.pathname === "/power-bi-drls/users" ||
                  history.location.pathname ===
                    "/power-bi-drls/users/history" ? (
                    <React.Fragment>
                      <CSVLink data={csvData} filename={getCsvFileName}>
                        <Styled.Button>Export File</Styled.Button>
                      </CSVLink>
                      <Styled.Button onClick={() => handleRefresh()}>
                        Refresh
                      </Styled.Button>
                    </React.Fragment>
                  ) : (
                    UserNav
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
      {showImportFile && (
        <Modal
          title="Import"
          backDropBackgroundColor="rgba(0,0,0, 0.3)"
          width="50%"
        >
          <ImportFile
            close={() => setShowImportFile(false)}
            onSubmit={(f) => handleFileUploadSubmit(f)}
          />
        </Modal>
      )}
    </React.Fragment>
  );
});
