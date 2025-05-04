import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button';
import { FormGroup, Label, ErrorMessage as StyledError } from '../common/FormElements';

const StyledForm = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  
  a {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Alert = styled.div`
  padding: 10px;
  background-color: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

// สคีมาการตรวจสอบความถูกต้อง
const validationSchema = Yup.object({
  email: Yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('กรุณาระบุอีเมล'),
  password: Yup.string().required('กรุณาระบุรหัสผ่าน'),
});

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const success = await login(values);
    
    if (success) {
      setSuccessMessage('เข้าสู่ระบบสำเร็จ กำลังนำคุณไปยังหน้าหลัก...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    
    setSubmitting(false);
  };

  return (
    <div>
      <Title>เข้าสู่ระบบ</Title>
      
      {error && <Alert>{error}</Alert>}
      {successMessage && <Alert success>{successMessage}</Alert>}
      
      <StyledForm>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGroup>
                <Label htmlFor="email">อีเมล</Label>
                <StyledField type="email" id="email" name="email" />
                <ErrorMessage name="email" component={StyledError} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">รหัสผ่าน</Label>
                <StyledField type="password" id="password" name="password" />
                <ErrorMessage name="password" component={StyledError} />
              </FormGroup>

              <Button type="submit" disabled={isSubmitting} style={{ width: '100%' }}>
                {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </Button>
            </Form>
          )}
        </Formik>
        
        <RegisterLink>
          ยังไม่มีบัญชี? <Link to="/register">ลงทะเบียน</Link>
        </RegisterLink>
      </StyledForm>
    </div>
  );
};

export default Login;