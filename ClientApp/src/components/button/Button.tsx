import React from "react";

import * as S from "./styles";

export type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  light?: boolean;
  dark?: boolean;
  link?: boolean;
  size?: "sm" | "lg" | "block";
  label?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const Button = ({ onClick, label, disabled, ...rest }: Props) => {
  return (
    <S.StyledButton onClick={onClick} {...rest} disabled={disabled}>
      {label}
    </S.StyledButton>
  );
};
