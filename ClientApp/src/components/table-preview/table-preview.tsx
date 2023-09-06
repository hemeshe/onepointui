import React from "react";

import * as Styled from "./styles";

type Props = {
  label?: string;
  list?: boolean;
};

export const TablePreview = ({ label, list }: Props) => (
  <Styled.StyledTablePreview>
    <Styled.Label>{label}</Styled.Label>
    <Styled.Table>
      {list && (
        <Styled.PreviewImg src="/ingestion-ocat.png" alt="Template Preview" />
      )}
    </Styled.Table>
  </Styled.StyledTablePreview>
);
