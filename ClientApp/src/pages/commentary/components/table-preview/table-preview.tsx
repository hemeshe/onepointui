import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Styled from "./styles";

import { ListType } from "../../../../store/commentary/types";

import {
  setCommentarySelects,
  setCommentarySelectsError,
} from "../../../../store/commentary/actions";

import { AppStateType } from "../../../../store";

export type Props = {
  label?: string;
  list?: ListType[];
  showPreview: boolean;
  hasError?: boolean;
};

export const TablePreview: React.FC<Props> = ({
  label,
  list,
  showPreview,
  hasError,
}) => {
  const commentaryState = useSelector(
    (state: AppStateType) => state.commentary
  );

  const { report } = commentaryState;

  const dispatch = useDispatch();

  const handleClick = useCallback(
    (report: ListType) => {
      report &&
        dispatch(
          setCommentarySelects(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            report
          )
        );
      dispatch(setCommentarySelectsError("", "", "", "", "", "", ""));
    },
    [dispatch]
  );

  return (
    <Styled.StyledTablePreview>
      <Styled.Label>{label}</Styled.Label>
      <Styled.Table hasError={hasError}>
        {list && showPreview && (
          <Styled.List>
            {list.map((l) => (
              <Styled.ListItem
                selected={Boolean(l.id === report?.id)}
                key={l.id}
                onClick={() => handleClick(l)}
              >
                {l.name}
              </Styled.ListItem>
            ))}
          </Styled.List>
        )}
      </Styled.Table>
    </Styled.StyledTablePreview>
  );
};
