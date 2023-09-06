import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as T from "../table";
import { Icon } from "../../components/icon";
import * as Styled from "./styles";

import { IngestionFileDataType } from "../../types/data-ingestion";
import { AppStateType } from "../../store";
import {
  makeRowEditable,
  handleIngestionDataChange,
} from "../../store/data-ingestion/actions";

interface headings {
  id: string;
  name: string;
}

type Props = {
  headings?: headings[];
  ingestionData?: IngestionFileDataType[] | null;
};

export const DataTable = ({ headings, ingestionData }: Props) => {
  const AppState = useSelector((state: AppStateType) => state.app);

  const dispatch = useDispatch();
  const { currentSubNav } = AppState;

  const handleRowSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, m: IngestionFileDataType) => {
      m.IsEditable = e.target.checked ? true : false;
      dispatch(makeRowEditable(m));
    },
    [dispatch]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
      // console.log(event?.target.name);
      dispatch(
        handleIngestionDataChange(id, event.target.name, event.target.value)
      );
    },
    [dispatch]
  );

  return (
    <T.Table>
      <T.THead>
        <T.TRow borderBottom="1px solid #D9D9D9">
          {currentSubNav === "Edit" && <T.TH></T.TH>}
          {headings &&
            headings.map((h) => (
              <T.TH key={h.id}>
                {h.name.toUpperCase()}
                <Styled.SortButton>
                  <Icon type="caretIcon" width="12" height="8" />
                </Styled.SortButton>
              </T.TH>
            ))}
        </T.TRow>
      </T.THead>
      <T.TBody>
        {ingestionData &&
          ingestionData.map((ing, i) => (
            <T.TRow key={ing.id} borderBottom="1px solid #D9D9D9">
              {currentSubNav === "Edit" && (
                <T.TD textAlign="center">
                  <Styled.Checkbox
                    type="checkbox"
                    onChange={(e) => handleRowSelect(e, ing)}
                  />
                </T.TD>
              )}
              <T.TD>
                {ing.IsEditable ? (
                  <Styled.Input
                    onChange={(e) => handleChange(e, i)}
                    value={ing.year ?? ""}
                    name="year"
                  />
                ) : (
                  ing.year
                )}
              </T.TD>
              <T.TD>
                {/* {ing.IsEditable ? (
                  <Styled.Input
                    onChange={(e) => handleChange(e, i)}
                    value={ing.reportingLine ?? ""}
                    name="reportingLine"
                  />
                ) : (
                  ing.reportingLine
                )} */}
              </T.TD>
              <T.TD>
                {ing.IsEditable ? (
                  <Styled.Input
                    onChange={(e) => handleChange(e, i)}
                    value={ing.businessUnit ?? ""}
                    name="businessUnit"
                  />
                ) : (
                  ing.businessUnit
                )}
              </T.TD>
              <T.TD>
                {ing.IsEditable ? (
                  <Styled.Input
                    onChange={(e) => handleChange(e, i)}
                    value={ing.category ?? ""}
                    name="category"
                  />
                ) : (
                  ing.category
                )}
              </T.TD>
              <T.TD>
                {ing.IsEditable ? (
                  <Styled.Input
                    onChange={(e) => handleChange(e, i)}
                    value={ing.subCategory ?? ""}
                    name="subCategory"
                  />
                ) : (
                  ing.subCategory
                )}
              </T.TD>
              <T.TD>
                {ing.IsEditable ? (
                  <Styled.Input
                    onChange={(e) => handleChange(e, i)}
                    value={ing.deskNm ?? ""}
                    name="deskNm"
                  />
                ) : (
                  ing.deskNm
                )}
              </T.TD>
              <T.TD>
                {ing.IsEditable ? (
                  <Styled.Input
                    onChange={(e) => handleChange(e, i)}
                    value={ing.entityNm ?? ""}
                    name="entityNm"
                  />
                ) : (
                  ing.entityNm
                )}
              </T.TD>
              <T.TD>
                {ing.IsEditable ? (
                  <Styled.Input
                    onChange={(e) => handleChange(e, i)}
                    value={ing.month ?? ""}
                    name="month"
                  />
                ) : (
                  ing.month
                )}
              </T.TD>
              <T.TD
                color={
                  ing.amount && (ing.amount >= 4 || ing.amount < 1) ? "red" : ""
                }
              >
                {ing.amount && ing.amount > 0 ? ing.amount : "-"}
              </T.TD>
            </T.TRow>
          ))}
      </T.TBody>
    </T.Table>
  );
};
