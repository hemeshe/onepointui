import React, { useCallback, useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as T from "../../../../../components/table";
import * as Styled from "./styles";
import * as CS from "../common-styles";

import { UserHeadings, isActiveOptions } from "./../../constants";

import { User } from "../../../../../types/admin";
import { AppStateType } from "../../../../../store";
import {
  makeRowEditable,
  handleUserDataChange,
  sortByFieldName,
  setLandingPageOptionsForEdit,
  setSubLandingPageOptionsForEdit,
  // updateUserData,
} from "../../../../../store/admin/actions";

import { DateFormat } from "../../../../../components/date-format";
import { Select } from "../../../../../components/multi-select-drop-down";

import { useGetPageOptions } from "../../hooks/useGetPageOptions";

import { timeFormat } from "../../../../../helpers/time-format";
import { Headings } from "../../../components/headings";

interface headings {
  id: string;
  name: string;
  label: string;
  sorted?: boolean;
}

type Props = {
  headings?: headings[];
  Data?: User[];
};

export const UsersTable = memo(({ Data }: Props) => {
  const adminState = useSelector((state: AppStateType) => state.admin);
  const AppState = useSelector((state: AppStateType) => state.app);
  const [headings, setHeadings] = useState<headings[]>(UserHeadings);

  let history = useHistory();

  const dispatch = useDispatch();
  const {
    getHomePages,
    getLandingPages,
    getSubLandingPages,
  } = useGetPageOptions();
  const { userData, homePageOptions } = adminState;
  const { currentSubNavChild } = AppState;

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

  const handleRowSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, m: User) => {
      m.IsEditable = e.target.checked ? true : false;
      if (userData) {
        let newUser = userData.map((u) => {
          if (u.userPageId === m.userPageId) {
            u.IsEditable = m.IsEditable;
            return u;
          }
          return u;
        });
        dispatch(makeRowEditable(newUser));
        if (m.homePageId && m.userPageId && e.target.checked) {
          getLandingPages(m.homePageId, m.userPageId, "Edit");
        }
        if (
          m.homePageId &&
          m.userPageId &&
          m.landingPageId &&
          e.target.checked
        ) {
          getSubLandingPages(m.landingPageId, m.userPageId, "Edit");
        }
      }
    },
    [dispatch, userData, getLandingPages, getSubLandingPages]
  );

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLSelectElement>,
      id: string | undefined,
      key: keyof User
    ) => {
      if (event.target.value && id) {
        const { options, selectedIndex } = event.target;
        if (key === "homePage") {
          getLandingPages(event.target.value, id, "Edit");
          dispatch(
            handleUserDataChange(id, key, options[selectedIndex].innerHTML)
          );
          dispatch(handleUserDataChange(id, "homePageId", event.target.value));

          dispatch(handleUserDataChange(id, "landingPage", ""));
          dispatch(handleUserDataChange(id, "landingPageId", ""));

          dispatch(handleUserDataChange(id, "subLandingPage", ""));
          dispatch(handleUserDataChange(id, "subLandingPageId", ""));
        } else if (key === "landingPage") {
          //getSubLandingPages(event.target.value, id, "Edit");
          dispatch(
            handleUserDataChange(id, key, options[selectedIndex].innerHTML)
          );
          dispatch(
            handleUserDataChange(id, "landingPageId", event.target.value)
          );

          dispatch(handleUserDataChange(id, "subLandingPage", ""));
          dispatch(handleUserDataChange(id, "subLandingPageId", ""));
        } else if (key === "subLandingPage") {
          dispatch(
            handleUserDataChange(id, key, options[selectedIndex].innerHTML)
          );
          dispatch(
            handleUserDataChange(id, "subLandingPageId", event.target.value)
          );
        } else {
          dispatch(handleUserDataChange(id, key, event.target.value));
        }
      } else if (!event.target.value && id) {
        if (key === "homePage") {
          dispatch(handleUserDataChange(id, key, ""));

          dispatch(handleUserDataChange(id, "landingPage", ""));
          dispatch(handleUserDataChange(id, "landingPageId", ""));
          dispatch(setLandingPageOptionsForEdit([], id));

          dispatch(handleUserDataChange(id, "subLandingPage", ""));
          dispatch(handleUserDataChange(id, "subLandingPageId", ""));
          dispatch(setSubLandingPageOptionsForEdit([], id));
        } else if (key === "landingPage") {
          dispatch(handleUserDataChange(id, key, ""));
          dispatch(handleUserDataChange(id, "landingPageId", ""));

          dispatch(handleUserDataChange(id, "subLandingPage", ""));
          dispatch(handleUserDataChange(id, "subLandingPageId", ""));
          dispatch(setSubLandingPageOptionsForEdit([], id));
        } else if (key === "subLandingPage") {
          dispatch(handleUserDataChange(id, key, ""));
          dispatch(handleUserDataChange(id, "subLandingPageId", ""));
        }
      }
    },
    [dispatch, getLandingPages]
  );

  useEffect(() => {
    getHomePages();
  }, [getHomePages]);

  return (
    <T.Table style={{ minHeight: "auto" }} id="myTable">
      <T.THead>
        <T.TRow borderBottom="1px solid #D9D9D9">
          {currentSubNavChild === "Edit" && <T.TH></T.TH>}
          <Headings headings={headings} handleSortClick={handleSortClick} />
        </T.TRow>
      </T.THead>
      <T.TBody>
        {Data?.map((u, i) => (
          <T.TRow key={u.userPageId} borderBottom="1px solid #D9D9D9">
            {currentSubNavChild === "Edit" && (
              <T.TD textAlign="center">
                <Styled.Checkbox
                  type="checkbox"
                  onChange={(e) => handleRowSelect(e, u)}
                />
              </T.TD>
            )}
            {/* <T.TD>{d.id}</T.TD> */}
            <T.TD>{u.userEmail}</T.TD>
            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) =>
                    handleInputChange(e, u.userPageId, "homePage")
                  }
                  style={{ minWidth: "150px" }}
                  //value={u.homePage}
                  value={
                    homePageOptions?.filter(
                      (hm) => hm.id.toString() === u.homePageId
                    )[0].id
                  }
                >
                  <Styled.Option value="">select</Styled.Option>
                  {homePageOptions?.map((op) => (
                    <Styled.Option key={op.id} value={op.id}>
                      {op.pageName}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                <CS.AccessDiv>{u.homePage}</CS.AccessDiv>
              )}
            </T.TD>
            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) =>
                    handleInputChange(e, u.userPageId, "landingPage")
                  }
                  style={{ minWidth: "180px" }}
                  //value={u.landingPage}
                  value={
                    u.landingPageOptions && u.landingPage
                      ? u.landingPageOptions?.filter(
                          (hm) => hm.id.toString() === u.landingPageId
                        )[0].id
                      : ""
                  }
                >
                  <Styled.Option value="">select</Styled.Option>
                  {u.landingPageOptions?.map((op) => (
                    <Styled.Option key={op.id} value={op.id}>
                      {op.pageName}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                <CS.AccessDiv>{u.landingPage}</CS.AccessDiv>
              )}
            </T.TD>
            {/* <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) =>
                    handleInputChange(e, u.userPageId, "subLandingPage")
                  }
                  style={{ minWidth: "200px" }}
                  //value={u.subLandingPage}
                  value={
                    u.subLandingPageOptions && u.subLandingPage
                      ? u.subLandingPageOptions?.filter(
                          (hm) => hm.pageName === u.subLandingPage
                        )[0].id
                      : ""
                  }
                >
                  <Styled.Option value="">select</Styled.Option>
                  {u.subLandingPageOptions?.map((op) => (
                    <Styled.Option key={op.id} value={op.id}>
                      {op.pageName}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                <CS.AccessDiv>{u.subLandingPage}</CS.AccessDiv>
              )}
            </T.TD> */}
            {/* <T.TD>
              {d.IsEditable ? (
                <MultiSelectDropDown
                  options={reportOptions}
                  onSelect={(e, op) =>
                    handleReportChange(e, op, "report", d.id)
                  }
                  //selectedOptions={d.report}
                />
              ) : (
                <CS.AccessDiv>
                  {d.report && d.report?.length === reportOptions.length ? (
                    <CS.AccessOptionText>All Pages</CS.AccessOptionText>
                  ) : (
                    d.report?.map((op, i) => (
                      <CS.AccessOptionText key={op.value.toString()}>
                        {op.label}
                      </CS.AccessOptionText>
                    ))
                  )} 
                  {d.report}
                </CS.AccessDiv>
              )}
            </T.TD> */}
            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) =>
                    handleInputChange(e, u.userPageId, "isActive")
                  }
                  value={u.isActive.toString()}
                  style={{ minWidth: "100px" }}
                >
                  {isActiveOptions.map((op, i) => (
                    <Styled.Option key={i} value={op}>
                      {op === "true" ? "Active" : "Inactive"}
                    </Styled.Option>
                  ))}
                </Select>
              ) : u.isActive ? (
                "Active"
              ) : (
                "Inactive"
              )}
            </T.TD>

            <T.TD>
              {u.createdTs && (
                <React.Fragment>
                  {history.location.pathname ===
                    "/admin/mi-station/history" && (
                    <span style={{ padding: "0 5px", display: "block" }}>
                      {timeFormat(u.createdTs)}
                    </span>
                  )}
                  <DateFormat date={u.createdTs} />
                </React.Fragment>
              )}
            </T.TD>
            <T.TD>
              {u.modifiedTs && (
                <React.Fragment>
                  {history.location.pathname ===
                    "/admin/mi-station/history" && (
                    <span style={{ padding: "0 5px", display: "block" }}>
                      {timeFormat(u.modifiedTs)}
                    </span>
                  )}
                  <DateFormat date={u.modifiedTs} />
                </React.Fragment>
              )}
            </T.TD>
            <T.TD>{u.createdBy}</T.TD>
            <T.TD>{u.modifiedBy}</T.TD>
          </T.TRow>
        ))}
      </T.TBody>
    </T.Table>
  );
});
