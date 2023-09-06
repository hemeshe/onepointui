import React from "react";
//import { useHistory } from 'react-router-dom';

import * as S from "./styles";
import { Icon } from "../icon/Icon.jsx";

export const NoAccess = () => {
  // let history = useHistory();
  // // const handleClose = () => {
  // //     history.push('/');
  // // };
  return (
    <S.StyledNoAccess>
      <S.Main>
        <S.Left>
          <S.ImageContainer>
            <img src="/shared/Group.png" alt="" />
          </S.ImageContainer>
        </S.Left>

        <S.RightContainer>
          <S.Right>
            <S.PermissionTitle>Access Denied</S.PermissionTitle>
            <S.PermissionPara>
              The page you are trying to open has restricted access.
              <br />
              <S.ReqLink href="mailto:Jesse.Escobedo@shell.com?subject=Minerva Portal Access Request">
                Raise a request
              </S.ReqLink>{" "}
              or goto Info{" "}
              <Icon type="infoIcon" size={12} style={{ width: "auto" }} />{" "}
              section for more details.
            </S.PermissionPara>
          </S.Right>
        </S.RightContainer>
      </S.Main>
    </S.StyledNoAccess>
  );
};

export const NoAccessForUnAuthorized = () => {
  // let history = useHistory();
  // // const handleClose = () => {
  // //     history.push('/');
  // // };
  return (
    <S.Container>
      <S.StyledNoAccessContainer>
        <S.StyledNoAccess>
          <S.Main>
            <S.Left>
              <S.ImageContainer>
                <img src="/shared/Group.png" alt="" />
              </S.ImageContainer>
            </S.Left>

            <S.RightContainer>
              <S.Right>
                <S.PermissionTitle>Access Denied</S.PermissionTitle>
                <S.PermissionPara>
                  The page you are trying to open has restricted access.
                  <br />
                  <S.ReqLink href="mailto:Jesse.Escobedo@shell.com?subject=Minerva Portal Access Request">
                    Raise a request
                  </S.ReqLink>{" "}
                  or go to Info{" "}
                  <Icon type="infoIcon" size={12} style={{ width: "auto" }} />{" "}
                  section for more details.
                </S.PermissionPara>
              </S.Right>
            </S.RightContainer>
          </S.Main>
        </S.StyledNoAccess>
      </S.StyledNoAccessContainer>
    </S.Container>
  );
};

export const NoAccessMain = () => (
  <S.Container>
    <S.StyledNoAccessContainer>
      <NoAccess />
    </S.StyledNoAccessContainer>
  </S.Container>
);
