import styled, { css } from 'styled-components/macro';

import { Props } from './Button';

export const StyledButton = styled.button<Props>`
  -webkit-appearance: button;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #003c88;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${({ primary, theme, size }) => {
    if (primary) {
      return css`
        background-color: ${theme.buttonColors['primaryBackground']};
        color: ${theme.buttonColors['primaryFont']};
        border-color: ${theme.buttonColors['primaryBorder']};
      `;
    }
    if (size === 'block') {
      return css`
        display: block;
        width: 100%;
      `;
    }
  }}

  ${({ size }) => {
    if (size === 'block') {
      return css`
        display: block;
        width: 100%;
      `;
    }
  }}
`;
