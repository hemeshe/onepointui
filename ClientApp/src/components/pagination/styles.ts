import styled from "styled-components";

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;

  > * {
    margin: 10px;
  }
`;

export const Button = styled.button`
  background: #a6a6a6;
  border-radius: 4px;
  color: white;
  letter-spacing: 1px;
  padding: 10px 30px;
  font-size: ${({ theme }) => theme.fontSize["xs"]};
  outline: none;
  cursor: pointer;
  text-decoration: none;
`;

export const Select = styled.select`
  background: #a6a6a6;
  border-radius: 4px;
  color: white;
  letter-spacing: 1px;
  padding: 10px 30px;
  font-size: ${({ theme }) => theme.fontSize["xs"]};

  cursor: pointer;
  text-decoration: none;
`;

export const Option = styled.option``;

export const TotalCountDiv = styled.div`
  position: absolute;
  right: 10px;
  top: 40%;
  transform: translateY(-40%);
`;
