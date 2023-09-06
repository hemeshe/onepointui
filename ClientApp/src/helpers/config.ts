import CryptoJS from "crypto-js";

/* 
DEV
*/
export const dev_key = CryptoJS.enc.Base64.parse(
  "HW9/oaISVPHFh1NflNF8YaJDqQv9+vpnHxwid3iBdBg="
);

/* 
PROD
*/
export const prod_key = CryptoJS.enc.Base64.parse(
  "vmZTLkLQkMplDw2i7EQwuV62gMVuuW56fPrPDJAnlmM="
);

export const key =
  process.env.REACT_APP_BUILD_TYPE === "PROD" ? prod_key : dev_key;

/*
DEV
*/
export const dev_iv1 = CryptoJS.enc.Base64.parse("G5lObUtcdSYON0NaVMtYaA==");

/*
PROD
*/
export const prod_iv1 = CryptoJS.enc.Base64.parse("yz69ShiXh+fkx4SzS/hqyw==");

export const iv1 =
  process.env.REACT_APP_BUILD_TYPE === "PROD" ? prod_iv1 : dev_iv1;

/*
DEV
*/
export const dev_globalIv = CryptoJS.enc.Base64.parse(
  "G5lObUtcdSYON0NaVMtYaA=="
);

/*
PROD
*/
export const prod_globalIv = CryptoJS.enc.Base64.parse(
  "yz69ShiXh+fkx4SzS/hqyw=="
);

export const globalIv =
  process.env.REACT_APP_BUILD_TYPE === "PROD" ? prod_globalIv : dev_globalIv;

/*
DEV
*/
//export const dev_filePath = "/Land";

/* 
Azure@shell DEV
*/
export const dev_filePath = "";

/*
PROD
*/
//export const prod_filePath = "/Technical_Go_Live/Land"; //PROD

/*
Azure@shell PROD
*/
export const prod_filePath = ""; //PROD

export const filePath =
  process.env.REACT_APP_BUILD_TYPE === "PROD" ? prod_filePath : dev_filePath;
