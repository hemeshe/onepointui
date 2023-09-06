import styled from "styled-components/macro";

type Props = {
  textAlign?: string;
  color?: string;
  borderRight?: string;
  borderBottom?: string;
  borderTop?: string;
  borderLeft?: string;
  backgroundColor?: string;
};

export const TD = styled.td<Props>`
  padding-top: ${({ theme }) => theme.spacing["xs"]};
  padding-bottom: ${({ theme }) => theme.spacing["xs"]};
  padding-left: ${({ theme }) => theme.spacing["xxs"]};
  padding-right: ${({ theme }) => theme.spacing["xxs"]};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  color: ${({ color }) => (color ? color : "inherit")};
  max-width: 100%;
  height: auto;
  border-right: ${({ borderRight }) => (borderRight ? borderRight : "")};
  border-left: ${({ borderLeft }) => (borderLeft ? borderLeft : "")};
  border-top: ${({ borderTop }) => (borderTop ? borderTop : "")};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : "")};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : ""};
`;
