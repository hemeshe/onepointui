import React from "react";

import * as S from "./styles";

import { Col } from "../grid";

type Props = {
  close?: () => void;
  message?: string | React.ReactNode;
};

export const Acknowledgement = ({ close, message }: Props) => {
  return (
    <S.Container>
      <S.StyledRow justifyContentCenter alignItemsCenter>
        <Col size={6} justifyContentCenter alignItemsCenter>
          {message}
        </Col>
      </S.StyledRow>
      <S.StyledRow justifyContentCenter alignItemsCenter>
        <Col size={6} justifyContentCenter alignItemsCenter>
          <S.Button onClick={close}>Close</S.Button>
        </Col>
      </S.StyledRow>
    </S.Container>
  );
};
