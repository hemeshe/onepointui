import React from "react";
import styled, { css } from "styled-components";

import { ReactComponent as Logo } from "./icons/logo.svg";
import { ReactComponent as Home } from "./icons/home.svg";
import { ReactComponent as EvpCentral } from "./icons/evp-central.svg";
import { ReactComponent as Operations } from "./icons/operations.svg";
import { ReactComponent as Shipping } from "./icons/shipping.svg";
import { ReactComponent as ShellEnergy } from "./icons/shell-energy.svg";
import { ReactComponent as Crude } from "./icons/crude.svg";
import { ReactComponent as Products } from "./icons/products.svg";
import { ReactComponent as Help } from "./icons/help.svg";
import { ReactComponent as ScoreCard } from "./icons/score-card.svg";
import { ReactComponent as PerformanceTracker } from "./icons/performance-tracker.svg";
import { ReactComponent as OverallTracker } from "./icons/overall-tracker.svg";
import { ReactComponent as Cashflow } from "./icons/cashflow.svg";
import { ReactComponent as WorkingCapital } from "./icons/working-capital.svg";
import { ReactComponent as TradingAllocations } from "./icons/trading-allocations.svg";
import { ReactComponent as CostReporting } from "./icons/cost-reporting.svg";
import { ReactComponent as CapitalEmployed } from "./icons/capital-employed.svg";
import { ReactComponent as DefaultIcon } from "./icons/default-icon.svg";
import { ReactComponent as ReportIcon } from "./icons/report-icon.svg";
import { ReactComponent as SmallHelpIcon } from "./icons/small-help.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";
import { ReactComponent as UserAvatarIcon } from "./icons/user-avatar.svg";
import { ReactComponent as MinusIcon } from "./icons/Minus.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as CaretIconDown } from "./icons/caret-down.svg";
import { ReactComponent as UploadIcon } from "./icons/upload.svg";
import { ReactComponent as RightCaretIcon } from "./icons/right-caret.svg";
import { ReactComponent as CloseIcon } from "./icons/close.svg";

export const icons = {
  logo: Logo,
  home: Home,
  evpCentral: EvpCentral,
  operations: Operations,
  shipping: Shipping,
  shellEnergy: ShellEnergy,
  crude: Crude,
  products: Products,
  help: Help,
  scoreCard: ScoreCard,
  performanceTracker: PerformanceTracker,
  overallTracker: OverallTracker,
  cashflow: Cashflow,
  workingCapital: WorkingCapital,
  tradingAllocations: TradingAllocations,
  costReporting: CostReporting,
  capitalEmployed: CapitalEmployed,
  defaultIcon: DefaultIcon,
  reportIcon: ReportIcon,
  smallHelpIcon: SmallHelpIcon,
  infoIcon: InfoIcon,
  userAvatarIcon: UserAvatarIcon,
  minusIcon: MinusIcon,
  plusIcon: PlusIcon,
  caretIcon: CaretIcon,
  uploadIcon: UploadIcon,
  rightCaretIcon: RightCaretIcon,
  closeIcon: CloseIcon,
  caretDownIcon: CaretIconDown,
};

const IconBase = ({ type, ...rest }) => {
  const Component = icons[type];
  return <Component {...rest} />;
};

export const Icon = styled(IconBase)`
  ${({ theme, color, height, width, size }) => {
    const heightSpacing = height || size;
    const widthSpacing = width || size;

    return css`
      height: ${heightSpacing ? theme.size[heightSpacing] : "100%"};
      width: ${widthSpacing ? theme.size[widthSpacing] : "100%"};
      fill: ${color ? color : "currentColor"};

      @media (max-width: 1280px) {
        max-height: 56px;
      }
    `;
  }}
`;
