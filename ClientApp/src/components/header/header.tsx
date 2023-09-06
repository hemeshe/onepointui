import styled from "styled-components";

type Props = {
  fixed?: boolean;
  backgroundColor?: string;
  color?: string;
  height?: string;
  width?: string;
};

export const Header = styled.header<Props>`
  height: ${({ theme, height }) => (height ? height : theme.headerHeight)};
  width: 100%;
  position: ${({ fixed }) => (fixed ? "fixed" : "relative")};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.color.backgroundWhite};
  top: 0;
  left: 0;
  color: ${({ theme, color }) => (color ? color : theme.color.font)};
  display: flex;
  align-items: center;
  z-index: 1;
`;
