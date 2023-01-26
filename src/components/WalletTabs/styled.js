import styled from 'styled-components';
import { Link } from 'components/NavLink/NavLink.styled';

export const Container = styled.div`
  margin-top: 8px;
`;

export const Box = styled.div`
  display: flex;
`;

export const TabLink = styled(Link)`
  width: 138px;
  height: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: none;
  filter: none;

  &.isActive {
    background-color: ${p => p.theme.colors.PrimaryOrange};
    color: white;
    filter: drop-shadow(1px 3px 5px rgba(255, 107, 8, 0.35));
  }
`;

export const Outlet = styled.div`
  padding: 0px;
  margin-top: 0px;
  background-color: white;
  border-radius: 0px 30px 30px 30px;
  box-shadow: 0px 10px 60px rgba(170, 178, 197, 0.2);
  @media screen and (min-width: 768px) {
    padding: 24px 40px 42px;
  }
  @media screen and (min-width: 1280px) {
    padding: 32px 32px 61px 32px;
  }
`;

export const TransactWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SummaryWrapper = styled.div`
  display: none;
  @media screen and (min-width: 1280px) {
    display: block;
  }
`;
