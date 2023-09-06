import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const RecentlyAdded = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  padding: 10px;
`;

export const Tbody = styled.tbody``;

export const TableRow = styled.tr``;

export const TableColumn = styled.td<{
  fontWeight?: string;
  fontColor?: string;
}>`
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  color: ${({ fontColor }) => (fontColor ? fontColor : 'inherit')};
`;

export const StyledRefIngestionLib = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Title = styled.span`
  color: #404040;
  font-size: ${({ theme }) => theme.fontSize['m']};
  font-weight: 800;
  display: block;
  width: 100%;
`;

export const LibraryList = styled.ol<{ listStyle?: string }>`
  list-style: ${({ listStyle }) => listStyle};
`;

export const ListItem = styled.li`
  padding: 5px;
`;

export const ExpandIcon = styled.div`
  border: 2px solid #595959;
  border-radius: 3px;
  width: 18px;
  height: 18px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const RecentItem = styled.div`
  display: block;
  padding: 15px;
  color: #a50e0e;
`;

export const RecentItemDesc = styled.span`
  font-family: Futura Medium;
  font-style: normal;
  font-weight: normal;
  color: #4a4949;
  padding: 4px 0;
`;
