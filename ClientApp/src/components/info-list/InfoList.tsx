import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";

import { Help } from "../help";
import { AccessPermission } from "../access-permission";
import { Tutorials } from "../tutorials";

import { setInfoVisbility } from "../../store/app/actions";
import { AppStateType } from "../../store";

export const InfoList = () => {
  const [showItem, setShowItem] = useState<string>("");
  const dispatch = useDispatch();

  const appState = useSelector((state: AppStateType) => state.app);
  const { userName } = appState;

  const handleShow = useCallback((s) => {
    setShowItem(s);
  }, []);

  const handleCloseList = useCallback(
    (e: React.MouseEvent) => {
      handleShow("");
      dispatch(setInfoVisbility(false));
    },
    [dispatch, handleShow]
  );

  return (
    <S.Container onMouseLeave={handleCloseList}>
      <S.InfoRow backgroundColor={showItem === "Help" ? "#89cfdc" : "inherit"}>
        <S.InfoCol
          onMouseOver={() => handleShow("Help")}
          size={12}
          borderBottom
          justifyContentSpaceBetween
        >
          <S.Text>Help</S.Text>
          <S.NavImg src="/Line.png" alt="" />
        </S.InfoCol>
      </S.InfoRow>
      <S.InfoRow
        backgroundColor={showItem === "Tutorials" ? "#89cfdc" : "inherit"}
      >
        {userName && (
          <S.InfoCol
            onMouseOver={() => handleShow("Tutorials")}
            size={12}
            borderBottom
            justifyContentSpaceBetween
          >
            <S.Text>Tutorials</S.Text>
            <S.NavImg src="/Line.png" alt="" />
          </S.InfoCol>
        )}
      </S.InfoRow>
      <S.InfoRow
        backgroundColor={showItem === "Access" ? "#89cfdc" : "inherit"}
      >
        <S.InfoCol
          onMouseOver={() => handleShow("Access")}
          size={12}
          justifyContentSpaceBetween
        >
          <S.Text>Access/Permission</S.Text>
          <S.NavImg src="/Line.png" alt="" />
        </S.InfoCol>
      </S.InfoRow>
      {showItem === "Help" ? (
        <Help />
      ) : showItem === "Access" ? (
        <AccessPermission />
      ) : showItem === "Tutorials" ? (
        <Tutorials />
      ) : (
        ""
      )}
    </S.Container>
  );
};
