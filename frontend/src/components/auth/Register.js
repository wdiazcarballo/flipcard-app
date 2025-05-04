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

const LoginLink = styled.div`
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
  username: Yup.string().required('กรุณาระบุชื่อผู้ใช้'),
  email: Yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('กรุณาระบุอีเมล'),
  password: Yup.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร').required('กรุณาระบุรหัสผ่าน'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
    .required('กรุณายืนยันรหัสผ่าน'),
});

const Register = () => {
  const { register, error } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, email, password } = values;
    const success = await register({ username, email, password });
    
    if (success) {
      setSuccessMessage('ลงทะเบียนสำเร็จ กำลังนำคุณไปยังหน้าหลัก...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    
    setSubmitting(false);
  };

  return (
    <div>
      <Title>ลงทะเบียน</Title>
      
      {error && <Alert>{error}</Alert>}
      {successMessage && <Alert success>{successMessage}</Alert>}
      
      <StyledForm>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGroup>
                <Label htmlFor="username">ชื่อผู้ใช้</Label>
                <StyledField type="text" id="username" name="username" />
                <ErrorMessage name="username" component={StyledError} />
              </FormGroup>

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

              <FormGroup>
                <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
                <StyledField type="password" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component={StyledError} />
              </FormGroup>


              <Button type="submit" disabled={isSubmitting} style={{ width: '100%' }}>
                {isSubmitting ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
              </Button>
            </Form>
          )}
        </Formik>
        
        <LoginLink>
          มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
        </LoginLink>
      </StyledForm>
    </div>
  );
};

export default Register;