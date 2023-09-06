import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import * as Styled from './styles';
import * as T from '../../../../components/table';
import {
  Trading_Allocation_Dollar_Per_Barrel_USD,
  Trading_Allocation_Methodology_Mapping,
  Le_Sfs_Codes,
  Report_Freeze_Map,
} from '../../../../helpers/mapping-tables-constants';

import {
  MethodMapHeadings,
  UsdBblHeadings,
  LeSfsCodesHeadings,
  ReportFreezeMapHeadings,
} from '../../constants';
import { MappingFileDataType } from '../../../../types/mapping';

import { AppStateType } from '../../../../store';

import { MethodMapBody } from './components/MethodMapBody';
import { UsdBblBody } from './components/UsdBblBody';
import { LeSfsCodesBody } from './components/LeSfsCodesBody';
import { ReportFreezeMapBody } from './components/ReportFreezeMapBody';

export type Props = {
  label?: string;
  list?: MappingFileDataType[] | null;
};

export const TablePreview = ({ label, list }: Props) => {
  const MappingState = useSelector((state: AppStateType) => state.mapping);

  const { selectedMt } = MappingState;

  const renderTh = useCallback((hd) => {
    return hd.map((h: any) => (
      <Styled.TH key={h.id} borderRight='1px solid #D9D9D9'>
        {h.name.toUpperCase()}
      </Styled.TH>
    ));
  }, []);

  const renderHeading = useMemo(() => {
    switch (selectedMt) {
      case Trading_Allocation_Methodology_Mapping:
        return renderTh(MethodMapHeadings);

      case Trading_Allocation_Dollar_Per_Barrel_USD:
        return renderTh(UsdBblHeadings);

      case Le_Sfs_Codes:
        return renderTh(LeSfsCodesHeadings);

      case Report_Freeze_Map:
        return renderTh(ReportFreezeMapHeadings);

      default:
        return '';
    }
  }, [selectedMt, renderTh]);

  const renderBody = useMemo(() => {
    switch (selectedMt) {
      case Trading_Allocation_Methodology_Mapping:
        return <MethodMapBody list={list} />;

      case Trading_Allocation_Dollar_Per_Barrel_USD:
        return <UsdBblBody list={list} />;

      case Le_Sfs_Codes:
        return <LeSfsCodesBody list={list} />;

      case Report_Freeze_Map:
        return <ReportFreezeMapBody list={list} />;

      default:
        return '';
    }
  }, [selectedMt, list]);

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
