import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Row = styled.div`
  flex: 0 0 auto;
  width: 100%;
  padding: 10px;

  @media (min-width: 576px) {
    width: 50%;
  }

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 992px) {
    width: 50%;
  }

  @media (min-width: 1200px) {
    width: 50%;
  }

  @media (min-width: 1400px) {
    width: 50%;
  }
`;

export const RowContent = styled.div`
  padding: 20px 60px;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background: #a6a6a6;
  border-radius: 4px;
  color: white;
  letter-spacing: 1px;
  padding: 10px 30px;
  font-size: ${({ theme }) => theme.fontSize["xs"]};
  font-weight: bold;
`;
