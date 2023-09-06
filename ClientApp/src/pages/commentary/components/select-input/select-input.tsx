import React from 'react';

import * as Styled from './styles';
import { Select, Option } from '../../../../components/select-input';

export type OptionType = {
  id: string | number;
  name: string;
};

type Props = {
  label?: string;
  options?: OptionType[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string | boolean;
  value?: string | number;
  ariaLabel?: string;
};

export const SelectInput = ({
  label,
  options,
  onChange,
  error,
  value,
  ariaLabel,
}: Props) => (
  <Styled.StyledInput>
    <Styled.Label>{label}</Styled.Label>
    <Select
      onChange={onChange}
      aria-label={ariaLabel}
      error={error}
      {...(value && { value: value })}
    >
      {options &&
        options.map((m) => (
          <Option value={m.id.toString()} key={m.id}>
            {m.name}
          </Option>
        ))}
    </Select>
  </Styled.StyledInput>
);
