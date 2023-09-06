import React from "react";

import * as Styled from "./styles";

type Props = {
  label?: string;
  placeholder?: string;
  displayInline?: boolean;
};

export const TextInput = ({ label, placeholder, displayInline }: Props) => (
  <Styled.StyledInput displayInline={displayInline}>
    {label && <Styled.Label>{label}</Styled.Label>}
    <Styled.Input placeholder={placeholder} />
  </Styled.StyledInput>
);
