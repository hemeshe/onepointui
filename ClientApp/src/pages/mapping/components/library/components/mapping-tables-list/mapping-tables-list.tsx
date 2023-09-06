import React from "react";

import * as Styled from "./styles";

import { MTL } from "./constants";

export const MappingTablesList = () => (
  <Styled.Container>
    <Styled.Section>
      <Styled.SmallTitle>Mapping Tables List</Styled.SmallTitle>
      <Styled.List listStyle="none">
        {MTL &&
          MTL.map((ins, i) => (
            <Styled.ListItem key={ins.id + i}>{ins.name}</Styled.ListItem>
          ))}
      </Styled.List>
    </Styled.Section>
  </Styled.Container>
);
