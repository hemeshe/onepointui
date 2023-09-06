import styled, { css } from "styled-components/macro";

export const SortButton = styled.span`
  cursor: pointer;
  margin-left: 10px;
`;

export const Checkbox = styled.input`
  display: block;
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

export const PageItem = styled.div`
  display: block;
  border: 1px solid grey;
  border-radius: 4px;
`;
