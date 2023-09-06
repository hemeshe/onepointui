import styled from "styled-components/macro";

export const ToolTip = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
  position: relative;
`;

export const TipCard = styled.div`
  width: 220px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  display: block;
  right: -10px;
  top: 5px;
  background: #ffffff;
  /* pale-grey */

  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.35);

  ::before {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 16px;
    border-width: 9px;
    border-style: solid;
    border-color: transparent transparent #d9d9d9 transparent;
  }
`;
