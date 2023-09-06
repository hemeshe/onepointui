import styled, { css } from "styled-components/macro";

export const Main = styled.div`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  position: relative;
  padding: 6px 0;
`;

export const TopLeft = styled.div`
  display: flex;
`;
export const TopRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
`;

export const Button = styled.button<{ backgroundColor?: string }>`
  outline: none;
  border: none;
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#e6e6e6"};
  border-radius: 4px;
  color: black;
  letter-spacing: 1px;
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.fontSize["xs"]};
  cursor: pointer;
  margin: 2px 8px;
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
