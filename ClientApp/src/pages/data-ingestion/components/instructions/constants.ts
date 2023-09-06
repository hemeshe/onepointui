import { InsType } from "./types";

export const INST: InsType[] = [
  {
    id: "IN1",
    instruction: "OCAT data is ingested on monthly frequency.",
  },
  {
    id: "IN2",
    instruction: "Mapping to columns should be done manually & Amount*1000.",
  },
  {
    id: "IN3",
    instruction:
      "Cannot have blank column headers(must have names as shown in preview).",
  },
  {
    id: "IN3",
    instruction: "Fiscal year/period should be mapped to REPORTING_DATE.",
  },
  {
    id: "IN4",
    instruction:
      "Data should be filtered by Business, Sub-category, Desk, Entity & Month.",
  },
];

export const REPORTINS: InsType[] = [
  {
    id: "REPORTINS1",
    instruction: "Other Contributions.",
  },
  {
    id: "REPORTINS2",
    instruction: "Contributions Chart-Margin + OC.",
  },
  {
    id: "REPORTINS3",
    instruction: "Other Contributions NIBIAT + OCAT.",
  },
];
