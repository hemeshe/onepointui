import styled from 'styled-components';

type NavItemProps = {
  activelink?: boolean;
};

export const Card = styled.section`
  /* white */
  background: #ffffff;
  /* soft-shadow */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.08),
    0px 0px 1px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #ffffff;
  padding: 0 15px 0px 5px;
`;

export const CardBody = styled.div`
  display: flex;
  box-sizing: border-box;
  background: #f5f5f5;
`;

export const CardTitle = styled.h3`
  color: #404040;
  font-size: ${({ theme }) => theme.fontSize['l']};
`;

export const CardNav = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
`;

export const CardNavItem = styled.span<NavItemProps>`
  height: 100%;
  border-bottom: ${({ activelink }) =>
    activelink ? '3px solid #009EB4' : 'none'};
  font-weight: ${({ activelink }) => (activelink ? 'bold' : 'normal')};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0px 30px 0 0;
  line-height: ${({ theme }) => theme.fontSize['l']};
  padding: 5px;
`;

export const CardNavItemLink = styled.a`
  text-decoration: none;
  color: #595959;
  font-size: ${({ theme }) => theme.fontSize['l']};
  cursor: pointer;
`;

export const CardBottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;
