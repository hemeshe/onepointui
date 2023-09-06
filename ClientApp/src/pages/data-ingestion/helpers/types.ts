import { IngestionFileDataType } from '../../../types/data-ingestion';

export type InputsProps = {
  ing: IngestionFileDataType;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number | string
  ) => void;
  errorFieldName: string | undefined;
  setReportingDate?: (date: Date, id: string | number) => void;
  setCommonDateField?: (date: Date, id: string | number, fieldName: string) => void;
};
