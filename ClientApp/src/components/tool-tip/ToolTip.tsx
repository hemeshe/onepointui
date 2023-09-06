import React from "react";

import * as S from "./styles";

type Props = {
  showTip?: boolean;
  Content?: React.ReactNode;
};

export const ToolTip = ({ showTip, Content }: Props) => {
  return <S.ToolTip>{showTip && <S.TipCard>{Content}</S.TipCard>}</S.ToolTip>;
};
