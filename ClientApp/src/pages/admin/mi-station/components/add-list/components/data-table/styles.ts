import styled, { css } from "styled-components/macro";

export const SortButton = styled.span`
  cursor: pointer;
  margin-left: 10px;
`;

export const baseInput = css<{ error?: string | boolean }>`
  display: block;
  width: 100%;
  height: 30px;
  padding: 0 4px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #ced4da")};
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;

  ::-ms-expand {
    display: none;
  }
`;

export const Input = styled.input`
  ${baseInput}
`;

export const RemoveAddInput = styled.span`
  cursor: pointer;
`;

export const Select = styled.select`
  ${baseInput}
`;

export const Option = styled.option``;
