import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 40px;
`;

const CTASection = styled.div`
  margin-bottom: 60px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureSection = styled.div`
  margin-top: 60px;
`;

const FeatureTitle = styled.h2`
  color: #34495e;
  margin-bottom: 30px;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const Feature = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 15px;
`;

const FeatureName = styled.h3`
  margin: 0 0 10px;
  color: #2c3e50;
`;

const FeatureDescription = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Title>ยินดีต้อนรับสู่ Flip Card App</Title>
      <Subtitle>แอปพลิเคชันการเรียนรู้แบบการ์ดพลิกที่ช่วยในการจดจำและทบทวนความรู้</Subtitle>
      
      <CTASection>
        {user ? (
          <ButtonGroup>
            <Button as={Link} to="/creator">
              โหมดผู้สร้าง
            </Button>
            <Button as={Link} to="/player">
              โหมดผู้เล่น
            </Button>
          </ButtonGroup>
        ) : (
          <>
            <p>เริ่มต้นใช้งานตอนนี้เพื่อสร้างและเล่นกับการ์ดของคุณ</p>
            <ButtonGroup>
              <Button as={Link} to="/login">
                เข้าสู่ระบบ
              </Button>
              <Button as={Link} to="/register" secondary>
                ลงทะเบียน
              </Button>
            </ButtonGroup>
          </>
        )}
      </CTASection>
      
      <FeatureSection>
        <FeatureTitle>คุณสมบัติเด่น</FeatureTitle>
        <Features>
          <Feature>
            <FeatureIcon>🔄</FeatureIcon>
            <FeatureName>การเรียนรู้แบบสองด้าน</FeatureName>
            <FeatureDescription>
              การ์ดแต่ละใบมีสองด้าน: ด้านหน้าสำหรับคำถามและด้านหลังสำหรับคำตอบ
              ช่วยเสริมความจำและความเข้าใจในเนื้อหา
            </FeatureDescription>
          </Feature>
          
          <Feature>
            <FeatureIcon>📚</FeatureIcon>
            <FeatureName>จัดหมวดหมู่ได้ตามต้องการ</FeatureName>
            <FeatureDescription>
              สร้างหมวดหมู่การ์ดตามหัวข้อที่คุณต้องการเรียนรู้ เพื่อให้ง่ายต่อการจัดการ
              และทบทวนความรู้อย่างเป็นระบบ
            </FeatureDescription>
          </Feature>
          
          <Feature>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureName>แบ่งปันความรู้</FeatureName>
            <FeatureDescription>
              สามารถตั้งค่าหมวดหมู่การ์ดเป็นสาธารณะเพื่อแบ่งปันกับผู้อื่น
              ช่วยให้การเรียนรู้เป็นไปอย่างกว้างขวาง
            </FeatureDescription>
          </Feature>
          
          <Feature>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureName>ใช้งานได้ทุกอุปกรณ์</FeatureName>
            <FeatureDescription>
              รองรับการใช้งานบนคอมพิวเตอร์และอุปกรณ์มือถือ ทำให้สามารถเรียนรู้
              ได้ทุกที่ทุกเวลา
            </FeatureDescription>
          </Feature>
          
          <Feature>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureName>ความปลอดภัย</FeatureName>
            <FeatureDescription>
              ระบบการยืนยันตัวตนและการควบคุมการเข้าถึงที่มีความปลอดภัยสูง
              ช่วยปกป้องข้อมูลของคุณ
            </FeatureDescription>
          </Feature>
          
          <Feature>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureName>ติดตามความก้าวหน้า</FeatureName>
            <FeatureDescription>
              ระบบแสดงความก้าวหน้าในการเรียนรู้ ช่วยให้คุณทราบว่าได้ทบทวนการ์ดไปแล้วกี่ใบ
            </FeatureDescription>
          </Feature>
        </Features>
      </FeatureSection>
    </Container>
  );
};

export default HomePage;