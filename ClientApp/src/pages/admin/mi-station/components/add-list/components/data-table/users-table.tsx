import React, { useCallback, useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import NumberFormat from "react-number-format";

import { isActiveOptions } from "../../../../constants";

import * as T from "../../../../../../../components/table";

import * as Styled from "./styles";
import * as CS from "../../../common-styles";

import {
  sortByFieldName,
  addNewLocalUser,
  updateLocalUserRow,
  removeNewLocalUser,
  setSubLandingPageOptions,
  setLandingPageOptions,
} from "../../../../../../../store/admin/actions";

import { AppStateType } from "../../../../../../../store";

import { User } from "../../../../../../../types/admin";
import { Button } from "../../../../../../../components/button";

import { UserHeadings } from "../../../../constants";

import { DateFormat } from "../../../../../../../components/date-format";
import {
  MultiSelectDropDown,
  Select,
} from "../../../../../../../components/multi-select-drop-down";

import { useGetPageOptions } from "../../../../hooks/useGetPageOptions";
import { Headings } from "../../../../../components/headings";

interface headings {
  id: string;
  name: string;
  label: string;
  sorted?: boolean;
}

type Props = {
  Data?: User[] | null;
};

export const UsersTable = memo(({ Data }: Props) => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: AppStateType) => state.admin);
  const [headings, setHeadings] = useState<headings[]>(UserHeadings);

  const { newUser, homePageOptions } = adminState;

  const {
    getHomePages,
    getLandingPages,
    getSubLandingPages,
  } = useGetPageOptions();

  useEffect(() => {
    getHomePages();
  }, [getHomePages]);

  const handleSortClick = useCallback(
    (h: headings) => {
      let hds = headings;
      if (h && h.sorted) {
        hds = headings?.map((h) => {
          h.sorted = false;
          return h;
        });
        dispatch(sortByFieldName(h.name, false));
      } else {
        hds = headings?.map((h) => {
          h.sorted = true;
          return h;
        });
        dispatch(sortByFieldName(h.name, true));
      }
      setHeadings(hds);
    },
    [dispatch, headings]
  );

  const handleAddRow = useCallback(() => {
    let id = `new-u?-${Math.random()}`;
    dispatch(addNewLocalUser(id));
  }, [dispatch]);

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
      id: string,
      key: keyof User
    ) => {
      if (event.target.value) {
        const { value } = event.target;
        //let v = key === 'isActive' ? value : options[selectedIndex].innerHTML;
        dispatch(updateLocalUserRow(value, key, id));
        if (key === "homePage") {
          dispatch(updateLocalUserRow([], "landingPage1", id));
          getLandingPages(event.target.value, id, "Add");
        } else if (key === "landingPage") {
          //getSubLandingPages(event.target.value, id, "Add");
        }
      }
      /// st
      else if (!event.target.value && id) {
        if (key === "homePage") {
          dispatch(updateLocalUserRow("", key, id));
          dispatch(updateLocalUserRow("", "homePageId", id));
          dispatch(updateLocalUserRow("", "landingPage", id));
          dispatch(updateLocalUserRow([], "landingPage1", id));
          dispatch(updateLocalUserRow("", "landingPageId", id));
          dispatch(setLandingPageOptions([], id));
          dispatch(setSubLandingPageOptions([], id));

          dispatch(updateLocalUserRow("", "subLandingPage", id));
          dispatch(updateLocalUserRow("", "subLandingPageId", id));
        } else if (key === "landingPage") {
          dispatch(updateLocalUserRow("", key, id));
          dispatch(updateLocalUserRow("", "landingPageId", id));

          dispatch(updateLocalUserRow("", "subLandingPage", id));
          dispatch(updateLocalUserRow("", "subLandingPageId", id));
          dispatch(setSubLandingPageOptions([], id));
        } else if (key === "subLandingPage") {
          dispatch(updateLocalUserRow("", key, id));
          dispatch(updateLocalUserRow("", "subLandingPageId", id));
        }
      }
      ///end
    },
    [dispatch, getLandingPages]
  );

  const handleRemoveAddRow = useCallback(
    (d: User) => {
      if (d && d.id) {
        dispatch(removeNewLocalUser(d.id));
      }
    },
    [dispatch]
  );

  const handleTextInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      id: string,
      key: keyof User
    ) => {
      if (event.target.value) {
        dispatch(updateLocalUserRow(event.target.value, key, id));
        if (key === "homePage") {
          getLandingPages(event.target.value, id, "Add");
        } else if (key === "landingPage") {
          getSubLandingPages(event.target.value, id, "Add");
        }
      }
    },
    [dispatch, getLandingPages, getSubLandingPages]
  );

  const handleSubLandingInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      id: string,
      key: keyof User,
      newUser: User[]
    ) => {
      console.log(newUser);
      const { value, checked } = event.target;
      const lpId = Number(value);
      const usr = newUser.filter((nu) => nu.id === id)[0];
      console.log(usr);
      console.log(value);
      const { landingPage1 } = usr;
      let newlandingPage1: number[];
      if (checked && landingPage1) {
        newlandingPage1 = [...landingPage1, lpId];
        dispatch(updateLocalUserRow(newlandingPage1, key, id));
      } else if (!checked && landingPage1) {
        newlandingPage1 = landingPage1.filter((lp) => lp !== lpId);
        dispatch(updateLocalUserRow(newlandingPage1, key, id));
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
                {/* <T.TD textAlign="center"></T.TD> */}
                <T.TD textAlign="center">
                  <Styled.Input
                    value={u.userEmail}
                    onChange={(e) =>
                      handleTextInputChange(e, u.id, "userEmail")
                    }
                    name="userEmail"
                    placeholder="Enter user email"
                  />
                </T.TD>
                <T.TD textAlign="center">
                  <Select
                    onChange={(e) => handleInputChange(e, u.id, "homePage")}
                    style={{ minWidth: "150px" }}
                    //value={u.homePage}
                  >
                    <Styled.Option value="">select</Styled.Option>
                    {homePageOptions?.map((op) => (
                      <Styled.Option key={op.id} value={op.id}>
                        {op.pageName}
                      </Styled.Option>
                    ))}
                  </Select>
                </T.TD>
                <T.TD textAlign="center">
                  {/* <Select
                    onChange={(e) => handleInputChange(e, u.id, "landingPage")}
                    style={{ minWidth: "180px" }}
                    //value={u.landingPage}
                  >
                    <Styled.Option value="">select</Styled.Option>
                    {u.landingPageOptions?.map((op) => (
                      <Styled.Option key={op.id} value={op.id}>
                        {op.pageName}
                      </Styled.Option>
                    ))}
                  </Select> */}
                  <MultiSelectDropDown
                    options={u.landingPageOptions}
                    value={u.landingPage}
                    onSelect={(e, op) =>
                      // handleReportChange(e, op, "report", u.id)
                      handleSubLandingInputChange(
                        e,
                        u.id,
                        "landingPage1",
                        newUser
                      )
                    }
                    selectedOptions={u.landingPage1}
                  />
                </T.TD>
                {/* <T.TD textAlign="center">
                  <Select
                    onChange={(e) =>
                      handleInputChange(e, u.id, "subLandingPage")
                    }
                    style={{ minWidth: "200px" }}
                    //value={u.subLandingPage}
                  >
                    <Styled.Option value="">select</Styled.Option>
                    {u.subLandingPageOptions?.map((op) => (
                      <Styled.Option key={op.id} value={op.id}>
                        {op.pageName}
                      </Styled.Option>
                    ))}
                  </Select>
                </T.TD> */}
                {/* <T.TD textAlign="center">
                  <MultiSelectDropDown
                    options={reportOptions}
                    onSelect={(e, op) =>
                      handleReportChange(e, op, "report", u.id)
                    }
                    //selectedOptions={u.report}
                  />
                </T.TD> */}
                <T.TD textAlign="center">
                  <Select
                    onChange={(e) => handleInputChange(e, u.id, "isActive")}
                    value={u.isActive ? "true" : "false"}
                    style={{ minWidth: "100px" }}
                  >
                    {isActiveOptions.map((op, i) => (
                      <Styled.Option key={i} value={op}>
                        {op === "true" ? "Active" : "Inactive"}
                      </Styled.Option>
                    ))}
                  </Select>
                </T.TD>
                {/* <T.TD textAlign="center"></T.TD>
                <T.TD textAlign="center"></T.TD>
                <T.TD textAlign="center"></T.TD> */}
                <T.TD>
                  <Styled.RemoveAddInput onClick={() => handleRemoveAddRow(u)}>
                    X
                  </Styled.RemoveAddInput>
                </T.TD>
              </T.TRow>
            )
        )}

        {Data?.map((u, i) => (
          <T.TRow key={u.userPageId} borderBottom="1px solid #D9D9D9">
            {/* <T.TD>{u.id}</T.TD> */}
            <T.TD>{u.userEmail}</T.TD>
            <T.TD>
              <CS.AccessDiv>
                {/* {u.homePage && u.homePage?.length === homePageOptions.length ? (
                  <CS.AccessOptionText>All Pages</CS.AccessOptionText>
                ) : (
                  u.homePage?.map((op, i) => (
                    <CS.AccessOptionText key={op.value.toString()}>
                      {op.label}
                    </CS.AccessOptionText>
                  ))
                )} */}
                {u.homePage}
              </CS.AccessDiv>
            </T.TD>
            <T.TD>
              <CS.AccessDiv>
                {/* {u.landingPage &&
                u.landingPage?.length === landingPageOptions.length ? (
                  <CS.AccessOptionText>All Pages</CS.AccessOptionText>
                ) : (
                  u.landingPage?.map((op, i) => (
                    <CS.AccessOptionText key={op.value.toString()}>
                      {op.label}
                    </CS.AccessOptionText>
                  ))
                )} */}
                {u.landingPage}
              </CS.AccessDiv>
            </T.TD>
            {/* <T.TD>
              <CS.AccessDiv>
                {/* {u.subLandingPage &&
                u.subLandingPage?.length === subLandingPageOptions.length ? (
                  <CS.AccessOptionText>All Pages</CS.AccessOptionText>
                ) : (
                  u.subLandingPage?.map((op, i) => (
                    <CS.AccessOptionText key={op.value.toString()}>
                      {op.label}
                    </CS.AccessOptionText>
                  ))
                )} 
                {u.subLandingPage}
              </CS.AccessDiv>
            </T.TD> */}
            {/* <T.TD>
              <CS.AccessDiv>
                {u.report && u.report?.length === reportOptions.length ? (
                  <CS.AccessOptionText>All Pages</CS.AccessOptionText>
                ) : (
                  u.report?.map((op, i) => (
                    <CS.AccessOptionText key={op.value.toString()}>
                      {op.label}
                    </CS.AccessOptionText>
                  ))
                )}
                {u.report}
              </CS.AccessDiv>
            </T.TD> */}
            <T.TD>{u.isActive ? "Active" : "Inactive"}</T.TD>
            <T.TD>{u.createdTs && <DateFormat date={u.createdTs} />}</T.TD>
            <T.TD>{u.modifiedTs && <DateFormat date={u.modifiedTs} />}</T.TD>
            <T.TD>{u.createdBy}</T.TD>
            <T.TD>{u.modifiedBy}</T.TD>

            {newUser && <T.TD></T.TD>}
          </T.TRow>
        ))}
      </T.TBody>
    </T.Table>
  );
});
