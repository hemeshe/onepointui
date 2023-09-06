import styled, { css } from 'styled-components';
import * as T from '../table';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
`;

export const List = styled.ul<{ listStyle?: string }>`
  color: #7f7f7f;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize['m']};
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
  list-styles-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  padding: 2px 1px;
  color: #4a4949;
`;

export const SmallTitle = styled.span`
  color: #a50e0e;
  font-size: ${({ theme }) => theme.fontSize['m']};
  font-weight: 800;
  display: block;
  width: 100%;
  margin: 0 0 10px 0;
`;

export const ClickHere = styled.span`
  cursor: pointer;
  font-family: Open Sans;
  font-weight: bold;
  font-size: font-size: ${({ theme }) => theme.fontSize['m']};
  color: #0F488F;
`;

export const TD = styled(T.TD)`
  padding: 8px 4px;
`;
