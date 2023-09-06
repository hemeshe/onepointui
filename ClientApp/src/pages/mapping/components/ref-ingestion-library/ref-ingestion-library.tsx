import React from "react";

import * as Styled from "./styles";
import { Row, Col } from "../../../../components/grid";

import { RecentlyAddedType } from "./types";

const RAVIEW: RecentlyAddedType[] = [
  {
    name: "Scorecard Recon",
    date: "12/06/2020",
    user: "Jesse Escobedo",
  },
  {
    name: "R1 OPEX Scorecard",
    date: "12/06/2020",
    user: "Jesse Escobedo",
  },
  {
    name: "R1 SFS Mapping",
    date: "10/06/2020",
    user: "Praneeth Byreddy",
  },
  {
    name: "GM Mapping",
    date: "14/05/2020",
    user: "Praneeth Byreddy",
  },
  {
    name: "OPEX TB2F",
    date: "14/05/2020",
    user: "Ravi TN",
  },
];

type Props = {
  viewType: string;
};

export const RefIngestionLibrary = ({ viewType }: Props) => {
  return (
    <Styled.Container>
      <Styled.RecentlyAdded>
        <Styled.Title>Recently Mapped</Styled.Title>
        {RAVIEW.map((r) => (
          <Row key={r.name + r.date}>
            <Styled.RecentItem>
              <Col size={12} style={{ fontWeight: "bold" }}>
                {r.name}
              </Col>
              <Col size={12}>
                <Styled.RecentItemDesc>{`${r.date} by ${r.user} `}</Styled.RecentItemDesc>
              </Col>
            </Styled.RecentItem>
          </Row>
        ))}
      </Styled.RecentlyAdded>
    </Styled.Container>
  );
};
