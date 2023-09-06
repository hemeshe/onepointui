import styled from "styled-components";
import { Link } from "react-router-dom";

export const Main = styled.div`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 10px;
  justify-content: center;
  background: #ffffff;
`;

export const HomeTitle = styled.span`
  width: 100%;
  color: #404040;
  display: block;
  font-size: ${({ theme }) => theme.fontSize["xl"]};
`;

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
`;

export const HomePara = styled.span`
  color: #7f7f7f;
  font-size: ${({ theme }) => theme.fontSize["m"]};
  display: block;
  padding: 1px 1px 5px 1px;
  box-sizing: border-box;
`;

export const HomeParaTitle = styled.span`
  color: #404040;
  font-size: ${({ theme }) => theme.fontSize["m"]};
  words-spacing: 1px;
  padding-right: 3px;
`;

export const Box = styled.div`
  position: relative;
  width: 95%;
  height: 400px;
  background: white;
  padding-top: 50px;
  box-sizing: border-box;
`;

export const BoxContent = styled.div`
  width: 100%;
  height: 90%;
  background: #f5f5f5;

  margin-left: 10px;
  box-sizing: border-box;
`; // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

export const BoxImage = styled.img`
  max-width: 100%;
  height: auto;
  position: absolute;
  width: 250px;
  height: 150px;
  top: 0;
  left: 28px;
  background: #f5f5f5;

  box-sizing: border-box;
  padding: 2px;
`; // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 127px;
  align-items: center;
  background: blue;
`;

export const BoxTitle = styled(Link)`
  color: #404040;
  font-family: Futura Medium;
  font-style: normal;
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSize["l"]};
  display: block;
  margin-top: 20px;
  padding: 2px 1px 10px 10px;
  text-align: left;
  box-sizing: border-box;
  text-decoration: none;
  position: absolute;
  left: 280px;
`;

export const MiddleContent = styled.div`
  padding: 150px 10px 10px 10px;
  box-sizing: border-box;
`;
