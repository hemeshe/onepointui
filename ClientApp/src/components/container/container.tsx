import styled, { css } from "styled-components/macro";

type Props = {
  fluid?: boolean;
};

const fixedWidth = css`
  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }

  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`;

export const Container = styled.section<Props>`
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;

  ${({ fluid }) => {
    if (!fluid) {
      return fixedWidth;
    }
    return css``;
  }}
`;
