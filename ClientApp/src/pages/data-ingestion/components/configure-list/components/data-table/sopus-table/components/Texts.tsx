import React, { FC, Fragment, memo } from 'react';

import * as Styled from './../../styles';

import * as T from '../../../../../../../../components/table';
import { DateFormat } from '../../../../../../../../components/date-format';

import {
  IngestionFileDataType,
  newIngestionType,
} from '../../../../../../../../types/data-ingestion';

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
        {ingestionData?.map((ing) => (
          <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'PNL_DESCRIPTION')}
            >
              {ing.pnlDescription}
            </Styled.TD>
            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'BUSINESS_UNIT')}
            >
              {ing.businessUnit}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'ENTITY_NM')}
            >
              {ing.entityNm}
            </Styled.TD>

            <Styled.TD backgroundColor={setTdBgColor(errorFieldName, 'REGION')}>
              {ing.region}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'DESK_NM')}
            >
              {ing.deskNm}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'PLAN_PERIOD')}
            >
              {ing.planPeriod}
            </Styled.TD>

            <Styled.TD
              backgroundColor={setTdBgColor(errorFieldName, 'SUB_DESK_NM')}
            >
              {ing.subDeskNm}
            </Styled.TD>

            <T.TD backgroundColor={setTdBgColor(errorFieldName, 'LOAD_DATE')}>
              {ing.loadDate && <DateFormat date={ing.loadDate} />}
            </T.TD>

            {newIngestion && <T.TD></T.TD>}
          </T.TRow>
        ))}
      </Fragment>
    );
  }
);
