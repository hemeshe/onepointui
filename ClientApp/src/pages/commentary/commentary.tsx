import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';

import * as Styled from './styles';

//import { ParamsType } from "../../types/app";

import { getClassOfBusiness } from '../../store/commentary/actions';
import {
  setCurrentNav,
  setNoAccess,
  closeModal,
} from '../../store/app/actions';
import { AppStateType } from '../../store';

import { Container } from '../../components/container';
import { Header } from '../../components/header';
import { HeaderContent } from '../../components/header-content';
import {
  CardHeader,
  CardBody,
  CardTitle,
  CardNavItem,
  CardNavItemLink,
  CardNav,
} from '../../components/card';

import { Add } from './components/add';
import { AddList } from './components/add-list';
import { History } from './components/history';
import { Edit } from './components/edit/edit';
import { EditList } from './components/edit-list';
import { Modal } from '../../components/modal';

//import { InProgress } from "../../components/in-progress";
//import { Acknowledgement } from "../../components/acknowledgement";
import { Nav as AddNav } from './components/add-list/components/nav';
//import { WithSsoAuth } from "../../hocs/with-sso-auth";
//import { NoAccess as NoAccessComponent } from "../../components/no-access";
import { ImportFile } from '../../components/import-file';

import { useFileUpload } from './hooks/useFileUpload';
import { CSVLink } from 'react-csv';
import { monthArray } from '../../helpers/month';

const Menus = [
  {
    name: 'Add',
    route: '/commentary',
    privilegeRequired: 'WRITE',
  },
  {
    name: 'Edit',
    route: '/commentary/edit',
    privilegeRequired: 'WRITE',
  },
  {
    name: 'History',
    route: '/commentary/history',
    privilegeRequired: 'READ',
  },
];

export const Commentary = () => {
  const { path } = useRouteMatch();
  // let { cob, ss2, dashboard, report, year, month } = useParams<ParamsType>();
  let history = useHistory();
  const dispatch = useDispatch();

  const { postfile } = useFileUpload();

  const commentaryState = useSelector(
    (state: AppStateType) => state.commentary
  );

  const { csvTemplate, subSection2, dashBoard, report, month, year } =
    commentaryState;

  const appState = useSelector((state: AppStateType) => state.app);

  const { historyCsvData } = appState;

  //const { isLoading } = CommentaryState;

  const [showImportFile, setShowImportFile] = useState(false);

  useEffect(() => {
    dispatch(getClassOfBusiness());
    // dispatch(setCurrentNav("/commentary", "View"));
  }, [dispatch]);

  const handleRouteChange = useCallback(
    (e, r, n, access) => {
      e.preventDefault();
      // if (userAccess === 'WRITE') {
      dispatch(setCurrentNav('/commentary', n));
      history.push(r);
      // } else if (access === userAccess) {
      //   dispatch(setCurrentNav("/commentary", n));
      //   history.push(r);
      // } else {
      //    dispatch(showModalAction());
      //    dispatch(setNoAccess(true));
      // }
    },
    [history, dispatch]
  );

  const handleNoAccessClose = useCallback(() => {
    dispatch(closeModal());
    dispatch(setNoAccess(false));
  }, [dispatch]);

  const handleFileUploadSubmit = useCallback(
    (file) => {
      setShowImportFile(false);
      postfile(file);
    },
    [postfile]
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
        <CardHeader>
          <Styled.Top>
            <Styled.TopLeft>
              <CardTitle>
                Commentary {subSection2?.name && `> ${subSection2.name}`}{' '}
                {dashBoard?.name && `> ${dashBoard.name}`}{' '}
                {report?.name && `> ${report.name}`}{' '}
                {month &&
                  `> ${monthArray
                    .find((m) => m.id === month)
                    ?.name.substring(0, 3)}`}{' '}
                {year && `> ${year}`}{' '}
              </CardTitle>
            </Styled.TopLeft>
            <Styled.TopRight>
              {history && history.location && (
                <React.Fragment>
                  {history.location.pathname
                    .split('/')
                    .indexOf('add-comment') !== -1 ? (
                    <AddNav
                      onImportClick={() => setShowImportFile(true)}
                      csvTemplate={csvTemplate ?? []}
                      templateName={dashBoard?.name && dashBoard.name}
                    />
                  ) : history.location.pathname === '/commentary/history' ? (
                    <CSVLink
                      data={historyCsvData ?? []}
                      filename='History-commentary.csv'
                    >
                      <Styled.Button>Export File</Styled.Button>
                    </CSVLink>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )}
            </Styled.TopRight>
          </Styled.Top>
          <CardNav style={{ marginLeft: '20px', marginRight: '20px' }}>
            {Menus.map((m) => (
              <CardNavItem
                activelink={m.name === appState.currentSubNav}
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
          <Switch>
            <Route exact path={path} component={Add} />
            <Route
              path={`${path}/add-comment/:cobid/:cob/:ss1id/:ss1/:ss2id/:ss2/:dashboardid/:dashboard/:year/:month/:reportid/:report`}
              component={AddList}
            />
            <Route path={`${path}/edit`} component={Edit} />
            <Route
              path={`${path}/edit-comment/:cobid/:cob/:ss1id/:ss1/:ss2id/:ss2/:dashboardid/:dashboard/:year/:month/:reportid/:report`}
              component={EditList}
            />
            <Route path={`${path}/history`} component={History} />
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
};

// const Authenticated = WithSsoAuth(Commentary);

// export { Authenticated as Commentary };
