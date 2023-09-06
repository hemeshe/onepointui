import React from "react";
import * as T from "../../../../components/table";
import { Icon } from "../../../../components/icon";
import * as Styled from "./styles";

import { MappingFileDataType } from "../../../../types/mapping";

interface headings {
  id: string;
  name: string;
}

type Props = {
  headings?: headings[];
  Data?: MappingFileDataType[];
};

export const DataInputTable = ({ headings, Data }: Props) => {
  return (
    <T.Table>
      {headings && (
        <T.THead>
          <T.TRow borderBottom="1px solid #D9D9D9">
            {headings.map((h) => (
              <T.TH key={h.id}>
                {h.name.toUpperCase()}
                <Styled.SortButton>
                  <Icon type="caretIcon" width="12" height="8" />
                </Styled.SortButton>
              </T.TH>
            ))}
          </T.TRow>
        </T.THead>
      )}
      <T.TBody>
        {Data &&
          Data.map((d, i) => (
            <T.TRow key={d.id + i} borderBottom="1px solid #D9D9D9">
              <T.TD textAlign="center">
                <Styled.Input />
              </T.TD>
              <T.TD textAlign="center">
                <Styled.Input />
              </T.TD>
              <T.TD textAlign="center">
                <Styled.Input />
              </T.TD>
              <T.TD textAlign="center">
                <Styled.Input />
              </T.TD>
              <T.TD textAlign="center">
                <Styled.Input />
              </T.TD>
              <T.TD textAlign="center">
                <Styled.Input />
              </T.TD>
            </T.TRow>
          ))}
      </T.TBody>
    </T.Table>
  );
};
