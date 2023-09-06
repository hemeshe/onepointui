import styled from "styled-components";

import { Props } from "./table-preview";

export const StyledTablePreview = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Table = styled.div<Pick<Props, "hasError">>`
  width: 100%;
  padding: 5px;
  background: #e6e6e6;
  border-radius: 5px;
  display: flex;
  height: 120px;
  border: 2px solid ${({ hasError }) => (hasError ? "red" : "#e6e6e6")};
  overflow: auto;
`;

export const TableItem = styled.div``;

export const Label = styled.span`
  display: block;
  width: 100%;
  padding: 10px 2px;
`;

export const PreviewImg = styled.img`
  width: 100%;
  heigh: 100%;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const ListItem = styled.li<{ selected: boolean }>`
  padding: 1px 6px;
  cursor: pointer;
  width: 100%;
  background: ${({ selected }) => (selected ? "#D0ECF1" : "")};

  :hover {
    background: #d0ecf1;
  }
`;
