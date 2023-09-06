import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import * as Styled from './styles';

import {
  SopusO1F,
  VolumeNumerator,
  TaWorkingCapital,
  Ccpn,
} from '../../../../helpers/ingestion-tables-constants';

import * as T from '../../../../components/table';
import {
  SopusHeadings,
  VolumeNumeratorHeadings,
  TaWorkingCapitalHeadings,
  CcpnHeadings,
} from '../../constants';
import { IngestionFileDataType } from '../../../../types/data-ingestion';

import { AppStateType } from '../../../../store';
import { SopusBody } from './components/SopusBody';
import { VolumeNumeratorBody } from './components/VolumeNumeratorBody';
import { TaWorkingCapitalBody } from './components/TaWorkingCapitalBody';
import { CcpnBody } from './components/CcpnBody';

export type Props = {
  label?: string;
  list?: IngestionFileDataType[] | null;
};

export const TablePreview = ({ label, list }: Props) => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const { selectedDif } = dataIngestionState;

  const renderTh = useCallback((hd) => {
    return hd.map((h: any) => (
      <Styled.TH key={h.id} borderRight='1px solid #D9D9D9'>
        {h.name.toUpperCase()}
      </Styled.TH>
    ));
  }, []);

  const renderHeading = useMemo(() => {
    switch (selectedDif) {
      case SopusO1F:
        return renderTh(SopusHeadings);

      case VolumeNumerator:
        return renderTh(VolumeNumeratorHeadings);

      case TaWorkingCapital:
        return renderTh(TaWorkingCapitalHeadings);

      case Ccpn:
        return renderTh(CcpnHeadings);

      default:
        return '';
    }
  }, [selectedDif, renderTh]);

  const renderBody = useMemo(() => {
    switch (selectedDif) {
      case SopusO1F:
        return <SopusBody list={list} />;

      case VolumeNumerator:
        return <VolumeNumeratorBody list={list} />;

      case TaWorkingCapital:
        return <TaWorkingCapitalBody list={list} />;

      case Ccpn:
        return <CcpnBody list={list} />;

      default:
        return '';
    }
  }, [selectedDif, list]);

  return (
    <Styled.StyledTablePreview>
      <Styled.Label>{label}</Styled.Label>
      <Styled.Table>
        {list && !!list.length && (
          <T.Table>
            <T.THead>
              <T.TRow
                borderBottom='1px solid #D9D9D9'
                borderTop='1px solid #D9D9D9'
                borderLeft='1px solid #D9D9D9'
              >
                {renderHeading}
              </T.TRow>
            </T.THead>
            <T.TBody>{renderBody}</T.TBody>
          </T.Table>
        )}
      </Styled.Table>
    </Styled.StyledTablePreview>
  );
};
