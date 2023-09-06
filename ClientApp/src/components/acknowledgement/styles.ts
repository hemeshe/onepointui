import styled from 'styled-components';

import { Row } from '../grid';

type InstructionProps = {
  borderRight?: boolean;
  borderLeft?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledRow = styled(Row)`
  padding: 10px;
  overflow-wrap: anywhere;
`;

export const Button = styled.button<{ backgroundColor?: string }>`
  outline: none;
  border: none;
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : '#e6e6e6'};
  border-radius: 4px;
  color: black;
  letter-spacing: 1px;
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.fontSize['xs']};
  cursor: pointer;
  margin: 2px 8px;
`;
