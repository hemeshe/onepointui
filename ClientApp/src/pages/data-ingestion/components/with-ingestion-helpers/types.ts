import { SelectOptionType } from '../../../../store/data-ingestion/types';
import {
  OptionType,
  IngestionFileDataType,
  DataIngestionFileInstructionsSuccessResponse,
} from '../../../../types/data-ingestion';
import { UserAccessType } from '../../../../types/app';

export type ReturnProps = {
  classOfBusiness: SelectOptionType[] | null;
  dataIngestionFileList: SelectOptionType[] | null;
  handleCOFhange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDIFChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dataIngestionYears: OptionType[] | null;
  handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleQuarterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCompCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cofError: boolean;
  difError: boolean;
  yearError: boolean;
  monthError: boolean;
  quarterError: boolean;
  ingstionPreviewList: IngestionFileDataType[] | null;
  validateView: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  selectedCOF: OptionType;
  selectedDIF: OptionType;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;
  selectedQuarter: number | undefined;
  showPreview: boolean;
  dataIngestionFileInstructions:
    | DataIngestionFileInstructionsSuccessResponse[]
    | null;
  csvTemplate?: any[];
  userAccess?: UserAccessType;
  validateConfigure?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  companyCodeSel: number[];
};
