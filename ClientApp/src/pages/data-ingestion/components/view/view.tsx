import React from 'react';
import { CSVLink } from 'react-csv';

import * as Styled from '../common-styles';

import { WithIngestionHelpers } from '../with-ingestion-helpers';
import { ReturnProps } from '../with-ingestion-helpers/types';

import { IngestionSelectionForm } from '../../components/ingestion-selection-form';
import { TablePreview } from '../../components/table-preview';
import { RefIngestionLibrary } from '../../components/ref-ingestion-library';

const View = ({
  classOfBusiness,
  dataIngestionFileList,
  handleCOFhange,
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
  ingstionPreviewList,
  validateView,
  selectedCOF,
  selectedDIF,
  selectedYear,
  selectedMonth,
  selectedQuarter,
  showPreview,
  csvTemplate,
  companyCodeSel,
}: ReturnProps) => {
  return (
    <Styled.Container>
      <Styled.Row style={{ borderRight: '1px solid #595959' }}>
        <Styled.RowContent>
          <IngestionSelectionForm
            classOfBusiness={classOfBusiness}
            dataIngestionFileList={dataIngestionFileList}
            handleCOFhange={handleCOFhange}
            handleDIFChange={handleDIFChange}
            dataIngestionYears={dataIngestionYears}
            handleYearChange={handleYearChange}
            handleMonthChange={handleMonthChange}
            handleQuarterChange={handleQuarterChange}
            handleCompCodeChange={handleCompCodeChange}
            cofError={cofError}
            difError={difError}
            yearError={yearError}
            monthError={monthError}
            quarterError={quarterError}
            companyCodeSel={companyCodeSel}
          />
          <TablePreview
            label='Preview of selected Ingestion Table'
            list={ingstionPreviewList}
          />
          <Styled.Bottom
            justifyContent={showPreview ? 'space-between' : 'flex-end'}
          >
            {showPreview && (
              <CSVLink
                data={csvTemplate ?? []}
                filename={`${selectedDIF.name}-Template.csv`}
              >
                <Styled.Button>DOWNLOAD TEMPLATE</Styled.Button>
              </CSVLink>
            )}
            <Styled.RouteLink
              onClick={validateView}
              to={`/data-ingestion/view-list/${selectedCOF.name}/${selectedCOF.id}/${selectedDIF.name}/${selectedDIF.id}/${selectedYear}/${selectedQuarter}/${selectedMonth}`}
            >
              VIEW
            </Styled.RouteLink>
            {/* <Styled.RouteLink
              onClick={validateView}
              to={`/data-ingestion/view-list/${selectedCOF.name}/${selectedCOF.id}/${selectedDIF.name}/${selectedDIF.id}`}
            >
              VIEW
            </Styled.RouteLink> */}
          </Styled.Bottom>
        </Styled.RowContent>
      </Styled.Row>

      <Styled.Row>
        <Styled.RowContent>
          <RefIngestionLibrary viewType='view' />
        </Styled.RowContent>
      </Styled.Row>
    </Styled.Container>
  );
};

const enhancedComponent = WithIngestionHelpers(View, 'View');

export { enhancedComponent as View };
