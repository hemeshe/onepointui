import React from "react";
import styled from "styled-components/macro";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

export const StyledDateInput = styled.button`
  background: #e6e6e6;
  border: 1px solid #c2c2c2;
  padding: 5px;
  border-radius: 4px;
  width: 100%;
  text-align: left;
`;

type Props = ReactDatePickerProps;

type CustomInputProps = {
  value?: string | Date;
  onClick?: () => void;
};

class CustomInput extends React.Component<CustomInputProps, {}> {
  render() {
    const { onClick, value } = this.props;
    return (
      <StyledDateInput onClick={onClick}>
        {value ? value : "yyyy/mm/dd"}
      </StyledDateInput>
    );
  }
}

export const DateInput: React.FC<Props> = ({ onChange, ...rest }) => {
  return (
    <DatePicker
      placeholderText="yyyy/mm/dd"
      dateFormat="yyyy/MM/dd"
      onChange={onChange}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      closeOnScroll={true}
      customInput={<CustomInput />}
      popperModifiers={{
        offset: {
          enabled: true,
          offset: "5px, 10px",
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: "viewport",
        },
      }}
      {...rest}
    />
  );
};
