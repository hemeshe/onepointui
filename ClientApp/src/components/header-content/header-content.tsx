import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Styled from './styles';
import { Icon } from '../icon/Icon.jsx';
import { AppStateType } from '../../store';

import { ToolTip } from '../tool-tip';
import { InfoList } from '../info-list';

import { setInfoVisbility } from '../../store/app/actions';

const mainMenus = [
  {
    name: 'Home',
    route: '/home',
  },
  // {
  //   name: 'Commentary',
  //   route: '/commentary',
  // },
  {
    name: 'Mapping',
    route: '/mapping',
  },
  {
    name: 'Data Ingestion',
    route: '/data-ingestion',
  },
  {
    name: 'Admin',
    route: '/admin',
  },
  // {
  //   name: 'Power BI DRLS',
  //   route: '/power-bi-drls',
  // },
];

export const HeaderContent = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: AppStateType) => state.app);
  const { showInfo, userName, userAccess } = appState;

  const handleInfoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      dispatch(setInfoVisbility(!showInfo));
    },
    [dispatch, showInfo]
  );

  const createShortUserName = useCallback((u: string) => {
    if (u) {
      let splitted = u.split('.');
      let r;
      if (splitted) {
        let fname = splitted[0];
        let lname = splitted[1];
        let f_letter = fname.charAt(0);
        let l_letter = lname.charAt(0);
        r = f_letter + l_letter;
      }
      return r;
    }
  }, []);
  return (
    <Styled.HeaderContent>
      <Styled.Left>
        <Styled.Logo>
          <Icon type='logo' size={44} />
        </Styled.Logo>
        <Styled.TitleContainer>
          <Styled.Title data-testid='title'>T&S OnePoint PORTAL</Styled.Title>
          <Styled.SubTitleContainer>
            <Styled.SubTitleLabel>By : </Styled.SubTitleLabel>
            <Styled.SubTitle> T&S FINANCE</Styled.SubTitle>
          </Styled.SubTitleContainer>
        </Styled.TitleContainer>
      </Styled.Left>
      <Styled.Center>
        <Styled.NavMain>
          {userAccess === 'ADMIN'
            ? mainMenus.map((m) => (
                <Styled.NavItem
                  activelink={
                    appState &&
                    appState.currentNav &&
                    m.route === appState.currentNav
                      ? true
                      : false
                  }
                  key={m.name + m.route}
                >
                  <Styled.NavItemLink to={m.route}>{m.name}</Styled.NavItemLink>
                </Styled.NavItem>
              ))
            : mainMenus
                .filter((m) => m.name !== 'Admin' && m.name !== 'Power BI DRLS')
                .map((m) => (
                  <Styled.NavItem
                    activelink={
                      appState &&
                      appState.currentNav &&
                      m.route === appState.currentNav
                        ? true
                        : false
                    }
                    key={m.name + m.route}
                  >
                    <Styled.NavItemLink to={m.route}>
                      {m.name}
                    </Styled.NavItemLink>
                  </Styled.NavItem>
                ))}
        </Styled.NavMain>
      </Styled.Center>

      <Styled.Right>
        <Styled.NavIconItem>
          <Styled.NavIconLink
            onClick={handleInfoClick}
            to='/'
            aria-label='Help Info'
          >
            <Icon type='infoIcon' size={18} />
          </Styled.NavIconLink>
          <ToolTip showTip={showInfo} Content={<InfoList />} />
        </Styled.NavIconItem>
        {/* <Styled.NavIconItem to="/">
          <Icon type="smallHelpIcon" size={18} />
        </Styled.NavIconItem> */}
        {userName && (
          <Styled.NavIconLink onClick={(e) => e.preventDefault()} to='/'>
            <Styled.UserIcon title={userName}>
              {createShortUserName(userName ?? '')}
            </Styled.UserIcon>
          </Styled.NavIconLink>
        )}
      </Styled.Right>
    </Styled.HeaderContent>
  );
};
