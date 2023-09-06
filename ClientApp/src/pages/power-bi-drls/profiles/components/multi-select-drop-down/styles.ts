import styled from "styled-components/macro";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: auto;
  min-width: 200px;
  height: 100%;
`;

export const SelectArea = styled.div`
  position: relative;
`;

export const Select = styled.select<{ error?: string | boolean }>`
  display: block;
  width: 100%;
  height: 30px;
  padding: 0 4px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background-color: white;
  z-index: 19;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.25rem center;
  background-size: 16px 12px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #ced4da")};
  border-radius: 4px;
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

export const SelectMulti = styled.div<{ error?: string | boolean }>`
  display: block;
  width: 100%;
  height: 30px;
  padding: 0 4px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background-color: white;
  z-index: 19;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.25rem center;
  background-size: 16px 12px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid #ced4da")};
  border-radius: 4px;
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

export const SelectedOption = styled.option`
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  background: white;
  cursor: default;
`;

export const Option = styled.label`
  width: 100%;
  padding: 5px;
  color: #595959;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Label = styled.span`
  display: flex;
  width: 100%;
  overflow: ellipsis;
`;

export const Options = styled.div`
  position: absolute;
  left: 0;
  top: 30px;
  width: 100%;
  background: white;
  z-index: 1;
  max-height: 200px;
  overflow: scroll;
  border-bottom: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
`;

export const Checkbox = styled.input``;
