import React from 'react';

import { SelectInput } from '../../components/select-input';
import { MultiSelectDropDown } from '../../../../components/multi-select-drop-down';
import { Row, BlockCol } from '../../../../components/grid';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const quarterNames = ['Q1', 'Q2', 'Q3', 'Q4'];
const companyCodeOptions = [
  { id: 1001, pageName: '1001', key: '1001', value: '1001' },
  { id: 1022, pageName: '1022', key: '1022', value: '1022' },
  { id: 1023, pageName: '1023', key: '1022', value: '1022' },
  { id: 1024, pageName: '1024', key: '1022', value: '1022' },
  { id: 1025, pageName: '1025', key: '1022', value: '1022' },
];
const monthArray = monthNames.map((m) => {
  return {
    id: m.slice(0, 3),
    name: m,
  };
});

const quarterArray = quarterNames.map((m) => {
  return {
    id: m.slice(1, 2),
    name: m,
  };
});

// const comCodeArray = companyCodeOptions.map((m) => {
//   return {
//     id: m,
//     pageName: m,
//     key: m,
//     value: m,
//   };
// });

// type optionType1 = {
//   key: string;
//   value: string;
//   pageName?: string;
//   id: number;
// };

export type OptionType = {
  id: string | number;
  name: string;
};

type Props = {
  label?: string;
  classOfBusiness: OptionType[] | null;
  handleCOFhange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDIFChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dataIngestionFileList: OptionType[] | null;
  dataIngestionYears: OptionType[] | null;
  handleYearChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMonthChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleQuarterChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCompCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cofError: boolean;
  difError: boolean;
  yearError: boolean;
  monthError: boolean;
  quarterError: boolean;
  currentSubNav?: string;
  companyCodeSel?: number[];
};

export const IngestionSelectionForm = ({
  classOfBusiness,
  handleCOFhange,
  dataIngestionFileList,
  handleDIFChange,
  dataIngestionYears,
  handleYearChange,
  handleMonthChange,
  handleQuarterChange,
  handleCompCodeChange,
  cofError,
  difError,
  yearError,
  monthError,
  quarterError,
  currentSubNav,
  companyCodeSel,
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
      label='Data Ingestion File'
      options={
        dataIngestionFileList
          ? dataIngestionFileList
          : [{ id: '0', name: 'Select class of business first' }]
      }
      onChange={handleDIFChange}
      error={difError}
      ariaLabel='Select Data Ingestion File'
    />
    {currentSubNav == 'Add' && (
      <MultiSelectDropDown
        options={companyCodeOptions}
        value='Company Code'
        onSelect={(e, op) =>
          // handleReportChange(e, op, "report", u.id)
          handleCompCodeChange(e)
        }
        selectedOptions={companyCodeSel}
      />
    )}
    {currentSubNav !== 'Configure' && (
      <Row justifyContentStretch>
        <BlockCol size={6}>
          <SelectInput
            label='Year'
            options={
              dataIngestionYears
                ? [
                    { id: 'Select year', name: 'Select year' },
                    ...dataIngestionYears,
                  ]
                : [{ id: '0', name: 'Select data ingestion file first' }]
            }
            onChange={handleYearChange}
            error={yearError}
            ariaLabel='Select Year'
          />
        </BlockCol>
        {currentSubNav == 'Configure1' && (
          <BlockCol size={6} style={{ paddingLeft: 5 }}>
            <SelectInput
              label='Month'
              options={[
                { id: 'Select month', name: 'Select month' },
                ...monthArray,
              ]}
              onChange={handleMonthChange}
              error={monthError}
              ariaLabel='Select Month'
            />
          </BlockCol>
        )}
        <BlockCol size={6} style={{ paddingLeft: 5 }}>
          <SelectInput
            label='Quarter'
            options={[
              { id: 'Select quarter', name: 'Select quarter' },
              ...quarterArray,
            ]}
            onChange={handleQuarterChange}
            error={quarterError}
            ariaLabel='Select Quarter'
          />
        </BlockCol>
      </Row>
    )}
  </React.Fragment>
);
