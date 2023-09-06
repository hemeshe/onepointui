import React from 'react';

import { SelectInput } from '../../components/select-input';

export type OptionType = {
  id: string | number;
  name: string;
};

type Props = {
  label?: string;
  classOfBusiness: OptionType[] | null;
  handleCOFhange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMTChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dataMappingFileList: OptionType[] | null;
  dataMappingYears: OptionType[] | null;
  handleYearChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMonthChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cofError: boolean;
  mtError: boolean;
  yearError: boolean;
  monthError: boolean;
};

export const MappingSelectionForm = ({
  classOfBusiness,
  handleCOFhange,
  dataMappingFileList,
  handleMTChange,
  cofError,
  mtError,
}: Props) => (
  <React.Fragment>
    <SelectInput
      label='Class Of Business'
      options={
        classOfBusiness ? classOfBusiness : [{ id: 0, name: 'Loading...' }]
      }
      onChange={handleCOFhange}
      error={cofError}
      ariaLabel='Select Class of Business'
    />
    <SelectInput
      label='Mapping Table'
      options={
        dataMappingFileList
          ? dataMappingFileList
          : [{ id: '0', name: 'Select mapping table first' }]
      }
      onChange={handleMTChange}
      error={mtError}
      ariaLabel='Select Mapping File'
    />
  </React.Fragment>
);
