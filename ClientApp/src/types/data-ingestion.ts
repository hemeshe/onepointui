import { StringLiteral } from 'typescript';

export type IngestionFileDataType = Common &
  SopusO1F &
  VolumeNumerator &
  TaWorkingCapital &
  Ccpn &
  CcpnFile;

export type Common = {
  id: string;
  cob?: string;
  IsEditable?: boolean;
};

export type SopusO1F = Partial<{
  reportingDate: string;
  pnlDescription: string;
  businessUnit: string;
  entityNm: string;
  region: string;
  deskNm: string;
  amount: number;
  actualPlanFlgMthO1f: number;
  planPeriod: string;
  subDeskNm: string;
  category?: string;
  subCategory?: string;
}>;

export type VolumeNumerator = Partial<{
  reportingDate: string;
  businessUnit: string;
  cob: string;
  entityNm: string;
  deskNm: string;
  subDeskNm: string;
  volumeIg: number;
  refinery: string;
  buySell: string;
  actualPlanFlgIgvol: number;
  planPeriod: string;
}>;

export type TaWorkingCapital = Partial<{
  reportingDate: string;
  year?: string;
  quarter?: string;
  month?: string;
  businessUnit: string;
  entityNm: string;
  deskNm?: string;
  subDeskNm?: string;
  currency?: string;
  amount?: number;
  actualPlanLeFlg: number;
  reportingLine: string;
  pnlDescription?: string;
  site?: string;
  loadDate?: string;
}>;

export type Ccpn = Partial<{
  ccpnYear: string;
  ccpnQuarter: string;
  ccpnCcpnFlag: string;
  ccpnSapId: string;
  ccpnSapShortName?: string;
  ccpnCompanyCode?: string;
  ccpnLoadDate?: string;
  ccpnUpdatedBy?: string;
  ccpnUpdatedAt?: string;
}>;

export type CcpnFile = Partial<{
  sapId: string;
  sapShortName: string;
  ccpnFlag: string;
}>;

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
  errorDetails?: string;
};

export type ClassOfBusinessSuccessResponse = {
  reportId: number;
  reportName: string;
};

export type DataIngestionFileListSuccessResponse = {
  reportId: number;
  fileId: number;
  originFrom: string;
  fileName: string;
  description: string;
};

export type DataIngestionFileInstructionsSuccessResponse = {
  dataIngestionId: number;
  instructionId: number;
  instructionToFollow: string;
};

export type OptionType = {
  id: string | number;
  name: string;
};

export type OCATConfigReqType = Omit<
  IngestionFileDataType,
  'year' | 'month' | 'amount' | 'IsEditable'
>;

export interface headings {
  id: string;
  name: string;
  label: string;
  sorted?: boolean;
}

export type newIngestionType = IngestionFileDataType & {
  error?: boolean;
  message?: boolean;
};
