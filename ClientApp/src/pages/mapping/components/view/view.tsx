import React from 'react';

import * as Styled from '../common-styles';

import { TablePreview } from '../table-preview';
import { RecentlyMapped } from '../recently-mapped';
import { MappingSelectionForm } from '../mapping-selection-form';

import { WithMappingHelpers } from '../with-mapping-helpers';
import { ReturnProps } from '../with-mapping-helpers/types';

const View = ({
  classOfBusiness,
  dataMappingFileList,
  handleCOFhange,
  handleMTChange,
  dataMappingYears,
  handleYearChange,
  handleMonthChange,
  cofError,
  mtError,
  yearError,
  monthError,
  mappingPreviewList,
  validateView,
  selectedCOF,
  selectedMT,
  selectedYear,
  selectedMonth,
  showPreview,
  csvTemplate,
}: ReturnProps) => {
  return (
    <Styled.Container>
      <Styled.Row style={{ borderRight: '1px solid #595959' }}>
        <Styled.RowContent>
          <MappingSelectionForm
            classOfBusiness={classOfBusiness}
            dataMappingFileList={dataMappingFileList}
            handleCOFhange={handleCOFhange}
            handleMTChange={handleMTChange}
            dataMappingYears={dataMappingYears}
            handleYearChange={handleYearChange}
            handleMonthChange={handleMonthChange}
            cofError={cofError}
            mtError={mtError}
            yearError={yearError}
            monthError={monthError}
          />
          <TablePreview
            label='Preview of selected Mapping Table'
            list={mappingPreviewList}
          />
          <Styled.Bottom
            justifyContent={showPreview ? 'space-between' : 'flex-end'}
          >
            {showPreview && (
              <Styled.CSVLink
                data={csvTemplate ?? []}
                filename={`${selectedMT.name}-Template.csv`}
              >
                <Styled.Button>DOWNLOAD TEMPLATE</Styled.Button>
              </Styled.CSVLink>
            )}
            <Styled.RouteLink
              onClick={validateView}
              to={`/mapping/view-list/${selectedCOF.name}/${selectedCOF.id}/${selectedMT.name}/${selectedMT.id}`}
            >
              VIEW
            </Styled.RouteLink>
          </Styled.Bottom>
        </Styled.RowContent>
      </Styled.Row>

      <Styled.Row>
        <Styled.RowContent>
          <RecentlyMapped />
        </Styled.RowContent>
      </Styled.Row>
    </Styled.Container>
  );
};

const enhancedComponent = WithMappingHelpers(View, 'View');

export { enhancedComponent as View };
