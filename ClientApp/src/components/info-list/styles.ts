import styled from "styled-components";

import { Row, Col } from "../grid";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InfoRow = styled(Row)<{ backgroundColor?: string }>`
  color: #003c88;
  padding: 0 20px !important;
  box-sizing: border-box;
  min-width: 100%;
  margin: 0 !important;
  cursor: pointer;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "inherit"};

  :hover {
    background-color: #89cfdc;
  }
`;

export const InfoCol = styled(Col)<{ borderBottom?: boolean }>`
  padding: 11px 10px;
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? "1px solid #D9D9D9" : ""};
  box-sizing: border-box;

  :hover {
    border: none;
  }
`;

export const Text = styled.span`
  padding: 0 10px 0 0;
  font-size: 1rem;
`;

export const NavImg = styled.img`
  float: right;
`;
