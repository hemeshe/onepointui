import React, { useEffect } from "react";

import { NoAccessForUnAuthorized } from "../../components/no-access";
import { Header } from "../../components/header";
import { HeaderContent } from "../../components/header-content";
import { Container } from "../../components/container";
import { Api } from "../../helpers/api";

export const UnAuthorized = () => {
  useEffect(() => {
    console.log(Api);
    console.log(process.env.REACT_APP_BUILD_TYPE);
  }, []);
  return (
    <div style={{ overflow: "hidden", height: "100%", width: "100%" }}>
      <Header fixed>
        <Container fluid>
          {" "}
          <HeaderContent />
        </Container>
      </Header>
      <NoAccessForUnAuthorized />
    </div>
  );
};
