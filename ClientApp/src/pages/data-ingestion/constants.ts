import { headings } from '../../types/data-ingestion';
export const Menus = [
  { name: 'View', route: '/data-ingestion', privilegeRequired: 'READ' },
  { name: 'Add', route: '/data-ingestion/add', privilegeRequired: 'WRITE' },
  { name: 'Edit', route: '/data-ingestion/update', privilegeRequired: 'WRITE' },
  // {
  //   name: 'Configure',
  //   route: '/data-ingestion/configure',
  //   privilegeRequired: 'WRITE',
  // },
  {
    name: 'History',
    route: '/data-ingestion/history',
    privilegeRequired: 'READ',
  },
];

export const CompanyCodeDetails = [
  { id: '1001', name: '1001' },
  { id: '1022', name: '1022' },
];

export const DataFileHeadings = [
  { id: 'DFH1', name: 'Year', label: 'Year' },
  { id: 'DFH2', name: 'Reporting_Line', label: 'Reporting Line' },
  { id: 'DFH3', name: 'Business', label: 'Business' },
  { id: 'DFH4', name: 'Category', label: 'Category' },
  { id: 'DFH5', name: 'Sub Category', label: 'Sub Category' },
  { id: 'DFH6', name: 'Desk_Nm', label: 'Desk Nm' },
  { id: 'DFH7', name: 'Entity_Nm', label: 'Entity Nm' },
  { id: 'DFH8', name: 'Month', label: 'Month' },
  { id: 'DFH9', name: 'Amount', label: 'Amount' },
];

export const HistoryHeadings = [
  { id: 'DFH1', name: 'fileName', label: 'file Name', sorted: false },
  { id: 'DFH2', name: 'changeTime', label: 'TIME', sorted: false },
  { id: 'DFH3', name: 'changeTime', label: 'DATE', sorted: false },
  { id: 'DFH4', name: 'fileSize', label: 'file Size', sorted: false },
  { id: 'DFH5', name: 'fileType', label: 'file Type', sorted: false },
  {
    id: 'DFH6',
    name: 'classOfBusiness',
    label: 'class Of Business',
    sorted: false,
  },
  { id: 'DFH7', name: 'submittedBy', label: 'submitted By', sorted: false },
  { id: 'DFH8', name: 'fileStatus', label: 'File Status', sorted: false },
  // {
  //   id: 'DFH9',
  //   name: 'reasonForFailure',
  //   label: 'Reason For Failure',
  //   sorted: false,
  // },
];

export const SopusHeadings: headings[] = [
  {
    id: 'OCATH2',
    name: 'reportingDate',
    label: 'Reporting Date',
    sorted: false,
  },
  {
    id: 'OCATH4',
    name: 'pnlDescription',
    label: 'Pnl Description',
    sorted: false,
  },
  { id: 'OCATH1', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: 'OCATH5', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: 'OCATH3', name: 'region', label: 'Region', sorted: false },
  { id: 'OCATH5-1', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: 'OCATH6', name: 'amount', label: 'Amount', sorted: false },
  {
    id: 'OCATH7',
    name: 'actualPlanFlgMthO1f',
    label: 'Actual Plan Flg MthO1f',
    sorted: false,
  },
  { id: 'OCATH9', name: 'planPeriod', label: 'Plan Period', sorted: false },
  { id: 'OCATH10', name: 'subDeskNm', label: 'Sub Desk Name', sorted: false },
];

export const VolumeNumeratorHeadings: headings[] = [
  { id: '1', name: 'reportingDate', label: 'Reporting Date', sorted: false },
  { id: '2', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: '3', name: 'cob', label: 'Cob', sorted: false },
  { id: '4', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: '5', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: '6', name: 'subDeskNm', label: 'Sub Desk Name', sorted: false },
  { id: '7', name: 'volumeIg', label: 'Volume Ig', sorted: false },
  { id: '8', name: 'refinery', label: 'Refinery', sorted: false },
  { id: '9', name: 'buySell', label: 'BuySell', sorted: false },
  {
    id: '10',
    name: 'actualPlanFlgIgvol',
    label: 'Actual Plan Flg Igvol',
    sorted: false,
  },
  { id: '11', name: 'planPeriod', label: 'Plan Period', sorted: false },
];

export const TaWorkingCapitalHeadings: headings[] = [
  { id: '1', name: 'reportingDate', label: 'reportingDate', sorted: false },
  { id: '2', name: 'year', label: 'year', sorted: false },
  { id: '3', name: 'quarter', label: 'quarter', sorted: false },
  { id: '4', name: 'month', label: 'month', sorted: false },
  { id: '5', name: 'businessUnit', label: 'businessUnit', sorted: false },
  { id: '6', name: 'entityNm', label: 'entityNm', sorted: false },
  { id: '7', name: 'deskNm', label: 'deskNm', sorted: false },
  { id: '8', name: 'subDeskNm', label: 'subDeskNm', sorted: false },
  { id: '9', name: 'currency', label: 'currency', sorted: false },
  { id: '10', name: 'amount', label: 'amount', sorted: false },
  {
    id: '11',
    name: 'actualPlanLeFlg',
    label: 'actualPlanLeFlg',
    sorted: false,
  },
  { id: '12', name: 'reportingLine', label: 'reportingLine', sorted: false },
  { id: '13', name: 'pnlDescription', label: 'pnlDescription', sorted: false },
  { id: '14', name: 'site', label: 'site', sorted: false },
  { id: '15', name: 'loadDate', label: 'loadDate', sorted: false },
];

export const CcpnHeadings: headings[] = [
  { id: '1', name: 'ccpnYear', label: 'ccpnYear', sorted: false },
  { id: '2', name: 'ccpnQuarter', label: 'ccpnQuarter', sorted: false },
  { id: '3', name: 'ccpnCcpnFlag', label: 'ccpnCcpnFlag', sorted: false },
  { id: '4', name: 'ccpnSapId', label: 'ccpnSapId', sorted: false },
  {
    id: '5',
    name: 'ccpnSapShortName',
    label: 'ccpnSapShortName',
    sorted: false,
  },
  { id: '6', name: 'ccpnCompanyCode', label: 'ccpnCompanyCode', sorted: false },
  { id: '7', name: 'ccpnLoadDate', label: 'ccpnLoadDate', sorted: false },
  { id: '8', name: 'ccpnUpdatedBy', label: 'ccpnUpdatedBy', sorted: false },
  { id: '9', name: 'ccpnUpdatedAt', label: 'ccpnUpdatedAt', sorted: false },
];
