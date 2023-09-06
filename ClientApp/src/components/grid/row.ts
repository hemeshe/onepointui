import styled from "styled-components/macro";

type Props = {
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

export const Row = styled.section<Props>`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);

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

  > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--bs-gutter-x) / 2);
    padding-left: calc(var(--bs-gutter-x) / 2);
    margin-top: var(--bs-gutter-y);
  }
`;
