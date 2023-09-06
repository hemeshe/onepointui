import styled, { css } from "styled-components/macro";

import { ControlledTextAreaProps } from "./controlled-input";

export const StyledInput = styled.div<{
  displayInline?: boolean;
  error?: boolean | string;
}>`
  display: flex;
  flex-direction: ${({ displayInline }) => (displayInline ? "row" : "column")};
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  display: block;
`;

export const Label = styled.span`
  display: block;
  width: 100%;
`;

export const baseInput = css`
  background: #e6e6e6;
  border: 1px solid #c2c2c2;
  padding: 5px;
  border-radius: 4px;
  display: block;
  width: 100%;
  height: auto;
`;

export const SrchInput = styled.input`
  ${baseInput}
  min-width: 200px;
`;

export const ControlledInput = styled.input`
  background: #e6e6e6;
  border: 1px solid #c2c2c2;
  padding: 5px;
  border-radius: 4px;
  display: block;
  width: 100%;
  height: auto;
`;

export const ControlledTextArea = styled.textarea<
  Pick<ControlledTextAreaProps, "backgroundColor" | "error">
>`
  background: ${({ backgroundColor }) => backgroundColor ?? "#e6e6e6"};
  padding: 5px;
  border-radius: 4px;
  display: block;
  width: 100%;
  height: auto;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #c2c2c2")};
`;
