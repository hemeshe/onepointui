import styled from 'styled-components';

import * as T from '../../../../components/table';

export const StyledTablePreview = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Table = styled.div`
  width: 100%;
  padding: 5px;
  background: #e6e6e6;
  border-radius: 5px;
  display: flex;
  min-height: 125px;
  height: auto;
  border: 2px solid #e6e6e6;
  overflow-x: scroll;
  overflow-y: hidden;
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

export const TRow = styled(T.TRow)<{ numbering?: number }>`
  :before {
    content: ${({ numbering }) => numbering};
  }
`;

export const TH = styled(T.TH)`
  font-size: 0.4rem;
  margin: 0;
  padding: 2px 2px;
  letter-spacing: 1px;
`;

export const TD = styled(T.TD)<{ fontBold?: boolean }>`
  font-size: 0.4rem;
  margin: 0;
  padding: 2px 2px;
  font-weight: ${({ fontBold }) => (fontBold ? 'bold' : '100')};
  letter-spacing: 1px;
`;
