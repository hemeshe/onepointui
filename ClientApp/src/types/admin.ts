import { UserAccessType } from './app';

//type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type StatusType = 'Active' | 'Inactive' | boolean | string;

export type optionType = {
  label: string | number;
  value: string | number;
};

export type landingPageSelectOptionsType = {
  parentName: string;
  options: [];
};

export type ProfilesPagesType = {
  homePageId?: number;
  homePageName?: string;
  landingPageId?: number;
  landingPageName?: string;
  subLandingPageId?: number;
  subLandingPageName?: string;
  reportId?: number;
  reportName?: string;
  pageName?: string;
  pageId?: number;
};

export type User = {
  id: string;
  IsEditable?: boolean;
  userEmail: string;
  access?: UserAccessType | string;
  status?: StatusType;
  isActive: boolean;
  createTs: string;
  modifiedTs: string;
  createBy: string;
  modifiedBy: string;
  // homePage?: optionType[];
  // landingPage?: optionType[];
  // subLandingPage?: optionType[];
  // report?: optionType[];
  homePage?: string;
  homePageId?: string | number;
  landingPage?: string;
  landingPageId?: string | number;
  subLandingPage?: string;
  subLandingPageId?: string | number;
  report?: string;
  reportId?: string | number;
  userPageId?: string;
  createdBy?: string;
  createdTs?: string;
  iv?: string;
  homePageOptions?: any[];
  landingPageOptions?: any[];
  subLandingPageOptions?: any[];
  landingPage1?: number[];

  userEmailId?: string;
  pbiRlsTeamAccessName?: string;
  pbiRlsTeamAccessId?: string | number;
  pbiRlsUserAccessId?: string | number;
  role?: string;

  /* for power bi drls profiles */

  profileType?: string;
  profileName?: string;
  homePages?: ProfilesPagesType[] | null;
  landingPages?: ProfilesPagesType[] | null;
  subLandingPages?: ProfilesPagesType[] | null;
  reportDetails?: ProfilesPagesType[] | null;
  reportOptions?: any[];
  statusProfile?: boolean;
  profileId?: string;
  selectedHomePages?: any[];
  landingPageSelectOptions?: any[];
  selectedLandingPages?: any[];
  selectedSubLandingPages?: any[];
  selectedReportPages?: any[];

  // added for history because of db
  teamName?: string;
  subLandingPageCobName?: string;

  homePageName?: string;
  landingPageName?: string;
  subLandingPageName?: string;
  reportName?: string;
  teamReportId?: number;
};
