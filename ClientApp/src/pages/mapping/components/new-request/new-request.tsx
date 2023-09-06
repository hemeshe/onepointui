import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import * as Styled from "./styles";

import { setCurrentNav } from "../../../../store/app/actions";

import { Container } from "../../../../components/container";
import { Header } from "../../../../components/header";
import { HeaderContent } from "../../../../components/header-content";
import { CardHeader, CardTitle } from "../../../../components/card";
import { SelectInput } from "../../../../components/select-input";

import { Row, BlockCol } from "../../../../components/grid";

export const NewRequest = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentNav("/mapping", "New Request"));
  }, [dispatch]);

  const handleRadioChange = useCallback(() => {}, []);

  return (
    <Container fluid>
      <Header fixed>
        <Container fluid>
          {" "}
          <HeaderContent />
        </Container>
      </Header>
      <Styled.Main>
        <CardHeader style={{ borderBottom: "1px solid #D9D9D9" }}>
          <Styled.Top>
            <Styled.TopLeft>
              <CardTitle>Mapping &gt; New Request</CardTitle>
            </Styled.TopLeft>
            <Styled.TopRight>
              <Styled.Button>Submit</Styled.Button>
            </Styled.TopRight>
          </Styled.Top>
        </CardHeader>

        <Styled.Content style={{ background: "white", padding: "15px 20px" }}>
          <Styled.StyledRow>
            <Styled.StyledCol size={12}>
              <Styled.SmallTitle>New Request details: </Styled.SmallTitle>
            </Styled.StyledCol>
            <Styled.StyledCol size={12}>
              <Styled.List listStyle="none">
                <Styled.ListItem>
                  T&S MI Station Portal users can raise a New Request to add a
                  new Class Of Business, a new Mapping Table into the Data
                  platform, a new column item to an existing mapping table, or
                  renaming of coloumn titles.
                </Styled.ListItem>
                <Styled.ListItem>
                  Once a new request is raised, a notification will be sent to
                  the Portal Technical Team and Product Owner, who will verify
                  the request and update the user about the request status.
                </Styled.ListItem>
              </Styled.List>
            </Styled.StyledCol>
          </Styled.StyledRow>

          <Styled.StyledRow>
            <Styled.FormField size={6}>
              <Row>
                <BlockCol size={12}>
                  <Styled.FormFieldLabel>
                    {" "}
                    1. Is this request to create a new Class Of Business ?
                  </Styled.FormFieldLabel>
                </BlockCol>
              </Row>

              <Row>
                <BlockCol size={6} justifyContentLeft>
                  <Styled.RadioInputArea>
                    <Styled.RadioButton
                      type="radio"
                      name="cob"
                      value=""
                      onChange={handleRadioChange}
                    />
                    <Styled.RadioButtonLabel>Yes</Styled.RadioButtonLabel>
                  </Styled.RadioInputArea>
                </BlockCol>

                <BlockCol size={6} justifyContentLeft>
                  <Styled.RadioInputArea>
                    <Styled.RadioButton
                      type="radio"
                      name="cob"
                      value=""
                      onChange={handleRadioChange}
                    />
                    <Styled.RadioButtonLabel>No</Styled.RadioButtonLabel>
                  </Styled.RadioInputArea>
                </BlockCol>
              </Row>

              <Row>
                <BlockCol size={12}>
                  <Styled.COBInputArea>
                    <Styled.TextInputLabel>If Yes,</Styled.TextInputLabel>
                    <Styled.TextInput placeholder="Indicate new Class Of Business" />
                  </Styled.COBInputArea>
                </BlockCol>
              </Row>
            </Styled.FormField>

            <Styled.FormField size={6}>
              <Row>
                <BlockCol size={12}>
                  <Styled.FormFieldLabel>
                    {" "}
                    3. Do you want to add any new column item to an existing
                    Mapping Table?
                  </Styled.FormFieldLabel>
                </BlockCol>
              </Row>

              <Row>
                <BlockCol size={6} justifyContentLeft>
                  <Styled.RadioInputArea>
                    <Styled.RadioButton
                      type="radio"
                      name="mapping-column"
                      value=""
                      onChange={handleRadioChange}
                    />
                    <Styled.RadioButtonLabel>Yes</Styled.RadioButtonLabel>
                  </Styled.RadioInputArea>
                </BlockCol>

                <BlockCol size={6} justifyContentLeft>
                  <Styled.RadioInputArea>
                    <Styled.RadioButton
                      type="radio"
                      name="mapping-column"
                      value=""
                      onChange={handleRadioChange}
                    />
                    <Styled.RadioButtonLabel>No</Styled.RadioButtonLabel>
                  </Styled.RadioInputArea>
                </BlockCol>
              </Row>

              <Row>
                <BlockCol size={12}>
                  <Styled.SelectContainer>
                    <SelectInput
                      options={[
                        "Select a Mapping Table from lis",
                        "Shipping",
                        "Operations",
                        "Oil",
                        "Crude",
                      ]}
                      onChange={() => console.log("")}
                    />
                  </Styled.SelectContainer>
                </BlockCol>
              </Row>

              <Row>
                <BlockCol size={12}>
                  <Styled.COBInputArea>
                    <Styled.TextInputLabel>If Yes,</Styled.TextInputLabel>
                    <Styled.TextInput placeholder="Enter details of new column item " />
                  </Styled.COBInputArea>
                </BlockCol>
              </Row>
            </Styled.FormField>
          </Styled.StyledRow>
        </Styled.Content>
      </Styled.Main>
    </Container>
  );
};
