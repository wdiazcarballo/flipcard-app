import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: #3498db;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin: 20px 0;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 30px;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>ไม่พบหน้าที่คุณกำลังค้นหา</Subtitle>
      <Message>
        หน้าที่คุณกำลังพยายามเข้าถึงอาจถูกย้าย ลบ เปลี่ยนชื่อ
        หรือไม่เคยมีอยู่จริง
      </Message>
      <Button as={Link} to="/">
        กลับไปยังหน้าหลัก
      </Button>
    </Container>
  );
};

export default NotFoundPage;