import styled from "styled-components";

import { Props } from "./Modal";

export const Modal = styled.section<Props>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: ${({ backDropBackgroundColor }) =>
    backDropBackgroundColor ? backDropBackgroundColor : "rgba(0, 0, 0, 0.4)"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalOverlay = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div<Props>`
  position: relative;
  min-width: 60%;

  display: flex;
  flex-direction: column;
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "white"};
  max-width: ${({ width }) => (width ? width : "80%")};
  padding: 5px;
  color: #000000;
  max-height: 90%;
  overflow: auto;
`;

export const ModalHeader = styled.div<Props>`
  display: flex;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "center"};
  position: relative;
`;

export const CloseButton = styled.span<Props>`
  position: absolute;
  top: 12px;
  right: 15px;
  cursor: pointer;
`;

export const ModalHeaderTitle = styled.span`
  color: #000000;
  font-size: ${({ theme }) => theme.fontSize["m"]};
  padding: 10px;
  font-weight: 800;
`;

export const ModalBody = styled.div`
  display: flex;
  padding: 5px;
`;
