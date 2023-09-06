import styled, { css } from "styled-components";

type Props = {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  justifyContentCenter?: boolean;
  justifyContentLeft?: boolean;
  justifyContentRight?: boolean;
  justifyContentSpaceBetween?: boolean;
  justifyContentSpaceAround?: boolean;
  justifyContentStretch?: boolean;
  alignItemsCenter?: boolean;
  alignItemsTop?: boolean;
  alignItemsBottom?: boolean;
  alignItemsStretch?: boolean;
  alignItemsBaseLine?: boolean;
};

export const Col = styled.section<Props>`
  display: flex;
  flex: 1 0 0%;
  justify-content: ${({
    justifyContentCenter,
    justifyContentLeft,
    justifyContentRight,
    justifyContentSpaceBetween,
    justifyContentSpaceAround,
    justifyContentStretch,
  }) => {
    let align = "flex-start";
    if (justifyContentCenter) {
      align = "center";
    }
    if (justifyContentLeft) {
      align = "flex-start";
    }
    if (justifyContentRight) {
      align = "flex-end";
    }
    if (justifyContentSpaceBetween) {
      align = "space-between";
    }
    if (justifyContentSpaceAround) {
      align = "space-around";
    }
    if (justifyContentStretch) {
      align = "stretch";
    }
    return align;
  }};
  align-items: ${({
    alignItemsCenter,
    alignItemsTop,
    alignItemsBottom,
    alignItemsStretch,
    alignItemsBaseLine,
  }) => {
    let align;
    if (alignItemsCenter) {
      align = "center";
    }
    if (alignItemsTop) {
      align = "flex-start";
    }
    if (alignItemsBottom) {
      align = "flex-end";
    }
    if (alignItemsBaseLine) {
      align = "baseline";
    }
    if (alignItemsStretch) {
      align = "stretch";
    }
    return align;
  }};

  @media (min-width: 576px) {
    flex: 0 0 auto;

    ${({ size }) => {
      if (size && size === 1) {
        return css`
          flex: 0 0 auto;
          width: 8.333333%;
        `;
      }
      if (size && size === 2) {
        return css`
          flex: 0 0 auto;
          width: 16.6666667%;
        `;
      }
      if (size && size === 3) {
        return css`
          flex: 0 0 auto;
          width: 25%;
        `;
      }
      if (size && size === 4) {
        return css`
          flex: 0 0 auto;
          width: 33.333333%;
        `;
      }
      if (size && size === 5) {
        return css`
          flex: 0 0 auto;
          width: 41.666667%;
        `;
      }
      if (size && size === 6) {
        return css`
          flex: 0 0 auto;
          width: 50%;
        `;
      }
      if (size && size === 7) {
        return css`
          flex: 0 0 auto;
          width: 58.333333%;
        `;
      }
      if (size && size === 8) {
        return css`
          flex: 0 0 auto;
          width: 66.666667%;
        `;
      }
      if (size && size === 9) {
        return css`
          flex: 0 0 auto;
          width: 75%;
        `;
      }
      if (size && size === 10) {
        return css`
          flex: 0 0 auto;
          width: 83.333333%;
        `;
      }
      if (size && size === 11) {
        return css`
          flex: 0 0 auto;
          width: 91.666667%;
        `;
      }
      if (size && size === 12) {
        return css`
          flex: 0 0 auto;
          width: 100%;
        `;
      }
    }}
  }

  @media (min-width: 768px) {
    flex: 0 0 auto;

    ${({ size }) => {
      if (size && size === 1) {
        return css`
          flex: 0 0 auto;
          width: 8.333333%;
        `;
      }
      if (size && size === 2) {
        return css`
          flex: 0 0 auto;
          width: 16.6666667%;
        `;
      }
      if (size && size === 3) {
        return css`
          flex: 0 0 auto;
          width: 25%;
        `;
      }
      if (size && size === 4) {
        return css`
          flex: 0 0 auto;
          width: 33.333333%;
        `;
      }
      if (size && size === 5) {
        return css`
          flex: 0 0 auto;
          width: 41.666667%;
        `;
      }
      if (size && size === 6) {
        return css`
          flex: 0 0 auto;
          width: 50%;
        `;
      }
      if (size && size === 7) {
        return css`
          flex: 0 0 auto;
          width: 58.333333%;
        `;
      }
      if (size && size === 8) {
        return css`
          flex: 0 0 auto;
          width: 66.666667%;
        `;
      }
      if (size && size === 9) {
        return css`
          flex: 0 0 auto;
          width: 75%;
        `;
      }
      if (size && size === 10) {
        return css`
          flex: 0 0 auto;
          width: 83.333333%;
        `;
      }
      if (size && size === 11) {
        return css`
          flex: 0 0 auto;
          width: 91.666667%;
        `;
      }
      if (size && size === 12) {
        return css`
          flex: 0 0 auto;
          width: 100%;
        `;
      }
    }}
  }

  @media (min-width: 992px) {
    flex: 0 0 auto;

    ${({ size }) => {
      if (size && size === 1) {
        return css`
          flex: 0 0 auto;
          width: 8.333333%;
        `;
      }
      if (size && size === 2) {
        return css`
          flex: 0 0 auto;
          width: 16.6666667%;
        `;
      }
      if (size && size === 3) {
        return css`
          flex: 0 0 auto;
          width: 25%;
        `;
      }
      if (size && size === 4) {
        return css`
          flex: 0 0 auto;
          width: 33.333333%;
        `;
      }
      if (size && size === 5) {
        return css`
          flex: 0 0 auto;
          width: 41.666667%;
        `;
      }
      if (size && size === 6) {
        return css`
          flex: 0 0 auto;
          width: 50%;
        `;
      }
      if (size && size === 7) {
        return css`
          flex: 0 0 auto;
          width: 58.333333%;
        `;
      }
      if (size && size === 8) {
        return css`
          flex: 0 0 auto;
          width: 66.666667%;
        `;
      }
      if (size && size === 9) {
        return css`
          flex: 0 0 auto;
          width: 75%;
        `;
      }
      if (size && size === 10) {
        return css`
          flex: 0 0 auto;
          width: 83.333333%;
        `;
      }
      if (size && size === 11) {
        return css`
          flex: 0 0 auto;
          width: 91.666667%;
        `;
      }
      if (size && size === 12) {
        return css`
          flex: 0 0 auto;
          width: 100%;
        `;
      }
    }}
  }

  @media (min-width: 1200px) {
    flex: 0 0 auto;

    ${({ size }) => {
      if (size && size === 1) {
        return css`
          flex: 0 0 auto;
          width: 8.333333%;
        `;
      }
      if (size && size === 2) {
        return css`
          flex: 0 0 auto;
          width: 16.6666667%;
        `;
      }
      if (size && size === 3) {
        return css`
          flex: 0 0 auto;
          width: 25%;
        `;
      }
      if (size && size === 4) {
        return css`
          flex: 0 0 auto;
          width: 33.333333%;
        `;
      }
      if (size && size === 5) {
        return css`
          flex: 0 0 auto;
          width: 41.666667%;
        `;
      }
      if (size && size === 6) {
        return css`
          flex: 0 0 auto;
          width: 50%;
        `;
      }
      if (size && size === 7) {
        return css`
          flex: 0 0 auto;
          width: 58.333333%;
        `;
      }
      if (size && size === 8) {
        return css`
          flex: 0 0 auto;
          width: 66.666667%;
        `;
      }
      if (size && size === 9) {
        return css`
          flex: 0 0 auto;
          width: 75%;
        `;
      }
      if (size && size === 10) {
        return css`
          flex: 0 0 auto;
          width: 83.333333%;
        `;
      }
      if (size && size === 11) {
        return css`
          flex: 0 0 auto;
          width: 91.666667%;
        `;
      }
      if (size && size === 12) {
        return css`
          flex: 0 0 auto;
          width: 100%;
        `;
      }
    }}
  }

  @media (min-width: 1400px) {
    flex: 0 0 auto;

    ${({ size }) => {
      if (size && size === 1) {
        return css`
          flex: 0 0 auto;
          width: 8.333333%;
        `;
      }
      if (size && size === 2) {
        return css`
          flex: 0 0 auto;
          width: 16.6666667%;
        `;
      }
      if (size && size === 3) {
        return css`
          flex: 0 0 auto;
          width: 25%;
        `;
      }
      if (size && size === 4) {
        return css`
          flex: 0 0 auto;
          width: 33.333333%;
        `;
      }
      if (size && size === 5) {
        return css`
          flex: 0 0 auto;
          width: 41.666667%;
        `;
      }
      if (size && size === 6) {
        return css`
          flex: 0 0 auto;
          width: 50%;
        `;
      }
      if (size && size === 7) {
        return css`
          flex: 0 0 auto;
          width: 58.333333%;
        `;
      }
      if (size && size === 8) {
        return css`
          flex: 0 0 auto;
          width: 66.666667%;
        `;
      }
      if (size && size === 9) {
        return css`
          flex: 0 0 auto;
          width: 75%;
        `;
      }
      if (size && size === 10) {
        return css`
          flex: 0 0 auto;
          width: 83.333333%;
        `;
      }
      if (size && size === 11) {
        return css`
          flex: 0 0 auto;
          width: 91.666667%;
        `;
      }
      if (size && size === 12) {
        return css`
          flex: 0 0 auto;
          width: 100%;
        `;
      }
    }}
  }
`;
