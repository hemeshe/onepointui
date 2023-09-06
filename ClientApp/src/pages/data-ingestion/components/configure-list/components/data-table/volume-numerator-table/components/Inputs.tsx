import React, { FC, Fragment, memo } from 'react';

import * as T from '../../../../../../../../components/table';

import * as Styled from '../../styles';

import { ControlledTextArea } from '../../../../../../../../components/text-input';
import {
  IngestionFileDataType,
  newIngestionType,
} from '../../../../../../../../types/data-ingestion';

export type InputsProps = {
  handleInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
    id: string,
    key: keyof IngestionFileDataType
  ) => void;
  handleRemoveAddRow: (d: IngestionFileDataType) => void;
  newIngestion: newIngestionType[];
};

export const Inputs: FC<InputsProps> = memo(
  ({ handleInputChange, handleRemoveAddRow, newIngestion }) => {
    return (
      <Fragment>
        {newIngestion?.map((ing) => (
          <T.TRow key={ing.id} borderBottom='1px solid #D9D9D9'>
            <T.TD></T.TD>
            <T.TD>
              <ControlledTextArea
                value={ing.cob}
                onChange={(e) => handleInputChange(e, ing.id, "cob")}
                name="cob"
              />
            </T.TD>
            <T.TD>
              <ControlledTextArea
                value={ing.entityNm}
                onChange={(e) => handleInputChange(e, ing.id, "entityNm")}
                name="entityNm"
              />
            </T.TD>

            <T.TD textAlign='center'>
              <ControlledTextArea
                value={ing.deskNm}
                onChange={(e) => handleInputChange(e, ing.id, 'deskNm')}
                name='deskNm'
              />
            </T.TD>

            <T.TD textAlign='center'>
              <ControlledTextArea
                value={ing.subDeskNm}
                onChange={(e) => handleInputChange(e, ing.id, 'subDeskNm')}
                name='subDeskNm'
              />
            </T.TD>

            <T.TD textAlign='center'>
              <ControlledTextArea
                value={ing.refinery}
                onChange={(e) => handleInputChange(e, ing.id, 'refinery')}
                name='refinery'
              />
            </T.TD>

            <T.TD></T.TD>

            <T.TD textAlign='center'>
              <ControlledTextArea
                value={ing.planPeriod}
                onChange={(e) => handleInputChange(e, ing.id, 'planPeriod')}
                name='planPeriod'
              />
            </T.TD>
            <T.TD></T.TD>
            <T.TD textAlign='center'>
              <Styled.RemoveAddInput onClick={() => handleRemoveAddRow(ing)}>
                X
              </Styled.RemoveAddInput>
            </T.TD>
          </T.TRow>
        ))}
      </Fragment>
    );
  }
);
