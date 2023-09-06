export type UserAccessType = 'READ' | 'WRITE' | string;

export type ParamsType = {
  cob?: string;
  cobid?: string;
  mt?: string;
  mtid?: string;
  dif?: string;
  year?: string;
  month?: string | number;
  reportid?: string;
  ss1?: string;
  ss1id?: string | number;
  ss2?: string;
  ss2id?: string | number;
  dashboard?: string;
  dashboardid?: string | number;
  report?: string;
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
};
