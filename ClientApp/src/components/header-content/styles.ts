import styled from 'styled-components';
import { Link } from 'react-router-dom';

type NavItemProps = {
  activelink?: boolean;
};

export const HeaderContent = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: ${({ theme }) => theme.headerHeight};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  width: 27%;
`;

export const Logo = styled.div``;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Futura Medium;
  color: #003c88;
  justify-content: center;
  margin: 0 25px;
  font-size: ${({ theme }) => theme.fontSize['l']};
`;

export const SubTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-weight: normal;
  font-size: ${({ theme }) => theme.fontSize['s']};
  letter-spacing: 1px;
`;

export const SubTitle = styled.div`
  padding: 0 4px;
`;
export const Title = styled.div`
  font-weight: 900;
  word-spacing: ${({ theme }) => theme.spacing['xxxs']};
  letter-spacing: ${({ theme }) => theme.spacing['xxxs']};
`;

export const SubTitleLabel = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Center = styled.div`
  display: flex;
  width: 60%;
  background: none;
  align-items: center;
  height: 100%;
`;

export const NavMain = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`;

export const NavItem = styled.span<NavItemProps>`
  height: 100%;
  border-bottom: ${({ activelink }) =>
    activelink ? '3px solid #009EB4' : 'none'};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 14px 20px;
  font-weight: ${({ activelink }) => (activelink ? 'bold' : 'normal')};
`;

export const NavItemLink = styled(Link)`
  text-decoration: none;
  color: #003c88;
  font-size: ${({ theme }) => theme.fontSize['m']};
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: flex-end;
`;

export const NavIconItem = styled.div`
  display: inline-block;
  position: relative;
`;
export const NavIconLink = styled(Link)`
  text-decoration: none;
  margin: 4px 8px;
  color: #003c88;
  position: relative;
`;

export const UserIcon = styled.div`
  display: flex;
  border-radius: 50px;
  width: 36px;
  height: 36px;
  background: #ededed;
  color: #3363a0;
  justify-content: center;
  align-items: center;
  letter-spacing: ${({ theme }) => theme.spacing['xxxs']};
  font-size: ${({ theme }) => theme.fontSize['m']};
`;
