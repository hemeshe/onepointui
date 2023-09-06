import React from 'react';

import * as Styled from './styles';

type Props = {
  label?: string;
  options?: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string | boolean;
  ariaLabel?: string;
};

export const SelectInput = ({
  label,
  options,
  onChange,
  error,
  ariaLabel,
}: Props) => (
  <Styled.StyledInput>
    <Styled.Label>{label}</Styled.Label>
    <Styled.Select onChange={onChange} aria-label={ariaLabel} error={error}>
      {options &&
        options.map((m) => <Styled.Option key={m}>{m}</Styled.Option>)}
    </Styled.Select>
  </Styled.StyledInput>
);
