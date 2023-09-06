import styled from "styled-components";

import { Row, Col } from "../../components/grid";

export const Container = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
  position: absolute;
  top: 0;
`;

export const Card = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: -470px;
  width: 470px;
  height: auto;
  box-sizing: content-box;
  background: #ffffff;
  padding: 6px 6px 0px 6px;
  border: 1px solid #ededed;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.35);
  max-height: 400px;
  overflow-y: auto;
`;

export const VideoRow = styled(Row)`
  margin: 5px;
  background: #ededed;
  cursor: pointer;

  :hover {
    border: 2px solid #009eb4;
  }
`;

export const VideoCol = styled(Col)`
  padding: 5px;
`;

export const VideoDescCol = styled(Col)`
  color: #404040;
  text-align: left;
`;
