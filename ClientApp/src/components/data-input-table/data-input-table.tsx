import React from "react";
import * as T from "../table";
import { Icon } from "../icon";
import * as Styled from "./styles";

import { IngestionFileDataType } from "../../types/data-ingestion";

interface headings {
  id: string;
  name: string;
}

type Props = {
  headings?: headings[];
  ingestionData?: IngestionFileDataType[];
};

export const DataInputTable = ({ headings, ingestionData }: Props) => {
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
        {ingestionData &&
          ingestionData.map((ing) => (
            <T.TRow key={ing.id} borderBottom="1px solid #D9D9D9">
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
              <T.TD textAlign="center">
                <Styled.Input />
              </T.TD>
              <T.TD textAlign="center">
                <Styled.Input />
              </T.TD>
              <T.TD
                textAlign="center"
                color={
                  ing.amount && (ing.amount >= 4 || ing.amount < 1) ? "red" : ""
                }
              >
                <Styled.Input />
              </T.TD>
            </T.TRow>
          ))}
      </T.TBody>
    </T.Table>
  );
};
