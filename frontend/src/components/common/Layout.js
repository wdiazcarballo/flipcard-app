import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import Button from './Button';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: #3498db;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
`;

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Logo to="/">Flip Card App</Logo>
          <NavLinks>
            {user ? (
              <>
                <StyledLink to="/creator">Creator Mode</StyledLink>
                <StyledLink to="/player">Player Mode</StyledLink>
                <Button onClick={handleLogout}>ออกจากระบบ</Button>
              </>
            ) : (
              <>
                <StyledLink to="/login">เข้าสู่ระบบ</StyledLink>
                <StyledLink to="/register">ลงทะเบียน</StyledLink>
              </>
            )}
          </NavLinks>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>&copy; {new Date().getFullYear()} - Flip Card App | DTI132</p>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;