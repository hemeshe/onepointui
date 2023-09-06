import { SelectOptionType } from "../../../../store/data-ingestion/types";
import {
  OptionType,
  MappingFileDataType,
  MappingFileInstructionsSuccessResponse,
} from "../../../../types/mapping";
import { UserAccessType } from "../../../../types/app";

export type ReturnProps = {
  classOfBusiness: SelectOptionType[] | null;
  dataMappingFileList: SelectOptionType[] | null;
  handleCOFhange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMTChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dataMappingYears: OptionType[] | null;
  handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  cofError: boolean;
  mtError: boolean;
  yearError: boolean;
  monthError: boolean;
  mappingPreviewList: MappingFileDataType[] | null;
  validateView: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  selectedCOF: OptionType;
  selectedMT: OptionType;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;
  showPreview: boolean;
  dataMappingFileInstructions: MappingFileInstructionsSuccessResponse[] | null;
  csvTemplate?: any[];
  userAccess?: UserAccessType;
};
