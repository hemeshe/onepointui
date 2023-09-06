//import { User } from "../../../types/admin";

export const Menus = [
  {
    name: "View",
    route: "/admin/mi-station",
    privilegeRequired: "READ",
  },
  {
    name: "Add",
    route: "/admin/mi-station/add",
    privilegeRequired: "WRITE",
  },
  {
    name: "Edit",
    route: "/admin/mi-station/update",
    privilegeRequired: "WRITE",
  },
  {
    name: "History",
    route: "/admin/mi-station/history",
    privilegeRequired: "READ",
  },
];
export const UserHeadings = [
  // {
  //   id: "DFH1",
  //   label: "ID",
  //   name: "id",
  //   sorted: false,
  // },
  {
    id: "DFH2",
    label: "USER EMAIL",
    name: "userEmail",
    sorted: false,
  },
  // {
  //   id: "DFH3",
  //   label: "HOME PAGE",
  //   name: "homePage",
  //   sorted: false,
  // },
  {
    id: "DFH4",
    label: "LANDING PAGE",
    name: "landingPage",
    sorted: false,
  },
  {
    id: "DFH5",
    label: "SUB LANDING PAGE",
    name: "subLandingPage",
    sorted: false,
  },
  // {
  //   id: "DFH6",
  //   label: "REPORT",
  //   name: "report",
  //   sorted: false,
  // },
  {
    id: "DFH7",
    label: "STATUS",
    name: "status",
    sorted: false,
  },
  {
    id: "DFH8",
    label: "CREATED",
    name: "createdTs",
    sorted: false,
  },
  {
    id: "DFH9",
    label: "MODIFIED",
    name: "modifiedTs",
    sorted: false,
  },
  {
    id: "DFH10",
    label: "CREATED BY",
    name: "createdBy",
    sorted: false,
  },
  {
    id: "DFH11",
    label: "MODIFIED BY",
    name: "modifiedBy",
    sorted: false,
  },
];

export const accessOptions = ["Read", "Write"];
export const statusOptions = ["Active", "Inactive"];
export const isActiveOptions = ["true", "false"];
export const homePageOptions = [
  { label: "EVP & Central", value: "EVP & Central" },
  { label: "Operations", value: "Operations" },
  { label: "Shipping", value: "Shipping" },
  { label: "Crude", value: "Crude" },
  { label: "Products", value: "Products" },
  { label: "Shell Energy", value: "Shell Energy" },
];
export const landingPageOptions = [
  { label: "Asia", value: "Asia" },
  { label: "Australia", value: "Australia" },
  { label: "Europe & EPTM", value: "Europe & EPTM" },
  { label: "LNG Marketing & Trading", value: "LNG Marketing & Trading" },
  { label: "Americas", value: "Americas" },
  { label: "Combined", value: "Combined" },
];
export const subLandingPageOptions = [
  { label: "Generation", value: "Generation" },
  { label: "Trading", value: "Trading" },
  { label: "Customers", value: "Customers" },
  { label: "Combined", value: "Combined" },
];
export const reportOptions = [
  { label: "Scorecard", value: "Scorecard" },
  { label: "Performance Tracker", value: "Performance Tracker" },
  { label: "Trading Allocations", value: "Trading Allocations" },
  { label: "Cost Reporting", value: "Cost Reporting" },
  { label: "Cashflow", value: "Cashflow" },
  { label: "Overall Tracker", value: "OverAll Tracker" },
  { label: "Working Capital", value: "Working Capital" },
  { label: "Capital Employed", value: "Capital Employed" },
  { label: "Volume", value: "Volume" },
  { label: "Headcount", value: "Headcount" },
  { label: "Commitment Tracker", value: "Commitment Tracker" },
];

export const usersData = [
  {
    id: "85",
    IsEditable: false,
    userEmail: "byreddy.praneeth@shell.com",
    status: "Active",
    isActive: false,
    createTs: "2020-12-03",
    modifiedTs: "2020-12-03",
    createBy: "JesseEscobedo@shell.com",
    modifiedBy: "bala.g@shell.com",
    homePage: [
      {
        label: "Crude",
        value: "Crude",
      },
      {
        label: "Products",
        value: "Products",
      },
      {
        label: "Shell Energy",
        value: "Shell Energy",
      },
    ],
    landingPage: [
      {
        label: "Asia",
        value: "Asia",
      },
      {
        label: "Americas",
        value: "Americas",
      },
      {
        label: "Combined",
        value: "Combined",
      },
    ],
    subLandingPage: [
      {
        label: "Generation",
        value: "Generation",
      },
      {
        label: "Combined",
        value: "Combined",
      },
    ],
    report: [
      {
        label: "Scorecard",
        value: "Scorecard",
      },
      {
        label: "Performance Tracker",
        value: "Performance Tracker",
      },
      {
        label: "Trading Allocations",
        value: "Trading Allocations",
      },
      {
        label: "Cost Reporting",
        value: "Cost Reporting",
      },
    ],
  },
  {
    id: "53",
    IsEditable: false,
    userEmail: "deepak.hp@shell.com",
    status: "Active",
    isActive: false,
    createTs: "2020-12-03",
    modifiedTs: "2020-12-03",
    createBy: "JesseEscobedo@shell.com",
    modifiedBy: "bala.g@shell.com",
    homePage: [
      {
        label: "Crude",
        value: "Crude",
      },
    ],
    landingPage: [
      { label: "Asia", value: "Asia" },
      { label: "Australia", value: "Australia" },
      { label: "Europe & EPTM", value: "Europe & EPTM" },
      { label: "LNG Marketing & Trading", value: "LNG Marketing & Trading" },
      { label: "Americas", value: "Americas" },
      { label: "Combined", value: "Combined" },
    ],
    subLandingPage: [
      { label: "Generation", value: "Generation" },
      { label: "Trading", value: "Trading" },
      { label: "Customers", value: "Customers" },
      { label: "Combined", value: "Combined" },
    ],
    report: [
      { label: "Scorecard", value: "Scorecard" },
      { label: "Performance Tracker", value: "Performance Tracker" },
      { label: "Trading Allocations", value: "Trading Allocations" },
      { label: "Cost Reporting", value: "Cost Reporting" },
      { label: "Cashflow", value: "Cashflow" },
      { label: "Overall Tracker", value: "OverAll Tracker" },
      { label: "Working Capital", value: "Working Capital" },
      { label: "Capital Employed", value: "Capital Employed" },
      { label: "Volume", value: "Volume" },
      { label: "Headcount", value: "Headcount" },
      { label: "Commitment Tracker", value: "Commitment Tracker" },
    ],
  },
];
