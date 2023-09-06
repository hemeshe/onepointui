import styled from "styled-components";

export const Help = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
  position: absolute;
  top: 0;
`;

export const HelpCard = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: -470px;
  width: 470px;
  height: auto;
  box-sizing: content-box;
  background: #ffffff;
  padding: 10px 6px 0px 6px;
  border: 1px solid #ededed;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.35);
`;

export const Tip = styled.p`
  width: 100%;
  background: #ffffff;
`;

export const HelpTitle = styled.span`
  font-family: Futura Medium;
  font-style: normal;
  font-weight: bold !important;
  font-size: 1.2rem;
  /* identical to box height */
  text-align: center;
  display: block;
  /* dark-blue */

  color: #003c88;
  margin-bottom: 2px;
`;

export const HeplContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #003c88;
`;

export const HelpDesc = styled.span`
  display: block;
  padding: 0 2px 18px 2px;
  text-align: center;
  font-size: 1rem;
`;

export const StyledEmail = styled.a`
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #641964;
`;
