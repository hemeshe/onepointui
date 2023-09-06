import styled from "styled-components";
import { Card } from "../../components/card";

export const Main = styled(Card)`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  width: 99%;
`;
export const Top = styled.div`
   display: flex;
   justify-content: space-between;
   width; 90%;
   margin-left: 20px;
   margin-right: 20px;
`;

export const TopLeft = styled.div``;
export const TopRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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
