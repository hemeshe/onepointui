import React, { FC, Fragment, memo } from 'react';

import * as T from '../../../../../../../../components/table';
import { DateFormat } from '../../../../../../../../components/date-format';

import {
  IngestionFileDataType,
  newIngestionType,
} from '../../../../../../../../types/data-ingestion';

import * as Styled from '../../styles';

import { setTdBgColor } from '../../../../../../helpers/setTdBgColor';

export type TextsProps = {
  ingestionData: IngestionFileDataType[] | null | undefined;
  errorFieldName: string | undefined;
  newIngestion: newIngestionType[];
};

export const Texts: FC<TextsProps> = memo(
  ({ ingestionData, errorFieldName, newIngestion }) => {
    return (
      <Fragment>
        {ingestionData?.map((ing, i) => (
          <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'BUSINESS_UNIT')}
            >
              {ing.businessUnit}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'COB')}
            >
              {ing.cob}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'ENTITY_NM')}
            >
              {ing.entityNm}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'DESK_NM')}
            >
              {ing.deskNm}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'SUB_DESK_NM')}
            >
              {ing.subDeskNm}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'REFINERY')}
            >
              {ing.refinery}
            </Styled.TD>
            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'ACTUAL_PLAN_FLG_IGVOL')}
            >
              {ing.actualPlanFlgIgvol}
            </Styled.TD>
            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'PLAN_PERIOD')}
            >
              {ing.planPeriod}
            </Styled.TD>
            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'LOAD_DATE')}
            >
              {ing.loadDate && <DateFormat date={ing.loadDate} />}
            </Styled.TD>

            {newIngestion && <T.TD></T.TD>}
          </T.TRow>
        ))}
      </Fragment>
    );
  }
);
