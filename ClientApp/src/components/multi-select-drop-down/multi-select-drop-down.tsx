import React, { useCallback, useState } from 'react';

import * as Styled from './styles';

type optionType = {
  key: string;
  value: string;
  pageName?: string;
  id: number;
};

type Props = {
  value?: string;
  options?: optionType[];
  onSelect: (e: React.ChangeEvent<HTMLInputElement>, m: optionType) => void;
  error?: string | boolean;
  selectedOptions?: number[];
};

const PLACEHOLDER = 'Select options';
const MULTIPLE_SELECTED = 'Multiple Selected';
const ALL_PAGES = 'All Pages';

export const MultiSelectDropDown = ({
  value,
  options,
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

  return (
    <Styled.StyledInput tabIndex={0} onBlur={handleBlur}>
      <Styled.DropdownLabel>{value}</Styled.DropdownLabel>
      <Styled.SelectArea>
        <Styled.SelectMulti
          onClick={handleClick}
          error={error}
        ></Styled.SelectMulti>
        <Styled.SelectedOption onClick={handleClick}>
          {selectedOptions && selectedOptions.length === 1
            ? options?.filter((op) => op.id === selectedOptions[0])[0].pageName
            : selectedOptions &&
              selectedOptions.length > 1 &&
              selectedOptions.length !== options?.length
            ? MULTIPLE_SELECTED
            : selectedOptions &&
              selectedOptions.length > 1 &&
              selectedOptions.length === options?.length
            ? ALL_PAGES
            : PLACEHOLDER}
        </Styled.SelectedOption>
      </Styled.SelectArea>
      {show && (
        <Styled.Options>
          {options?.map((m, i) => (
            <Styled.Option htmlFor={m.pageName} key={m.pageName}>
              <Styled.Checkbox
                checked={
                  selectedOptions &&
                  selectedOptions?.filter((s) => s === Number(m.id)).length > 0
                    ? true
                    : false
                }
                onChange={(e) => onSelect(e, m)}
                type='checkbox'
                id={m.pageName}
                value={m.id.toString()}
              />{' '}
              <Styled.Label>{m.pageName}</Styled.Label>
            </Styled.Option>
          ))}
        </Styled.Options>
      )}
    </Styled.StyledInput>
  );
};
