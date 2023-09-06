// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    readonly fontSize: Record<
      "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl",
      string
    >;
    readonly spacing: Record<
      "xxs" | "xxxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl",
      string
    >;
    readonly tableCellPadding: Record<"xxs" | "xs" | "s" | "m", string>;
    readonly color: Record<
      | "backgroundDark"
      | "backgroundLight"
      | "backgroundMain"
      | "backgroundGrey"
      | "backgroundMessage"
      | "backgroundWhite"
      | "danger"
      | "dangerComplement"
      | "dropdownHighlight"
      | "font"
      | "icon"
      | "mightyBlue"
      | "placeholder"
      | "primary"
      | "quiet"
      | "success"
      | "successComplement"
      | "warning"
      | "warningComplement"
      | "transparentBlack"
      | "transparentWhite",
      string
    >;
    readonly headerHeight: string;
    readonly size: Record<
      | "10"
      | "12"
      | "14"
      | "16"
      | "18"
      | "20"
      | "21"
      | "22"
      | "24"
      | "26"
      | "28"
      | "32"
      | "40"
      | "44"
      | "48"
      | "56"
      | "72"
      | "88"
      | "94"
      | "96",
      string
    >;
    readonly buttonColors: Record<
      "primaryFont" | "primaryBackground" | "primaryBorder"
    >;
  }
}
