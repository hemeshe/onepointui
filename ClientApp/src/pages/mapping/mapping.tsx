import React, { memo, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { CSVLink } from "react-csv";
import { AiOutlineSearch } from "react-icons/ai";

import { Menus } from "./constants";

import * as Styled from "./styles";

import { Container } from "../../components/container";
import { Header } from "../../components/header";
import { HeaderContent } from "../../components/header-content";
import {
  CardHeader,
  CardBody,
  CardTitle,
  CardNavItem,
  CardNavItemLink,
  CardNav,
} from "../../components/card";
import { SrchInput } from "../../components/text-input";
import { ImportFile } from "../../components/import-file";
import { Modal } from "../../components/modal";

import { View } from "./components/view";
import { Add } from "./components/add";
import { Update } from "./components/update";
import { ViewList } from "./components/view-list";
import { AddList } from "./components/add-list";
import { UpdateList } from "./components/update-list";
import { History } from "./components/history";

import { Library } from "./components/library";
import { Nav as AddNav } from "./components/add-list/components/nav";
import { Nav as EditNav } from "./components/update-list/components/nav";

import { useMapping } from "./hooks/useMapping";

export const Mapping = memo(() => {
  const {
    handleFileUploadSubmit,
    handleSrchInputChange,
    handleSearchInput,
    handleRefresh,
    handleRouteChange,
    history,
    historyCsvData,
    csvData,
    showImportFile,
    setShowImportFile,
    pathname,
    srchInput,
    selectedCof,
    selectedMt,
    csvTemplate,
    appState,
    path,
  } = useMapping();

  const NEW_REQUEST = useMemo(
    () => (
      <Styled.Button
        onClick={(e) =>
          handleRouteChange(e, "mapping/new-request", "New Request", "WRITE")
        }
        style={{ display: "none" }}
      >
        New Request
      </Styled.Button>
    ),
    [handleRouteChange]
  );

  const ViewListNav = useMemo(
    () => (
      <React.Fragment>
        <CSVLink data={csvTemplate} filename={`${selectedMt}-Template.csv`}>
          <Styled.Button>Download Template</Styled.Button>
        </CSVLink>
        {csvData && csvData.length > 0 && (
          <CSVLink data={csvData} filename={`${selectedMt}.csv`}>
            <Styled.Button>Export File</Styled.Button>
          </CSVLink>
        )}
        <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
      </React.Fragment>
    ),
    [csvTemplate, selectedMt, csvData, handleRefresh]
  );

  const AddListNav = useMemo(
    () => (
      <AddNav
        handleRefresh={() => handleRefresh()}
        csvData={csvData}
        csvTemplate={csvTemplate}
        onImportClick={() => setShowImportFile(true)}
      />
    ),
    [csvTemplate, csvData, handleRefresh, setShowImportFile]
  );

  const UpdateListNav = useMemo(
    () => <EditNav handleRefresh={() => handleRefresh()} csvData={csvData} />,
    [handleRefresh, csvData]
  );

  const HistoryNav = useMemo(
    () => (
      <CSVLink data={historyCsvData ?? []} filename="History-mapping.csv">
        <Styled.Button>Export File</Styled.Button>
      </CSVLink>
    ),
    [historyCsvData]
  );

  const TopRightNav = useMemo(() => {
    if (
      history.location.pathname === "/mapping/add" ||
      history.location.pathname === "/mapping"
    ) {
      return NEW_REQUEST;
    } else if (history.location.pathname === "/mapping/configure") {
      return NEW_REQUEST;
    } else if (
      history.location.pathname.split("/").indexOf("view-list") !== -1
    ) {
      return ViewListNav;
    } else if (
      history.location.pathname.split("/").indexOf("add-list") !== -1
    ) {
      return AddListNav;
    } else if (
      history.location.pathname.split("/").indexOf("update-list") !== -1
    ) {
      return UpdateListNav;
    } else if (history.location.pathname === "/mapping/history") {
      return HistoryNav;
    } else {
      return "";
    }
  }, [
    history.location.pathname,
    AddListNav,
    NEW_REQUEST,
    ViewListNav,
    HistoryNav,
    UpdateListNav,
  ]);

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
              <CardTitle>
                Mapping{" "}
                {selectedCof && selectedMt && (
                  <React.Fragment>
                    {selectedCof && `> ${selectedCof}`}{" "}
                    {selectedMt && `> ${selectedMt}`}
                  </React.Fragment>
                )}
              </CardTitle>
            </Styled.TopLeft>
            <Styled.TopRight>
              {history && history.location && <div>{TopRightNav}</div>}
            </Styled.TopRight>
          </Styled.Top>
          <Styled.Top2>
            <Styled.CardNavLeft>
              <CardNav style={{ marginLeft: "20px", marginRight: "20px" }}>
                {Menus.map((m) => (
                  <CardNavItem
                    activelink={m.name === appState.currentSubNav}
                    key={m.route + m.name}
                  >
                    <CardNavItemLink
                      onClick={(e) =>
                        handleRouteChange(
                          e,
                          m.route,
                          m.name,
                          m.privilegeRequired
                        )
                      }
                    >
                      {m.name}
                    </CardNavItemLink>
                  </CardNavItem>
                ))}
              </CardNav>
            </Styled.CardNavLeft>
            <Styled.CardNavRight>
              {(pathname.split("/").indexOf("add-list") !== -1 ||
                pathname.split("/").indexOf("update-list") !== -1 ||
                pathname.split("/").indexOf("view-list") !== -1) && (
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
              )}
            </Styled.CardNavRight>
          </Styled.Top2>
        </CardHeader>
        <CardBody>
          <Switch>
            <Route exact path={path} component={View} />
            <Route
              path={`${path}/view-list/:cob/:cobid/:mt/:mtid`}
              component={ViewList}
            />
            <Route path={`${path}/update`} component={Update} />
            <Route
              path={`${path}/update-list/:cob/:cobid/:mt/:mtid`}
              component={UpdateList}
            />
            <Route path={`${path}/add`} component={Add} />
            <Route
              path={`${path}/add-list/:cob/:cobid/:mt/:mtid`}
              component={AddList}
            />
            <Route path={`${path}/history`} component={History} />
            <Route path={`${path}/library`} component={Library} />
          </Switch>
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
    </Container>
  );
});
