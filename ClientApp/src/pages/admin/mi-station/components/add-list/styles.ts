import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: column;
`;

export const Button = styled.a`
  outline: none;
  border: none;
  background: #a6a6a6;
  border-radius: 4px;
  color: white;
  letter-spacing: 1px;
  padding: 10px 30px;
  font-size: ${({ theme }) => theme.fontSize["xs"]};
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

export const AddRow = styled.p`
  display: block;
  padding-left: 10px;
  cursor: pointer;
`;
