import { MappingFileDataType } from '../../../types/mapping';

import { DateType } from '../hooks/useSetDateInputsForEdit';

export type InputProps = {
  d: MappingFileDataType;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number | string
  ) => void;
  setValidToDate?: (
    date: Date,
    id: string | number,
    validFrom: string | DateType
  ) => void;
  setValidFromDate?: (date: Date, id: string | number) => void;
};
