import React, { memo, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { AiOutlineSearch } from 'react-icons/ai';

import * as Styled from './styles';

import { Menus } from './constants';

import { Container } from '../../components/container';
import { Header } from '../../components/header';
import { HeaderContent } from '../../components/header-content';
import { SrchInput } from '../../components/text-input';
import {
  CardHeader,
  CardBody,
  CardTitle,
  CardNavItem,
  CardNavItemLink,
  CardNav,
} from '../../components/card';

import { View } from './components/view';
import { Add } from './components/add';
import { Update } from './components/update';
import { ViewList } from './components/view-list';
import { AddList } from './components/add-list';
import { UpdateList } from './components/update-list';
import { History } from './components/history';
import { Modal } from '../../components/modal';
import { ImportFile } from '../../components/import-file';
import { Configure } from './components/configure';
import { ConfigureList } from './components/configure-list';
import { Nav as ConfigureNav } from './components/configure-list/components/nav';
import { Nav as EditNav } from './components/update-list/components/nav';

import { useDataIngestion } from './hooks/useDataIngestion';

export const DataIngestion = memo(() => {
  const {
    handleSrchInputChange,
    handleSearchInput,
    handleConfigRefresh,
    handleRefresh,
    handleFileUploadSubmit,
    handleRouteChange,
    csvData,
    showImportFile,
    setShowImportFile,
    path,
    selectedCof,
    selectedDif,
    selectedMonth,
    selectedYear,
    selectedQuarter,
    csvTemplate,
    historyCsvData,
    srchInput,
    history,
    appState,
  } = useDataIngestion();

  const NEW_REQUEST = useMemo(
    () => (
      <Styled.Button style={{ display: 'none' }}>New Request</Styled.Button>
    ),
    []
  );

  const ViewListNav = useMemo(
    () => (
      <React.Fragment>
        <CSVLink data={csvTemplate} filename={`${selectedDif}-Template.csv`}>
          <Styled.Button>Download Template</Styled.Button>
        </CSVLink>
        {csvData && csvData.length > 0 && (
          <CSVLink data={csvData} filename={`${selectedDif}.csv`}>
            <Styled.Button>Export File</Styled.Button>
          </CSVLink>
        )}
        <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
      </React.Fragment>
    ),
    [csvTemplate, selectedDif, csvData, handleRefresh]
  );

  const AddListNav = useMemo(
    () => (
      <React.Fragment>
        <Styled.Button onClick={() => setShowImportFile(true)}>
          Import File
        </Styled.Button>
        <CSVLink data={csvTemplate} filename={`${selectedDif}-Template.csv`}>
          <Styled.Button>Download Template</Styled.Button>
        </CSVLink>
        <Styled.Button onClick={() => handleRefresh()}>Refresh</Styled.Button>
      </React.Fragment>
    ),
    [csvTemplate, selectedDif, handleRefresh, setShowImportFile]
  );

  const TopRightNav = useMemo(() => {
    if (
      history.location.pathname === '/data-ingestion/add' ||
      history.location.pathname === '/data-ingestion/configure'
    ) {
      return NEW_REQUEST;
    } else if (
      history.location.pathname.split('/').indexOf('view-list') !== -1
    ) {
      return ViewListNav;
    } else if (
      history.location.pathname.split('/').indexOf('configure-list') !== -1
    ) {
      return (
        <ConfigureNav
          onImportClick={() => setShowImportFile(true)}
          handleRefresh={() => handleConfigRefresh()}
          csvTemplate={csvTemplate}
        />
      );
    } else if (
      history.location.pathname.split('/').indexOf('update-list') !== -1
    ) {
      return (
        <EditNav
          onImportClick={() => setShowImportFile(true)}
          csvData={csvData}
          handleRefresh={() => handleRefresh()}
        />
      );
    } else if (
      history.location.pathname.split('/').indexOf('add-list') !== -1
    ) {
      return AddListNav;
    } else if (history.location.pathname === '/data-ingestion/history') {
      return (
        <CSVLink
          data={historyCsvData ?? []}
          filename='History-data-ingestion.csv'
        >
          <Styled.Button>Export File</Styled.Button>
        </CSVLink>
      );
    } else {
      return '';
    }
  }, [
    history.location.pathname,
    AddListNav,
    NEW_REQUEST,
    ViewListNav,
    csvData,
    csvTemplate,
    handleConfigRefresh,
    handleRefresh,
    historyCsvData,
    setShowImportFile,
  ]);

  return (
    <Container fluid>
      <Header fixed>
        <Container fluid>
          {' '}
          <HeaderContent />
        </Container>
      </Header>
      <Styled.Main>
        <CardHeader>
          <Styled.Top>
            <Styled.TopLeft>
              <CardTitle>
                Data Ingestion {selectedCof && `> ${selectedCof}`}{' '}
                {selectedDif && `> ${selectedDif}`}{' '}
                {selectedYear && `> ${selectedYear}`}
                {/* {' '}{selectedMonth && `> ${selectedMonth}`} */}
              </CardTitle>
            </Styled.TopLeft>
            <Styled.TopRight>
              {history && history.location && TopRightNav}
            </Styled.TopRight>
          </Styled.Top>
          <Styled.Top2>
            <Styled.CardNavLeft>
              <CardNav style={{ marginLeft: '20px', marginRight: '20px' }}>
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
              {(history?.location?.pathname.split('/').indexOf('add-list') !==
                -1 ||
                history?.location?.pathname
                  .split('/')
                  .indexOf('update-list') !== -1 ||
                history?.location?.pathname.split('/').indexOf('view-list') !==
                  -1 ||
                history?.location?.pathname
                  .split('/')
                  .indexOf('configure-list') !== -1) && (
                <form
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#e6e6e6',
                    borderRadius: '4px',
                  }}
                >
                  <div>
                    <SrchInput
                      onChange={handleSrchInputChange}
                      placeholder='Enter search text here'
                      style={{ border: 0, outline: 0 }}
                      value={srchInput}
                      title='Enter search text here and press enter to search'
                    />
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Styled.Button
                      style={{ marginLeft: 0, padding: 0 }}
                      onClick={handleSearchInput}
                      title='Press to start searching...'
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
              path={`${path}/view-list/:cob/:cobid/:dif/:difid/:year/:quarter/:month`}
              component={ViewList}
            />
            <Route path={`${path}/update`} component={Update} />
            <Route
              path={`${path}/update-list/:cob/:cobid/:dif/:difid/:year/:quarter/:month`}
              component={UpdateList}
            />
            <Route path={`${path}/add`} component={Add} />
            <Route
              path={`${path}/add-list/:cob/:cobid/:dif/:difid/:year/:quarter/:month`}
              component={AddList}
            />
            <Route path={`${path}/history`} component={History} />
            <Route path={`${path}/configure`} component={Configure} />
            <Route
              path={`${path}/configure-list/:cob/:cobid/:dif/:difid`}
              component={ConfigureList}
            />
            {/* <Route
              path={`${path}/configure-list/:cob/:cobid/:dif/:difid/:year/:month`}
              component={ConfigureList}
            /> */}
          </Switch>
        </CardBody>
      </Styled.Main>
      {showImportFile && (
        <Modal
          title='Import'
          backDropBackgroundColor='rgba(0,0,0, 0.3)'
          width='50%'
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
