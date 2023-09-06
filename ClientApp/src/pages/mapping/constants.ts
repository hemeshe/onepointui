export const ACTUAL_PLAN_FLAG_OPTIONS = [
  { value: 0, label: 'Plan' },
  { value: 1, label: 'Actual' },
  { value: 2, label: 'LE1' },
  { value: 3, label: 'LE2' },
  { value: 4, label: 'LE3' },
];

export const TIME_ZONE_OPTIONS = [
  { value: 'Eastern Standard Time', label: 'Eastern Standard Time' },
  { value: 'GMT Standard Time', label: 'GMT Standard Time' },
  { value: 'India Standard Time', label: 'India Standard Time' },
];

export const MONTHS_NAME_OPTION = [
  { value: 'Jan', label: 'January' },
  { value: 'Feb', label: 'February' },
  { value: 'Mar', label: 'March' },
  { value: 'Apr', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'June' },
  { value: 'Jul', label: 'July' },
  { value: 'Aug', label: 'August' },
  { value: 'Sep', label: 'September' },
  { value: 'Oct', label: 'October' },
  { value: 'Nov', label: 'November' },
  { value: 'Dec', label: 'December' },
];

export const Menus = [
  { name: 'View', route: '/mapping', privilegeRequired: 'READ' },
  { name: 'Add', route: '/mapping/add', privilegeRequired: 'WRITE' },
  { name: 'Edit', route: '/mapping/update', privilegeRequired: 'WRITE' },
  { name: 'Library', route: '/mapping/library', privilegeRequired: 'READ' },
  { name: 'History', route: '/mapping/history', privilegeRequired: 'READ' },
];
export const DataFileHeadings = [
  { id: 'DFH1', name: 'ENTITY_NM' },
  { id: 'DFH2', name: 'TAX_RATE' },
  { id: 'DFH3', name: 'START_DATE' },
  { id: 'DFH4', name: 'END_DATE' },
  { id: 'DFH5', name: 'LOAD_DATE' },
  { id: 'DFH6', name: 'LOAD_ID' },
];

export const MethodMapHeadings = [
  { id: 'DFH1', name: 'reportingLine', label: 'Reporting Line', sorted: false },
  { id: 'DFH2', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: 'DFH3', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: 'DFH3_a', name: 'subDeskNm', label: 'Sub Desk Name', sorted: false },
  { id: 'DFH4', name: 'formula', label: 'Formula', sorted: false },
  { id: 'DFH5', name: 'method', label: 'Method', validTo: false },
  { id: 'DFH6', name: 'methodDesc', label: 'Method Desc.', sorted: false },
  { id: 'DFH7', name: 'cob', label: 'Cob', sorted: false },
  { id: 'DFH7_a', name: 'site', label: 'site', sorted: false },
  { id: 'DFH8', name: 'allocation', label: 'Allocation', sorted: false },
  { id: 'DFH9', name: 'scaleFactor', label: 'Scale Factor', sorted: false },
  {
    id: 'DFH9_a',
    name: 'actualPlanFlg',
    label: 'Actual Plan Flag',
    sorted: false,
  },
  {
    id: 'DFH9_a_1',
    name: 'negAdminMarginFlg',
    label: 'Neg Admin Margin Flag',
    sorted: false,
  },
  { id: 'DFH10', name: 'validFrom', label: 'validFrom', sorted: false },
  { id: 'DFH11', name: 'validTo', label: 'validTo', sorted: false },
  { id: 'DFH12', name: 'loadDate', label: 'Load Date', sorted: false },
  { id: 'DFH13', name: 'businessUnit', label: 'Business Unit', sorted: false },
];

export const UsdBblHeadings = [
  { id: 'DFH2', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: 'DFH3', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: 'DFH4', name: 'manfSite', label: 'manfSite', sorted: false },
  { id: 'DFH5', name: 'buySell', label: 'buySell', validTo: false },
  { id: 'DFH6', name: 'usdBbl', label: 'usdBbl', sorted: false },
  { id: 'DFH7', name: 'year', label: 'year', sorted: false },
  { id: 'DFH10', name: 'validFrom', label: 'validFrom', sorted: false },
  { id: 'DFH11', name: 'validTo', label: 'validTo', sorted: false },
  { id: 'DFH12', name: 'loadDate', label: 'loadDate', sorted: false },
  { id: 'DFH13', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: 'DFH14', name: 'subDeskNm', label: 'Sub Desk Name', sorted: false },
  {
    id: 'DFH15',
    name: 'actualPlanFlgUsdBbl',
    label: 'Actual Plan Flag',
    sorted: false,
  },
  { id: 'DFH16', name: 'planPeriod', label: 'Plan Period', sorted: false },
  { id: 'DFH17', name: 'cob', label: 'Cob', sorted: false },
  { id: 'DFH18', name: 'leAdj', label: 'LeAdj', sorted: false },
];

export const LeSfsCodesHeadings = [
  { id: '1', name: 'cob', label: 'cob', sorted: false },
  { id: '2', name: 'sfsId', label: 'sfsId', sorted: false },
  { id: '3', name: 'logicCds', label: 'logicCds', sorted: false },
  { id: '4', name: 'statement', label: 'statement', sorted: false },
  { id: '5', name: 'kpi', label: 'kpi', sorted: false },
  { id: '6', name: 'description', label: 'description', sorted: false },
  { id: '7', name: 'subDescription', label: 'subDescription', sorted: false },
  { id: '8', name: 'scoa', label: 'scoa', sorted: false },
  { id: '9', name: 'multiplier', label: 'multiplier', sorted: false },
  { id: '10', name: 'sourceTable', label: 'sourceTable', sorted: false },
  { id: '11', name: 'sourceField', label: 'sourceField', sorted: false },
  { id: '12', name: 'cfWalkFlg', label: 'cfWalkFlg', sorted: false },
  { id: '13', name: 'alias_1', label: 'alias_1', sorted: false },
  { id: '14', name: 'diAl', label: 'diAl', sorted: false },
  { id: '15', name: 'alias_2', label: 'alias_2', sorted: false },
  { id: '16', name: 'validFrom', label: 'validFrom', sorted: false },
  { id: '17', name: 'validTo', label: 'validTo', sorted: false },
];

export const ReportFreezeMapHeadings = [
  { id: 'DFH1', name: 'cob', label: 'cob', sorted: false },
  { id: 'DFH2', name: 'year', label: 'year', sorted: false },
  {
    id: 'DFH3',
    name: 'reportingMonth',
    label: 'reportingMonth',
    sorted: false,
  },
  { id: 'DFH4', name: 'rptNm', label: 'rptNm', sorted: false },
  { id: 'DFH5', name: 'frzDt', label: 'frzDt', validTo: false },
  { id: 'DFH6', name: 'frzTme', label: 'frzTme', sorted: false },
  { id: 'DFH7', name: 'frzTmeZne', label: 'frzTmeZne', sorted: false },
  { id: 'DFH8', name: 'loadDate', label: 'loadDate', sorted: false },
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
