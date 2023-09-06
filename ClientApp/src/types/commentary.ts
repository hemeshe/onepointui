export type CommentaryDataType = Common &
  CapitalEmployedR1Type &
  CashflowR1Type &
  FinanceReportType;

export type HistoryDataType = {
  historyId: string | number;
  fileName: string;
  time: string;
  date: string;
  fileSize: string;
  ingestionFile: string;
  classOfBusiness: string;
  submittedBy: string;
  fileType?: string;
  changeTime?: string;
  fileStatus?: string;
  reasonForFailure?: string;
};

export type Common = {
  id: string;
  IsEditable?: boolean;
};

export type CapitalEmployedR1Type = {
  pbiProfileId: number;
  cob: string;
  scoa: string;
  scoaDesc: object;
  sector: string;
  sectorDesc: string;
  aoo: string;
  aooDesc: string;
  pcad: string;
  pcadDesc: string;
  period: string;
  year: string;
  month: string;
  quarter: string;
  level1Id: string;
  level1Text: string;
  level2Id: string;
  level2Text: string;
  level3Id: string;
  level3Text: string;
  level4Id: string;
  level4Text: string;
  level5Id: string;
  level5Text: string;
  level6Id: string;
  level6Text: string;
  level7Id: string;
  level7Text: string;
  level8Id: string;
  level8Text: string;
  amount: string;
  loadDate: string;
  centralReport: string;
  business?: string;
  comment?: string;
  pbiReportTabId?: string;
};

export type CashflowR1Type = {
  pbiReportTabId: string;
  tabName: string;
  year: string;
  month: string;
  cob: string;
  reportingLine?: string;
  gm?: string;
  commercialPeriod: string;
  comment?: string;
  period: string;
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
};

export type FinanceReportType = {
  pbiReportTabId: string;
  tabName: string;
  year: string;
  month: string;
  cob: string;
  aoo: string;
  category?: string;
  comparisonPeriod: string;
  comment?: string;
  period: string;
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
  scoa?: string;
  scoaDesc?: string;
};

export type CobHomePageSuccessResponse = {
  id: number;
  pageName: string;
};

export type Ss1LandingPageSuccessResponse = {
  id: number;
  homePageId: number;
  pageName: string;
};

export type Ss2SubLandPageSuccessResponse = {
  id: number;
  landingPageId: number;
  cob: string;
};

export type DashboardReportSuccessResponse = {
  pbiReportId: number;
  mainReportName: string;
  pbiReportName: string;
  pbiProfileId: number;
  loadDate: string;
};
