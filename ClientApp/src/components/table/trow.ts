import styled from "styled-components";

type Props = {
  borderRight?: string;
  borderBottom?: string;
  borderTop?: string;
  borderLeft?: string;
};

export const TRow = styled.tr<Props>`
  border-right: ${({ borderRight }) => (borderRight ? borderRight : "")};
  border-left: ${({ borderLeft }) => (borderLeft ? borderLeft : "")};
  border-top: ${({ borderTop }) => (borderTop ? borderTop : "")};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : "")};
`;
