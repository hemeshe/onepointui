import styled from "styled-components/macro";

type Props = {
  textAlign?: string;
  borderRight?: string;
  borderBottom?: string;
  borderTop?: string;
  borderLeft?: string;
};

export const TH = styled.th<Props>`
  padding-top: ${({ theme }) => theme.spacing["xxxs"]};
  padding-bottom: ${({ theme }) => theme.spacing["xxxs"]};
  padding-left: ${({ theme }) => theme.spacing["xxs"]};
  padding-right: ${({ theme }) => theme.spacing["xxs"]};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};

  border-right: ${({ borderRight }) => (borderRight ? borderRight : "")};
  border-left: ${({ borderLeft }) => (borderLeft ? borderLeft : "")};
  border-top: ${({ borderTop }) => (borderTop ? borderTop : "")};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : "")};
`;
