import React, { useCallback, useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { isActiveOptions, roleOptions } from "../../../../constants";

import * as T from "../../../../../../../components/table";

import * as Styled from "./styles";

import {
  sortByFieldName,
  addNewLocalUser,
  updateLocalUserRow,
  removeNewLocalUser,
} from "../../../../../../../store/admin/actions";

import { AppStateType } from "../../../../../../../store";

import { User } from "../../../../../../../types/admin";
import { Button } from "../../../../../../../components/button";

import { UserHeadings } from "../../../../constants";

import { DateFormat } from "../../../../../../../components/date-format";
import { Headings } from "../../../../../components/headings";
import { useGetUsers } from "../../../../hooks/useGetUser";
import { BoolObj } from "../../../../../../../helpers/constants";

type headings = {
  id: string;
  name: string;
  label: string;
  sorted?: boolean;
};

type Props = {
  Data?: User[] | null;
};

export const UsersTable = memo(({ Data }: Props) => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: AppStateType) => state.admin);
  const [headings, setHeadings] = useState<headings[]>(UserHeadings);

  const { newUser } = adminState;

  const { getProfiles, profiles } = useGetUsers();

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

  const handleAddRow = useCallback(() => {
    let id = `new-u?-${Math.random()}`;
    dispatch(addNewLocalUser(id));
  }, [dispatch]);

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      id: string | number,
      key: keyof User
    ) => {
      const { value } = event.target;
      if (key === "isActive") {
        let val = BoolObj[value as never];
        dispatch(updateLocalUserRow(val, key, id));
      } else {
        dispatch(updateLocalUserRow(value, key, id));
      }
    },
    [dispatch]
  );

  const handleRemoveAddRow = useCallback(
    (d: User) => {
      if (d && d.id) {
        dispatch(removeNewLocalUser(d.id));
      }
    },
    [dispatch]
  );

  return (
    <T.Table style={{ minHeight: "auto" }} id="myTable">
      <T.THead>
        <T.TRow borderBottom="1px solid #D9D9D9">
          <Headings headings={headings} handleSortClick={handleSortClick} />
        </T.TRow>
      </T.THead>
      <T.TBody>
        <T.TRow>
          <T.TD colSpan={headings?.length}>
            <Button
              label="+ Add user"
              primary
              size="block"
              onClick={handleAddRow}
            />
          </T.TD>
        </T.TRow>

        {newUser?.map(
          (u) =>
            u && (
              <T.TRow key={u.id} borderBottom="1px solid #D9D9D9">
                <T.TD textAlign="center">
                  <Styled.Input
                    value={u.userEmailId ?? ""}
                    onChange={(e) => handleInputChange(e, u.id, "userEmailId")}
                    name="userEmailId"
                    placeholder="user email"
                  />
                </T.TD>
                <T.TD>
                  <Styled.Select
                    onChange={(e) =>
                      handleInputChange(e, u.id, "pbiRlsTeamAccessId")
                    }
                    value={u.pbiRlsTeamAccessId}
                  >
                    <Styled.Option value="">select item</Styled.Option>
                    {profiles.map((op) => (
                      <Styled.Option
                        key={op.pbiRlsTeamAccessId}
                        value={op.pbiRlsTeamAccessId}
                      >
                        {op.teamName}
                      </Styled.Option>
                    ))}
                  </Styled.Select>
                </T.TD>
                <T.TD textAlign="center">
                  <Styled.Select
                    onChange={(e) => handleInputChange(e, u.id, "access")}
                  >
                    <Styled.Option value="">select item</Styled.Option>
                    {roleOptions.map((op) => (
                      <Styled.Option key={op} value={op.toLocaleUpperCase()}>
                        {op}
                      </Styled.Option>
                    ))}
                  </Styled.Select>
                </T.TD>
                <T.TD textAlign="center">
                  <Styled.Select
                    onChange={(e) => handleInputChange(e, u.id, "isActive")}
                    value={u.isActive ? "true" : "false"}
                  >
                    <Styled.Option value="">select item</Styled.Option>
                    {isActiveOptions.map((op, i) => (
                      <Styled.Option key={i} value={op}>
                        {op === "true" ? "Active" : "Inactive"}
                      </Styled.Option>
                    ))}
                  </Styled.Select>
                </T.TD>
                <T.TD textAlign="center">
                  <Styled.RemoveAddInput onClick={() => handleRemoveAddRow(u)}>
                    X
                  </Styled.RemoveAddInput>
                </T.TD>
                <T.TD textAlign="center"></T.TD>
                <T.TD textAlign="center"></T.TD>
                <T.TD></T.TD>
              </T.TRow>
            )
        )}

        {Data?.map((u, i) => (
          <T.TRow key={i} borderBottom="1px solid #D9D9D9">
            {/* <T.TD>{u.id}</T.TD> */}
            <T.TD>{u.userEmailId}</T.TD>
            <T.TD>
              <span style={{ textTransform: "capitalize" }}>
                {u.pbiRlsTeamAccessName?.toLowerCase()}
              </span>
            </T.TD>
            <T.TD>
              <span style={{ textTransform: "capitalize" }}>
                {u.access?.toLowerCase()}
              </span>
            </T.TD>
            <T.TD>{u.isActive ? "Active" : "Inactive"}</T.TD>
            <T.TD>{u.createdTs && <DateFormat date={u.createdTs} />}</T.TD>
            <T.TD>{u.modifiedTs && <DateFormat date={u.modifiedTs} />}</T.TD>
            <T.TD>{u.modifiedBy}</T.TD>
            <T.TD>{u.createdBy}</T.TD>
            {newUser && <T.TD></T.TD>}
          </T.TRow>
        ))}
      </T.TBody>
    </T.Table>
  );
});
