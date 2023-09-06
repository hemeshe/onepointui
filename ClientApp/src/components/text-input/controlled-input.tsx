import React from "react";

import * as Styled from "./styles";

type Props = {
  label?: string;
  placeholder?: string;
  displayInline?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  type?: "text" | "number";
};

export type ControlledTextAreaProps = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  displayInline?: boolean;
  name?: string;
  value?: string | number;
  backgroundColor?: string;
  error?: string | boolean;
  style?: React.CSSProperties;
};

export const ControlledInput: React.FC<Props> = ({
  label,
  placeholder,
  displayInline,
  name,
  onChange,
  value,
  type,
}) => (
  <Styled.StyledInput displayInline={displayInline}>
    {label && <Styled.Label>{label}</Styled.Label>}
    <Styled.ControlledInput
      value={value ?? ""}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      type={type ?? "text"}
    />
  </Styled.StyledInput>
);

export const ControlledTextArea: React.FC<ControlledTextAreaProps> = ({
  label,
  placeholder,
  displayInline,
  name,
  onChange,
  value,
  backgroundColor,
  error,
  ...rest
}) => (
  <Styled.StyledInput displayInline={displayInline}>
    {label && <Styled.Label>{label}</Styled.Label>}
    <Styled.ControlledTextArea
      value={value ?? ""}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      backgroundColor={backgroundColor}
      error={error}
      {...rest}
    />
  </Styled.StyledInput>
);
