import { MappingFileDataType, newMappingType } from '../../../../types/mapping';

export type AddFormProps = {
  newMapping: newMappingType[];
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string,
    key: keyof MappingFileDataType
  ) => void;
  handleRemoveAddRow: (d: MappingFileDataType) => void;
};
