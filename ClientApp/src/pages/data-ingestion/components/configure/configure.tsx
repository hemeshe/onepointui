import React from 'react';
import { CSVLink } from 'react-csv';

import * as Styled from '../common-styles';

import { WithIngestionHelpers } from '../with-ingestion-helpers';
import { ReturnProps } from '../with-ingestion-helpers/types';

import { IngestionSelectionForm } from '../../components/ingestion-selection-form';
import { TablePreview } from '../../components/table-preview';
import { RefIngestionLibrary } from '../ref-ingestion-library';
import { Instructions } from '../instructions';
import { NoAccess } from '../../../../hocs/with-write-access';

const Configure = ({
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
  dataIngestionFileInstructions,
  csvTemplate,
  userAccess,
  validateConfigure,
}: ReturnProps) => {
  if (userAccess === 'READ') {
    return <NoAccess />;
  }
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
            currentSubNav='Configure'
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
            {/* <Styled.RouteLink
              onClick={validateConfigure}
              to={`/data-ingestion/configure-list/${selectedCOF.name}/${selectedCOF.id}/${selectedDIF.name}/${selectedDIF.id}/${selectedYear}/${selectedMonth}`}
            >
              NEXT
            </Styled.RouteLink> */}
            <Styled.RouteLink
              onClick={validateConfigure}
              to={`/data-ingestion/configure-list/${selectedCOF.name}/${selectedCOF.id}/${selectedDIF.name}/${selectedDIF.id}`}
            >
              NEXT
            </Styled.RouteLink>
          </Styled.Bottom>
        </Styled.RowContent>
      </Styled.Row>

      <Styled.Row>
        <Styled.RowContent>
          {showPreview ? (
            <Instructions INST={dataIngestionFileInstructions} />
          ) : (
            <RefIngestionLibrary viewType='view' />
          )}
        </Styled.RowContent>
      </Styled.Row>
    </Styled.Container>
  );
};

const enhancedComponent = WithIngestionHelpers(Configure, 'Configure');

export { enhancedComponent as Configure };
