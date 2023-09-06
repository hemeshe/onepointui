import React, { Fragment, useCallback, useMemo, useState } from "react";
import { ProfilesPagesType } from "../../../../../types/admin";

import * as Styled from "./styles";

export type optionType = {
  pageName?: string;
  pageId?: number;
} & ProfilesPagesType;

export type parent = {
  parentName: string;
  options?: optionType[];
};

type Props = {
  label?: string;
  options?: optionType[];
  items?: parent[];
  onSelect: (e: React.ChangeEvent<HTMLInputElement>, m: optionType) => void;
  error?: string | boolean;
  selectedOptions?: optionType[];
};

const PLACEHOLDER = "Select options";
const MULTIPLE_SELECTED = "Multiple Selected";
const ALL_PAGES = "All Pages";

export const MultiSelectDropDown = ({
  label,
  options,
  items,
  onSelect,
  error,
  selectedOptions,
}: Props) => {
  const [show, setShow] = useState(false);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    setShow((s) => !s);
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const currentTarget = e.currentTarget;
    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        // You can invoke a callback or add custom logic here
        setShow(false);
      }
    }, 0);
  };

  const SELECT_LABEL = useMemo(() => {
    if (selectedOptions && selectedOptions.length === 1) {
      return options?.filter((op) => op.pageId === selectedOptions[0].pageId)[0]
        ?.pageName;
    } else if (
      selectedOptions &&
      selectedOptions.length > 1 &&
      selectedOptions.length !== options?.length
    ) {
      return MULTIPLE_SELECTED;
    } else if (
      selectedOptions &&
      selectedOptions.length > 1 &&
      selectedOptions.length === options?.length
    ) {
      return ALL_PAGES;
    } else {
      return PLACEHOLDER;
    }
  }, [selectedOptions, options]);

  return (
    <Styled.StyledInput tabIndex={0} onBlur={handleBlur}>
      <Styled.Label>{label}</Styled.Label>
      <Styled.SelectArea>
        <Styled.SelectMulti
          onClick={handleClick}
          error={error}
        ></Styled.SelectMulti>
        <Styled.SelectedOption onClick={handleClick}>
          {SELECT_LABEL}
        </Styled.SelectedOption>
      </Styled.SelectArea>
      {show && (
        <Styled.Options>
          {items?.map((item, i) => (
            <Fragment key={item.parentName + i}>
              {item.parentName && (
                <span
                  style={{
                    fontWeight: "bold",
                    padding: "2px",
                    borderBottom: "1px solid grey",
                    display: "block",
                    textAlign: "left",
                    textTransform: "capitalize",
                  }}
                >
                  {item.parentName.toLowerCase()}
                </span>
              )}
              <div>
                {item.options?.map((m) => (
                  <Styled.Option htmlFor={m.pageId?.toString()} key={m.pageId}>
                    <Styled.Checkbox
                      checked={Boolean(
                        selectedOptions?.filter((s) => s.pageId === m.pageId)
                          ?.length
                      )}
                      onChange={(e) => onSelect(e, m)}
                      type="checkbox"
                      id={m.pageId?.toString()}
                      value={m.pageId}
                    />{" "}
                    <Styled.Label>{m.pageName}</Styled.Label>
                  </Styled.Option>
                ))}
              </div>
            </Fragment>
          ))}
        </Styled.Options>
      )}
    </Styled.StyledInput>
  );
};
