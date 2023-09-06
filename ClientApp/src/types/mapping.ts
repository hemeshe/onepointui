export type MappingFileDataType = MethodMapType &
  UsdBbl &
  LeSfsCodes &
  ReportFreezeMap;

export type MethodMapType = {
  id: string;
  reportingLine?: string;
  entityNm?: string;
  deskNm?: string;
  subDeskNm?: string;
  formula?: string;
  method?: string;
  methodDesc?: string;
  cob?: string;
  site?: string;
  allocation?: string;
  scaleFactor?: string;
  actualPlanFlg?: string | number;
  negAdminMarginFlg?: string;
  validFrom: string;
  validTo: string;
  loadDate: string;
  businessUnit?: string;
  IsEditable?: boolean;
};

export type UsdBbl = {
  id: string;
  entityNm?: string;
  deskNm?: string;
  manfSite?: string;
  buySell?: string;
  usdBbl?: number | string;
  year?: string;
  validFrom: string;
  validTo: string;
  loadDate: string;
  businessUnit?: string;
  subDeskNm?: string;
  actualPlanFlgUsdBbl?: string | number;
  planPeriod: string;
  cob: string;
  leAdj?: number | string;
};

export type LeSfsCodes = Partial<{
  cob?: string;
  sfsId?: string;
  logicCds?: string;
  statement?: string;
  kpi?: string;
  description?: string;
  subDescription?: string;
  scoa?: string;
  multiplier?: string;
  sourceTable?: string;
  sourceField?: string;
  cfWalkFlg?: string;
  alias_1?: string;
  diAl?: string;
  alias_2?: string;
  validFrom: string;
  validTo: string;
}>;

export type ReportFreezeMap = Partial<{
  cob: string;
  year: string;
  reportingMonth: string;
  rptNm: string;
  frzDt: string;
  frzTme: string;
  frzTmeZne: string;
  loadDate?: string;
}>;

export type newMappingType = MappingFileDataType & {
  error?: boolean;
  message?: boolean;
};

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
  classOfBusinessId: number;
  classOfBusiness: string;
};

export type MappingFileListSuccessResponse = {
  classOfBusinessId: number;
  dataIngestionId: number;
  originFrom: string;
  ingestionFileName: string;
  description: string;
};

export type MappingFileInstructionsSuccessResponse = {
  dataMappingId: number;
  instructionId: number;
  instructionToFollow: string;
};

export type OptionType = {
  id: string | number;
  name: string;
};
