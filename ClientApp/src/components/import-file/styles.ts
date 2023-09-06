import styled from "styled-components";

import { Col } from "../grid";

type InstructionProps = {
  borderRight?: boolean;
  borderLeft?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Main = styled.div`
  border: 2px dashed #595959;
  border-radius: 4px;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

export const Instruction = styled.div<InstructionProps>`
  display: block;
  color: #000000;
  font-size: ${({ theme }) => theme.fontSize["xs"]};
  border-right: ${({ borderRight }) =>
    borderRight ? "1px solid #7F7F7F" : ""};
  border-left: ${({ borderLeft }) => (borderLeft ? "1px solid #7F7F7F" : "")};
  padding: 10px;
`;

export const LinkInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px;
`;

export const Footer = styled.div`
  display: block;
  padding: 10px;
`;

export const Button = styled.button`
  background: #a6a6a6;
  border: 1px solid #a6a6a6;
  border-radius: 4px;
  padding: 10px 25px;
  cursor: pointer;
  color: white;
`;

export const FileDragArea = styled(Col)`
  position: relative;
  width: 100%;

  padding: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const FileDragDesc = styled.span`
  display: block;
  padding: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize["m"]};
`;

export const Browse = styled.label`
  color: #89cfdc;
`;

export const FileInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  border: 0;
  outline: none;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
`;

export const FileOutputArea = styled(Col)`
  position: relative;
  border: 1px solid #a6a6a6;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px;
`;

export const FileName = styled(Col)``;

export const FileRemove = styled(Col)`
  padding: 0 5px;
  cursor: pointer;
`;

export const ErrorMessage = styled(Col)`
  color: #e72d30;
`;
