import React from 'react';

import { WithIngestionHelpers } from '../with-ingestion-helpers';
import { ReturnProps } from '../with-ingestion-helpers/types';

import * as Styled from '../common-styles';

import { IngestionSelectionForm } from '../../components/ingestion-selection-form';
import { TablePreview } from '../../components/table-preview';
import { RefIngestionLibrary } from '../ref-ingestion-library';
import { Instructions } from '../../components/instructions';
import { NoAccess } from '../../../../hocs/with-write-access';

const Add = ({
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
  userAccess,
  companyCodeSel,
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
            companyCodeSel={companyCodeSel}
            currentSubNav='Add'
          />
          <TablePreview
            label='Preview of selected Ingestion Table'
            list={ingstionPreviewList}
          />
          <Styled.Bottom>
            <Styled.RouteLink
              onClick={validateView}
              to={`/data-ingestion/add-list/${selectedCOF.name}/${selectedCOF.id}/${selectedDIF.name}/${selectedDIF.id}/${selectedYear}/${selectedQuarter}/${selectedMonth}`}
            >
              UPDATE
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

const enhancedComponent = WithIngestionHelpers(Add, 'Add');

export { enhancedComponent as Add };
