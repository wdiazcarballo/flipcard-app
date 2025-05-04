import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { CardContext } from '../../context/CardContext';
import Button from '../common/Button';
import { FormGroup, Label, ErrorMessage as StyledError } from '../common/FormElements';

const FormContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ecf0f1;
  border-radius: 8px;
`;

const FormTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

// สคีมาการตรวจสอบความถูกต้อง
const validationSchema = Yup.object({
  name: Yup.string().required('กรุณาระบุชื่อหมวดหมู่'),
  description: Yup.string(),
  isPublic: Yup.boolean(),
});

const CategoryForm = ({ onClose, editingCategory }) => {
  const { createCategory, updateCategory } = useContext(CardContext);

  const initialValues = editingCategory 
    ? { 
        name: editingCategory.name, 
        description: editingCategory.description || '', 
        isPublic: editingCategory.isPublic || false 
      }
    : { name: '', description: '', isPublic: false };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (editingCategory) {
      await updateCategory(editingCategory._id, values);
    } else {
      await createCategory(values);
    }
    
    setSubmitting(false);
    resetForm();
    onClose();
  };

  return (
    <FormContainer>
      <FormTitle>{editingCategory ? 'แก้ไขหมวดหมู่' : 'สร้างหมวดหมู่ใหม่'}</FormTitle>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <Label htmlFor="name">ชื่อหมวดหมู่</Label>
              <StyledField type="text" id="name" name="name" />
              <ErrorMessage name="name" component={StyledError} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">คำอธิบาย</Label>
              <StyledField as="textarea" id="description" name="description" rows="3" />
              <ErrorMessage name="description" component={StyledError} />
            </FormGroup>

            <FormGroup>
              <Label>
                <Field type="checkbox" name="isPublic" />
                {' '}เผยแพร่เป็นสาธารณะ
              </Label>
            </FormGroup>

            <ButtonGroup>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'กำลังบันทึก...' : (editingCategory ? 'บันทึกการแก้ไข' : 'สร้างหมวดหมู่')}
              </Button>
              <Button type="button" secondary onClick={onClose}>
                ยกเลิก
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default CategoryForm;