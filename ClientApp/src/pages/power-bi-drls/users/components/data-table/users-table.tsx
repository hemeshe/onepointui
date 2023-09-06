import React, { useCallback, useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as T from "../../../../../components/table";
import * as Styled from "./styles";

import { roleOptions, isActiveOptions, UserHeadings } from "../../constants";

import { User } from "../../../../../types/admin";
import { AppStateType } from "../../../../../store";
import {
  makeRowEditable,
  handleuserDataChangePortal,
  sortByFieldName,
} from "../../../../../store/admin/actions";

import { DateFormat } from "../../../../../components/date-format";

import { timeFormat } from "../../../../../helpers/time-format";

import { Headings } from "../../../components/headings";
import { useGetUsers } from "../../hooks/useGetUser";
import { BoolObj } from "../../../../../helpers/constants";

type headings = {
  id: string;
  name: string;
  label: string;
  sorted?: boolean;
};

type Props = {
  headings?: headings[];
  Data?: User[];
};

export const UsersTable = memo(({ Data }: Props) => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const AppState = useSelector((state: AppStateType) => state.app);
  const [headings, setHeadings] = useState<headings[]>(UserHeadings);

  let history = useHistory();

  const { getProfiles, profiles } = useGetUsers();

  const dispatch = useDispatch();
  const { userData } = adminState;
  const { currentSubNavChild } = AppState;

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const handleSortClick = useCallback(
    (h: headings) => {
      if (h && h.sorted) {
        let hds = headings?.map((el) => {
          el.sorted = false;
          return el;
        });
        dispatch(sortByFieldName(h.name, false));
        setHeadings(hds);
      } else {
        let hds = headings?.map((el) => {
          el.sorted = true;
          return el;
        });
        dispatch(sortByFieldName(h.name, true));
        setHeadings(hds);
      }
    },
    [dispatch, headings]
  );

  const handleRowSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, m: User) => {
      m.IsEditable = e.target.checked ? true : false;
      if (userData) {
        let newUser = userData.map((u) => {
          if (u.id === m.id) {
            u.IsEditable = m.IsEditable;
            return u;
          }
          return u;
        });
        dispatch(makeRowEditable(newUser));
      }
    },
    [dispatch, userData]
  );

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLSelectElement>,
      id: number | string,
      key: keyof User
    ) => {
      const { value } = event.target;
      if (key === "isActive") {
        let val = BoolObj[value as never];
        dispatch(handleuserDataChangePortal(id, key, val));
      } else {
        dispatch(handleuserDataChangePortal(id, key, value));
      }
    },
    [dispatch]
  );

  const getSelectValue = useCallback((v) => {
    return v ? "true" : "false";
  }, []);

  const getSelectText = useCallback((t) => {
    return t ? "Active" : "Inactive";
  }, []);

  return (
    <T.Table style={{ minHeight: "auto" }} id="myTable">
      <T.THead>
        <T.TRow borderBottom="1px solid #D9D9D9">
          {currentSubNavChild === "Edit" && <T.TH></T.TH>}
          <Headings headings={headings} handleSortClick={handleSortClick} />
        </T.TRow>
      </T.THead>
      <T.TBody>
        {Data?.map((d, i) => (
          <T.TRow key={d.id + i.toString()} borderBottom="1px solid #D9D9D9">
            {currentSubNavChild === "Edit" && (
              <T.TD textAlign="center">
                <Styled.Checkbox
                  type="checkbox"
                  onChange={(e) => handleRowSelect(e, d)}
                />
              </T.TD>
            )}
            {/* <T.TD>{d.id}</T.TD> */}
            <T.TD>{d.userEmailId}</T.TD>
            <T.TD>
              {d.IsEditable ? (
                <Styled.Select
                  onChange={(e) => handleChange(e, d.id, "pbiRlsTeamAccessId")}
                  value={d.pbiRlsTeamAccessId}
                >
                  {profiles.map((op) => (
                    <Styled.Option
                      key={op.pbiRlsTeamAccessId}
                      value={op.pbiRlsTeamAccessId}
                    >
                      {op.teamName}
                    </Styled.Option>
                  ))}
                </Styled.Select>
              ) : (
                <span style={{ textTransform: "capitalize" }}>
                  {d.pbiRlsTeamAccessName?.toLowerCase()}
                </span>
              )}
            </T.TD>
            <T.TD>
              {d.IsEditable ? (
                <Styled.Select
                  onChange={(e) => handleChange(e, d.id, "access")}
                  value={d.access}
                >
                  {roleOptions.map((op) => (
                    <Styled.Option key={op} value={op.toUpperCase()}>
                      {op}
                    </Styled.Option>
                  ))}
                </Styled.Select>
              ) : (
                <span style={{ textTransform: "capitalize" }}>
                  {d.access?.toLowerCase()}
                </span>
              )}
            </T.TD>
            <T.TD>
              {d.IsEditable ? (
                <Styled.Select
                  onChange={(e) => handleChange(e, d.id, "isActive")}
                  value={getSelectValue(d.isActive)}
                >
                  {isActiveOptions.map((op, index) => (
                    <Styled.Option key={index} value={op}>
                      {op === "true" ? "Active" : "Inactive"}
                    </Styled.Option>
                  ))}
                </Styled.Select>
              ) : (
                getSelectText(d.isActive)
              )}
            </T.TD>

            <T.TD>
              {d.createdTs && (
                <React.Fragment>
                  {history.location.pathname ===
                    "/power-bi-drls/users/history" && (
                    <span style={{ padding: "0 5px", display: "block" }}>
                      {timeFormat(d.createdTs)}
                    </span>
                  )}
                  <DateFormat date={d.createdTs} />
                </React.Fragment>
              )}
            </T.TD>
            <T.TD>
              {d.modifiedTs && (
                <React.Fragment>
                  {history.location.pathname ===
                    "/power-bi-drls/users/history" && (
                    <span style={{ padding: "0 5px", display: "block" }}>
                      {timeFormat(d.modifiedTs)}
                    </span>
                  )}
                  <DateFormat date={d.modifiedTs} />
                </React.Fragment>
              )}
            </T.TD>

            <T.TD>{d.createdBy}</T.TD>
            <T.TD>{d.modifiedBy}</T.TD>
          </T.TRow>
        ))}
      </T.TBody>
    </T.Table>
  );
});
