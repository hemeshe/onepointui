import { headings } from '../../types/data-ingestion';
export const Menus = [
  { name: 'View', route: '/data-ingestion', privilegeRequired: 'READ' },
  { name: 'Add', route: '/data-ingestion/add', privilegeRequired: 'WRITE' },
  { name: 'Edit', route: '/data-ingestion/update', privilegeRequired: 'WRITE' },
  {
    name: 'Configure',
    route: '/data-ingestion/configure',
    privilegeRequired: 'WRITE',
  },
  {
    name: 'History',
    route: '/data-ingestion/history',
    privilegeRequired: 'READ',
  },
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
  {
    id: 'DFH9',
    name: 'reasonForFailure',
    label: 'Reason For Failure',
    sorted: false,
  },
];

export const OCATHeadings: headings[] = [
  { id: 'OCATH1', name: 'year', label: 'Year', sorted: false },
  { id: 'OCATH2', name: 'cob', label: 'COB', sorted: false },
  { id: 'OCATH3', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: 'OCATH4', name: 'category', label: 'Category', sorted: false },
  { id: 'OCATH5', name: 'subCategory', label: 'Sub Category', sorted: false },
  { id: 'OCATH6', name: 'deskNm', label: 'Desk Nm', sorted: false },
  { id: 'OCATH7', name: 'entityNm', label: 'Entity Nm', sorted: false },
  {
    id: 'OCATH8',
    name: 'transactionItem',
    label: 'Transaction Item',
    sorted: false,
  },
  { id: 'OCATH9', name: 'bnftBusiness', label: 'Bnft Business', sorted: false },
  { id: 'OCATH10', name: 'ownrSbmitr', label: 'Owner Sbm Itr', sorted: false },
  { id: 'OCATH11', name: 'type', label: 'Type', sorted: false },
  {
    id: 'OCATH12',
    name: 'refinryLocatn',
    label: 'Refinary Location',
    sorted: false,
  },
  { id: 'OCATH13', name: 'region', label: 'Region', sorted: false },
  // { id: 'OCATH14', name: 'month', label: 'Month', sorted: false },
  // { id: 'OCATH15', name: 'amount', label: 'Amount', sorted: false },
];

export const ScorecardTB2FHeadings = [
  { id: 'DFH1', name: 'cob', label: 'cob', sorted: false },
  { id: 'DFH2', name: 'companyCd', label: 'Company Cd', sorted: false },
  { id: 'DFH3', name: 'reportingItem', label: 'Reporting Item', sorted: false },
  {
    id: 'DFH4',
    name: 'pnlDescription',
    label: 'Pnl Description',
    sorted: false,
  },
  { id: 'DFH5', name: 'profitCenter', label: 'Profit Center', sorted: false },
  // {
  //   id: 'DFH6',
  //   name: 'reportingMonth',
  //   label: 'Reporting Month',
  //   sorted: false,
  // },
  // { id: 'DFH7', name: 'amount', label: 'Amount', sorted: false },
  // { id: 'DFH8', name: 'loadDate', label: 'Load Date', sorted: false },
  { id: 'DFH9', name: 'deskNm', label: 'Desk Nm', sorted: false },
  { id: 'DFH10', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: 'DFH11', name: 'gmEntity', label: 'Gm Entity', sorted: false },
  { id: 'DFH12', name: 'sparCategory', label: 'Spar Category', sorted: false },
  { id: 'DFH13', name: 'reportGroup', label: 'Report Group', sorted: false },
  { id: 'DFH14', name: 'currency', label: 'Currency', sorted: false },
  { id: 'DFH15', name: 'taxEffect', label: 'Tax Effect', sorted: false },
];

export const WeeklyHeadings: headings[] = [
  { id: 'OCATH1', name: 'cob', label: 'COB', sorted: false },
  {
    id: 'OCATH2',
    name: 'reportingDate',
    label: 'Reporting Date',
    sorted: false,
  },
  { id: 'OCATH3', name: 'entityNm', label: 'Entity Nm', sorted: false },
  { id: 'OCATH4', name: 'deskShortNm', label: 'Desk Short Nm', sorted: false },
  { id: 'OCATH5', name: 'amount', label: 'Amount', sorted: false },
  { id: 'OCATH6', name: 'subDeskNm', label: 'Sub Desk Nm', sorted: false },
];

export const OCATPlanHeadings: headings[] = [
  { id: 'OCATH1', name: 'year', label: 'Year', sorted: false },
  { id: 'OCATH2', name: 'cob', label: 'COB', sorted: false },
  { id: 'OCATH3', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: 'OCATH4', name: 'category', label: 'Category', sorted: false },
  { id: 'OCATH5', name: 'subCategory', label: 'Sub Category', sorted: false },
  { id: 'OCATH6', name: 'deskNm', label: 'Desk Nm', sorted: false },
  { id: 'OCATH7', name: 'entityNm', label: 'Entity Nm', sorted: false },
  {
    id: 'OCATH8',
    name: 'transactionItem',
    label: 'Transaction Item',
    sorted: false,
  },
  { id: 'OCATH9', name: 'bnftBusiness', label: 'Bnft Business', sorted: false },
  { id: 'OCATH10', name: 'ownrSbmitr', label: 'Owner Sbm Itr', sorted: false },
  { id: 'OCATH11', name: 'type', label: 'Type', sorted: false },
  {
    id: 'OCATH12',
    name: 'refinryLocatn',
    label: 'Refinary Location',
    sorted: false,
  },
  { id: 'OCATH13', name: 'region', label: 'Region', sorted: false },
  // {
  //   id: "OCATH14",
  //   name: "month",
  //   label: "Month",
  //   sorted: false,
  // },
  // {
  //   id: "OCATH15",
  //   name: "planAmount",
  //   label: "Plan Amount",
  //   sorted: false,
  // },
];

export const WeekliesYearPlanHeadings: headings[] = [
  { id: 'OCATH1', name: 'year', label: 'Year', sorted: false },
  { id: 'OCATH2', name: 'cob', label: 'COB', sorted: false },
  { id: 'OCATH3', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: 'OCATH4', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: 'OCATH5', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: 'OCATH6', name: 'subDeskNm', label: 'SubDesk Name', sorted: false },
  { id: 'OCATH7', name: 'planAmount', label: 'Plan Amount', sorted: false },
  { id: 'OCATH8', name: 'loadDate', label: 'Load Date', sorted: false },
  { id: 'OCATH9', name: 'currency', label: 'Currency', sorted: false },
];

export const R1DataHeadings: headings[] = [
  { id: 'OCATH1', name: 'year', label: 'Year', sorted: false },
  // {
  //   id: "OCATH14",
  //   name: "month",
  //   label: "Month",
  //   sorted: false,
  // },
  { id: 'OCATH2', name: 'cob', label: 'COB', sorted: false },
  { id: 'OCATH3', name: 'busentdesc', label: 'BusEnt Desc', sorted: false },
  // {
  //   id: "OCATH4",
  //   name: "period",
  //   label: "period",
  //   sorted: false,
  // },
  { id: 'OCATH5', name: 'flowCode', label: 'Flow Code', sorted: false },
  { id: 'OCATH6', name: 'sector', label: 'Sector', sorted: false },
  { id: 'OCATH7', name: 'sectorDesc', label: 'Sector Desc', sorted: false },
  { id: 'OCATH8', name: 'aoo', label: 'Aoo', sorted: false },
  { id: 'OCATH9', name: 'aooDesc', label: 'Aoo Desc', sorted: false },
  { id: 'OCATH10', name: 'pcad', label: 'Pcad', sorted: false },
  { id: 'OCATH11', name: 'pcadDesc', label: 'Pcad Desc', sorted: false },
  { id: 'OCATH12', name: 'scoa', label: 'Scoa', sorted: false },
  { id: 'OCATH13', name: 'scoaDesc', label: 'Scoa Desc', sorted: false },
  { id: 'OCATH15', name: 'category', label: 'category', sorted: false },
  {
    id: 'OCATH16',
    name: 'detailItemDesc',
    label: 'DetailItem Desc',
    sorted: false,
  },
  // {
  //   id: "OCATH17",
  //   name: "amount",
  //   label: "amount",
  //   sorted: false,
  // },
];

export const LeYearPlanHeadings: headings[] = [
  { id: 'OCATH1-1', name: 'cob', label: 'Cob', sorted: false },
  { id: 'OCATH1', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: 'OCATH2', name: 'year', label: 'Year', sorted: false },
  {
    id: 'OCATH3',
    name: 'countryRegion',
    label: 'Country Region',
    sorted: false,
  },
  { id: 'OCATH4', name: 'pnlDescription', label: 'Description', sorted: false },
  { id: 'OCATH5', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: 'OCATH5-1', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: 'OCATH6', name: 'subDeskNm', label: 'SubDesk Name', sorted: false },
  { id: 'OCATH7', name: 'site', label: 'Site', sorted: false },
  // {
  //   id: "OCATH8",
  //   name: "planAmount",
  //   label: "Plan Amount",
  //   sorted: false,
  // },
  { id: 'OCATH9', name: 'planPeriod', label: 'Plan Period', sorted: false },
];

export const PowerEstimationHeadings: headings[] = [
  // { id: '1', name: 'cyEntityKey', label: 'cyEntityKey', sorted: false },
  // { id: '2', name: 'description', label: 'description', sorted: false },
  // { id: '3', name: 'dltDealType', label: 'dltDealType', sorted: false },
  // {
  //   id: '4',
  //   name: 'ctCompanyType',
  //   label: 'ctCompanyType',
  //   sorted: false,
  // },
  { id: '9', name: 'dnDirection', label: 'dnDirection', sorted: false },
  { id: '10', name: 'invoiceType', label: 'invoiceType', sorted: false },
  // { id: '11', name: 'shortName', label: 'shortName', sorted: false },
  // { id: '12', name: 'companyCode', label: 'companyCode', sorted: false },
  // { id: '13', name: 'companyName', label: 'companyName', sorted: false },
  // { id: "14", name: "amt", label: "amt", sorted: false },
  { id: '15', name: 'utUnit', label: 'utUnit', sorted: false },
  // { id: "16", name: "cst", label: "cst", sorted: false },
  { id: '17', name: 'cuCurrency', label: 'cuCurrency', sorted: false },
  { id: '18', name: 'recPayFlag', label: 'recPayFlag', sorted: false },
  // { id: '19', name: 'chargeType', label: 'chargeType', sorted: false },
  // { id: '20', name: 'hsHedgeKey', label: 'hsHedgeKey', sorted: false },
  // {
  //   id: '21',
  //   name: 'nettingAllowedFlag',
  //   label: 'nettingAllowedFlag',
  //   sorted: false,
  // },
  // {
  //   id: "22",
  //   name: "excludeFlag",
  //   label: "excludeFlag",
  //   sorted: false,
  // },
  // {
  //   id: "23",
  //   name: "cmActivityMonth",
  //   label: "cmActivityMonth",
  //   sorted: false,
  // },
  // {
  //   id: "24",
  //   name: "cmInvoiceMonth",
  //   label: "cmInvoiceMonth",
  //   sorted: false,
  // },
  // {
  //   id: "25",
  //   name: "cyCompanyKey",
  //   label: "cyCompanyKey",
  //   sorted: false,
  // },
  // { id: '26', name: 'profitCenter', label: 'profitCenter', sorted: false },
  { id: '27', name: 'year', label: 'year', sorted: false },
  // { id: "28", name: "newAmount", label: "newAmount", sorted: false },
];

export const SopusHeadings: headings[] = [
  // {
  //   id: "OCATH2",
  //   name: "reportingDate",
  //   label: "Reporting Date",
  //   sorted: false,
  // },
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
  // {
  //   id: "OCATH6",
  //   name: "amount",
  //   label: "Amount",
  //   sorted: false,
  // },
  { id: 'OCATH9', name: 'planPeriod', label: 'Plan Period', sorted: false },
  { id: 'OCATH10', name: 'subDeskNm', label: 'SubDesk Name', sorted: false },
  { id: 'OCATH7', name: 'loadDate', label: 'Load Date', sorted: false },
];

export const TaDirectIngestionHeadings = [
  { id: '3', name: 'pnlDescription', label: 'pnlDescription', sorted: false },
  { id: '4', name: 'deskNm', label: 'deskNm', sorted: false },
  { id: '5', name: 'subDeskNm', label: 'subDeskNm', sorted: false },
  { id: '6', name: 'entityNm', label: 'entityNm', sorted: false },
  { id: '7', name: 'businessUnit', label: 'businessUnit', sorted: false },
  { id: '8', name: 'cob', label: 'cob', sorted: false },
  { id: '9', name: 'method', label: 'method', sorted: false },
  { id: '10', name: 'methodDesc', label: 'methodDesc', sorted: false },
  { id: '15', name: 'fteEntityNm', label: 'fteEntityNm', sorted: false },
  { id: '16', name: 'fteDeskNm', label: 'fteDeskNm', sorted: false },
  { id: '26', name: 'site', label: 'site', sorted: false },
  { id: '28', name: 'formula', label: 'formula', sorted: false },
  { id: '29', name: 'planPeriod', label: 'planPeriod', sorted: false },
  { id: '30', name: 'loadDate', label: 'loadDate', sorted: false },
];

export const VolumeOneOffHeadings: headings[] = [
  { id: 'OCATH4', name: 'cob', label: 'COB', sorted: false },
  { id: 'OCATH1', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: 'OCATH5', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: 'OCATH5-1', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: 'OCATH3', name: 'subDeskNm', label: 'Sub Desk Name', sorted: false },
  { id: 'OCATH6-7', name: 'manfSite', label: 'Manf Site', sorted: false },
  { id: 'OCATH9', name: 'planPeriod', label: 'Plan Period', sorted: false },
  { id: 'OCATH6', name: 'loadDate', label: 'Load Date', sorted: false },
];

export const VolumeDenominatorHeadings: headings[] = [
  { id: '1', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: '2', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: '3', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: '4', name: 'subDeskNm', label: 'Sub Desk Name', sorted: false },
  { id: '5', name: 'description', label: 'Description', sorted: false },
  { id: '6', name: 'typeDesc', label: 'Type Desc', sorted: false },
  { id: '7', name: 'counterparty', label: 'Counter party', sorted: false },
  {
    id: '8',
    name: 'actualPlanFlgVol',
    label: 'Actual Plan Flg Vol',
    sorted: false,
  },
  { id: '9', name: 'planPeriod', label: 'Plan Period', sorted: false },
  { id: '10', name: 'loadDate', label: 'Load Date', sorted: false },
];

export const VolumeNumeratorHeadings: headings[] = [
  { id: '1', name: 'businessUnit', label: 'Business Unit', sorted: false },
  { id: '2', name: 'cob', label: 'Cob', sorted: false },
  { id: '3', name: 'entityNm', label: 'Entity Name', sorted: false },
  { id: '4', name: 'deskNm', label: 'Desk Name', sorted: false },
  { id: '5', name: 'subDeskNm', label: 'Sub Desk Name', sorted: false },
  { id: '6', name: 'refinery', label: 'Refinery', sorted: false },
  {
    id: '7',
    name: 'actualPlanFlgIgvol',
    label: 'Actual Plan Flg Igvol',
    sorted: false,
  },
  { id: '8', name: 'planPeriod', label: 'Plan Period', sorted: false },
  { id: '9', name: 'loadDate', label: 'Load Date', sorted: false },
];

export const EndurVolumeHeadings: headings[] = [
  { id: '1', name: 'buySellIndNm', label: 'BuySell IndNm', sorted: false },
  {
    id: '2',
    name: 'cptyBunitShrtNm',
    label: 'Cpty Bunit ShrtNm',
    sorted: false,
  },
  {
    id: '3',
    name: 'cptyLentityShrtNm',
    label: 'Cpty Lentity ShrtNm',
    sorted: false,
  },
  { id: '4', name: 'facilStateNm', label: 'Facil StateNm', sorted: false },
  { id: '5', name: 'drCrIndNm', label: 'DrCr IndNm', sorted: false },
  { id: '6', name: 'facilNm', label: 'Facil Nm', sorted: false },
  { id: '7', name: 'genlStringNm', label: 'Genl StringNm', sorted: false },
  { id: '8', name: 'instrmtTypeNm', label: 'Instrmt TypeNm', sorted: false },
  { id: '9', name: 'intrfaceFlag', label: 'Intrface Flag', sorted: false },
  { id: '10', name: 'bunitShrtNm', label: 'Bunit ShrtNm', sorted: false },
  { id: '11', name: 'bunitLvl2Nm', label: 'Bunit Lvl2Nm', sorted: false },
  { id: '12', name: 'lentityShrtNm', label: 'Lentity ShrtNm', sorted: false },
  {
    id: '13',
    name: 'nomDischrgPortLocNm',
    label: 'NomDischrg PortLocNm',
    sorted: false,
  },
  { id: '14', name: 'prdctGrdNm', label: 'Prdct GrdNm', sorted: false },
  { id: '15', name: 'procGpNm', label: 'Proc GpNm', sorted: false },
  { id: '16', name: 'ptyTypeNm', label: 'Pty TypeNm', sorted: false },
  {
    id: '17',
    name: 'sapCustVendNoTxt',
    label: 'Sap CustVendNo Txt',
    sorted: false,
  },
  { id: '18', name: 'scoaAcctNo', label: 'Scoa AcctNo', sorted: false },
  { id: '19', name: 'sldgrAcctNm', label: 'Sldgr AcctNm', sorted: false },
  { id: '20', name: 'toolsetNm', label: 'ToolsetNm', sorted: false },
  { id: '21', name: 'uomDesc', label: 'UomDesc', sorted: false },
  { id: '22', name: 'loadDate', label: 'Load Date', sorted: false },
];

export const EndurCanadaBuyHeadings: headings[] = [
  { id: '1', name: 'company', label: 'Company', sorted: false },
  { id: '2', name: 'uom', label: 'Uom', sorted: false },
  { id: '3', name: 'loadDate', label: 'LoadDate', sorted: false },
];

export const EndurCanadaSellHeadings: headings[] = [
  { id: '1', name: 'companyCode', label: 'CompanyCode', sorted: false },
  { id: '2', name: 'loadDate', label: 'LoadDate', sorted: false },
];

export const TaWorkingCapitalHeadings: headings[] = [
  { id: '1', name: 'businessUnit', label: 'businessUnit', sorted: false },
  { id: '2', name: 'entityNm', label: 'entityNm', sorted: false },
  { id: '3', name: 'deskNm', label: 'deskNm', sorted: false },
  { id: '4', name: 'subDeskNm', label: 'subDeskNm', sorted: false },
  { id: '5', name: 'currency', label: 'currency', sorted: false },
  { id: '6', name: 'reportingLine', label: 'reportingLine', sorted: false },
  { id: '7', name: 'pnlDescription', label: 'pnlDescription', sorted: false },
  { id: '8', name: 'site', label: 'site', sorted: false },
  { id: '9', name: 'loadDate', label: 'loadDate', sorted: false },
];

export const R1PlanDataHeadings: headings[] = [
  { id: 'OCATH1', name: 'year', label: 'Year', sorted: false },
  { id: 'OCATH2', name: 'cob', label: 'COB', sorted: false },
  { id: 'OCATH3', name: 'busentdesc', label: 'BusEnt Desc', sorted: false },
  { id: 'OCATH4', name: 'flowCode', label: 'Flow Code', sorted: false },
  { id: 'OCATH5', name: 'sector', label: 'Sector', sorted: false },
  { id: 'OCATH6', name: 'sectorDesc', label: 'Sector Desc', sorted: false },
  { id: 'OCATH7', name: 'aoo', label: 'Aoo', sorted: false },
  { id: 'OCATH8', name: 'aooDesc', label: 'Aoo Desc', sorted: false },
  { id: 'OCATH9', name: 'pcad', label: 'Pcad', sorted: false },
  { id: 'OCATH10', name: 'pcadDesc', label: 'Pcad Desc', sorted: false },
  { id: 'OCATH11', name: 'scoa', label: 'Scoa', sorted: false },
  { id: 'OCATH12', name: 'scoaDesc', label: 'Scoa Desc', sorted: false },
  { id: 'OCATH13', name: 'category', label: 'category', sorted: false },
  {
    id: 'OCATH14',
    name: 'detailItemDesc',
    label: 'DetailItem Desc',
    sorted: false,
  },
];

export const LeForecastAdjustHeadings: headings[] = [
  { id: '1', name: 'year', label: 'Year', sorted: false },
  { id: '2', name: 'businessUnit', label: 'BusinessUnit', sorted: false },
  { id: '3', name: 'kpi', label: 'Kpi', sorted: false },
  { id: '4', name: 'deskNm', label: 'DeskNm', sorted: false },
  { id: '5', name: 'subDeskNm', label: 'SubDeskNm', sorted: false },
  { id: '6', name: 'entityNm', label: 'EntityNm', sorted: false },
  { id: '7', name: 'cob', label: 'Cob', sorted: false },
  { id: '8', name: 'refinery', label: 'Refinery', sorted: false },
  { id: '9', name: 'loadDate', label: 'LoadDate', sorted: false },
];

export const ForecastCIActualHeadings: headings[] = [
  { id: '1', name: 'cob', label: 'Cob', sorted: false },
  { id: '2', name: 'kpi', label: 'Kpi', sorted: false },
  { id: '3', name: 'description', label: 'Description', sorted: false },
  { id: '4', name: 'subDescription', label: 'SubDescription', sorted: false },
  { id: '5', name: 'entityNm', label: 'EntityNm', sorted: false },
  { id: '6', name: 'businessUnit', label: 'BusinessUnit', sorted: false },
  { id: '7', name: 'pcad', label: 'PCAD', sorted: false },
  { id: '8', name: 'loadDate', label: 'LoadDate', sorted: false },
];

export const ForecastWcIvActualHeadings: headings[] = [
  { id: '1', name: 'cob', label: 'Cob', sorted: false },
  { id: '2', name: 'entityNm', label: 'EntityNm', sorted: false },
  { id: '3', name: 'deskNm', label: 'DeskNm', sorted: false },
  { id: '4', name: 'businessUnit', label: 'BusinessUnit', sorted: false },
  { id: '5', name: 'item', label: 'Item', sorted: false },
  { id: '6', name: 'itemDetailed1', label: 'ItemDetailed1', sorted: false },
  { id: '7', name: 'itemDetailed2', label: 'ItemDetailed2', sorted: false },
  { id: '8', name: 'srcDeskNm', label: 'SrcDeskNm', sorted: false },
  { id: '9', name: 'loadDate', label: 'LoadDate', sorted: false },
];

export const SenaWcFifoLocomHeadings: headings[] = [
  { id: '1', name: 'compCode', label: 'CompCode', sorted: false },
  { id: '2', name: 'ant', label: 'Ant', sorted: false },
  { id: '3', name: 'loadDate', label: 'LoadDate', sorted: false },
];

export const SenaImVmHeadings: headings[] = [
  { id: '1', name: 'compCode', label: 'CompCode', sorted: false },
  { id: '2', name: 'glAccount', label: 'GlAccount', sorted: false },
  { id: '3', name: 'loadDate', label: 'LoadDate', sorted: false },
];

export const WonaQtrInvAdjHeadings: headings[] = [
  { id: '1', name: 'businessUnit', label: 'businessUnit', sorted: false },
  { id: '2', name: 'classOfBusiness', label: 'classOfBusiness', sorted: false },
  { id: '3', name: 'companyCode', label: 'companyCode', sorted: false },
  {
    id: '4',
    name: 'reportingDeskName',
    label: 'reportingDeskName',
    sorted: false,
  },
];

export const ForecastCffoPreLeHeadings: headings[] = [
  { id: '1', name: 'cob', label: 'cob', sorted: false },
  { id: '2', name: 'kpi', label: 'kpi', sorted: false },
  { id: '3', name: 'description', label: 'description', sorted: false },
  { id: '4', name: 'businessUnit', label: 'businessUnit', sorted: false },
  { id: '5', name: 'lePeriod', label: 'lePeriod', sorted: false },
  { id: '6', name: 'loadDate', label: 'loadDate', sorted: false },
];

export const PowerMtmHeadings: headings[] = [
  { id: '1', name: 'physFin', label: 'physFin', sorted: false },
  { id: '2', name: 'companyCode', label: 'companyCode', sorted: false },
  { id: '3', name: 'buySellFlag', label: 'buySellFlag', sorted: false },
  { id: '4', name: 'stLt', label: 'stLt', sorted: false },
  { id: '5', name: 'loadDate', label: 'loadDate', sorted: false },
];
