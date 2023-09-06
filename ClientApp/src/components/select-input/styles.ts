import styled from "styled-components";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Select = styled.select<{ error?: string | boolean }>`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #ced4da")};
  border-radius: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;

  ::-ms-expand {
    display: none;
  }

  :after {
  }
`;

export const Option = styled.option`
  width: 100%;
  padding: 5px;
  color: #595959;
  display: block;
`;

export const Label = styled.span`
  display: block;
  width: 100%;
  padding: 10px 2px 2px 0px;
`;
