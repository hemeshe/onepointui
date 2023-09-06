import React from "react";
import { useSelector } from "react-redux";

import { AppStateType } from "../../../../store";

import * as T from "../../../../components/table";
import { Icon } from "../../../../components/icon";

import * as Styled from "./styles";

interface headingsType {
  id: string;
  name: string;
  label: string;
  sorted?: boolean;
}

type Props = {
  headings: headingsType[];
  handleSortClick: (h: headingsType) => void;
};

export const Headings: React.FC<Props> = ({ headings, handleSortClick }) => {
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const { sortByField } = dataIngestionState;
  return (
    <React.Fragment>
      {headings?.map((h) => (
        <T.TH key={h.id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {h.label.toUpperCase()}
            {h.label.toUpperCase() !== "ID" &&
              h.name !== "access" &&
              h.name !== "status" &&
              h.name !== "createdBy" &&
              h.name !== "modifiedBy" &&
              (h.sorted && h.name === sortByField ? (
                <Styled.SortButton onClick={() => handleSortClick(h)}>
                  <Icon type="caretDownIcon" width="12" height="8" />
                </Styled.SortButton>
              ) : (
                <Styled.SortButton onClick={() => handleSortClick(h)}>
                  <Icon type="caretIcon" width="12" height="8" />
                </Styled.SortButton>
              ))}
          </div>
        </T.TH>
      ))}
    </React.Fragment>
  );
};
