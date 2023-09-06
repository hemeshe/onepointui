import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Card } from '../../components/card';

export const Main = styled(Card)`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  width: 99%;
  padding: 10px;
  justify-content: center;
`;

export const HomeTitle = styled.span`
  width: 100%;
  color: #a50e0e;
  display: block;
  font-size: ${({ theme }) => theme.fontSize['xl']};
`;

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 2px;
`;

export const HomePara = styled.span`
  color: #4a4949;
  font-size: ${({ theme }) => theme.fontSize['m']};
  display: block;
  padding: 1px 1px 5px 1px;
  box-sizing: border-box;
`;

export const HomeParaTitle = styled.span`
  color: #a50e0e;
  font-size: ${({ theme }) => theme.fontSize['m']};
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
  height: 100%;
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 10px;
  box-sizing: border-box;
`;

export const BoxImage = styled.img`
  max-width: 100%;
  height: auto;
  position: absolute;
  width: 180px;
  height: 120px;
  top: 0;
  left: 28px;
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  padding: 2px;
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 127px;
  align-items: center;
  background: blue;
`;

export const BoxTitle = styled(Link)`
  color: #a50e0e;
  font-family: Futura Medium;
  font-style: normal;
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSize['l']};
  display: block;
  margin-top: 20px;
  padding: 2px 1px 10px 10px;
  text-align: left;
  box-sizing: border-box;
  text-decoration: none;
`;

export const MiddleContent = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;

export const Button = styled.a`
  background: #89cfdc;
  border: 1px solid #009eb4;
  border-radius: 4px;
  padding: 5px 15px;
  box-sizing: border-box;
  margin: 5px;
  cursor: pointer;
  color: black;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 90%;
  z-index: 1;
  background: #f5f5f5;
  box-sizing: border-box;
  padding: 8px;
`;
