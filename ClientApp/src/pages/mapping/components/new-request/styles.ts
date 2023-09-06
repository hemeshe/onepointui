import styled, { css } from "styled-components/macro";

import { Row, BlockCol } from "../../../../components/grid";

import { Card } from "../../../../components/card";

export const Main = styled(Card)`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  width: 99%;
`;

export const Content = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export const List = styled.ul<{ listStyle?: string }>`
  color: #7f7f7f;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize["m"]};
  padding: 0;

  ${({ listStyle }) => {
    if (listStyle) {
      return css`
        list-style: ${listStyle};
      `;
    }
  }};
`;

export const ListItem = styled.li`
  padding: 5px;

  :before {
    content: "-";
    padding-right: 4px;
  }
`;

export const SmallTitle = styled.span`
  color: #404040;
  font-size: ${({ theme }) => theme.fontSize["m"]};
  font-weight: 800;
  display: block;
  width: 100%;
  padding: 5px;
  margin: 0 0 5px 0;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background: #a6a6a6;
  border-radius: 4px;
  color: white;
  letter-spacing: 1px;
  padding: 10px 30px;
  font-size: ${({ theme }) => theme.fontSize["xs"]};
  font-weight: bold;
`;

export const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

export const StyledCol = styled(BlockCol)``;

export const FormField = styled(BlockCol)`
  margin: 10px 0;
  height: auto;
  padding: 5px 50px;
`;

export const FormFieldLabel = styled.label`
  padding: 0 0 10px 0;
  display: block;
`;

export const RadioButton = styled.input`
  padding: 5px;
`;

export const RadioButtonLabel = styled.label``;

export const RadioInputArea = styled.div`
  display: block;
`;

export const TextInput = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
`;

export const TextInputLabel = styled.label`
  display: block;
  padding: 4px;
`;

export const COBInputArea = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px 5px;
`;

export const SelectContainer = styled.div`
  display: block;
  padding: 4px 10px;
`;
