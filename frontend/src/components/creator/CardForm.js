import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { FaPlus, FaTrash } from 'react-icons/fa';
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

const BackItems = styled.div`
  margin-top: 10px;
`;

const BackItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const AddItemButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 0;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RemoveItemButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
`;

// สคีมาการตรวจสอบความถูกต้อง
const validationSchema = Yup.object({
  front: Yup.string().required('กรุณาระบุข้อความด้านหน้าการ์ด'),
  back: Yup.array()
    .of(Yup.string().required('กรุณาระบุข้อความ'))
    .min(1, 'ต้องมีข้อความด้านหลังอย่างน้อย 1 รายการ')
    .required('กรุณาระบุข้อความด้านหลังการ์ด'),
});

const CardForm = ({ categoryId, onClose, editingCard }) => {
  const { createCard, updateCard } = useContext(CardContext);

  const initialValues = editingCard 
    ? { 
        front: editingCard.front, 
        back: editingCard.back 
      }
    : { front: '', back: [''] };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (editingCard) {
      await updateCard(editingCard._id, values);
    } else {
      await createCard(categoryId, values);
    }
    
    setSubmitting(false);
    resetForm();
    onClose();
  };

  return (
    <FormContainer>
      <FormTitle>{editingCard ? 'แก้ไขการ์ด' : 'สร้างการ์ดใหม่'}</FormTitle>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <FormGroup>
              <Label htmlFor="front">ข้อความด้านหน้าการ์ด</Label>
              <StyledField as="textarea" id="front" name="front" rows="3" />
              <ErrorMessage name="front" component={StyledError} />
              <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginTop: '5px' }}>
                สามารถใช้ HTML tag พื้นฐานได้ เช่น &lt;br&gt; สำหรับขึ้นบรรทัดใหม่
              </div>
            </FormGroup>

            <FormGroup>
              <Label>ข้อความด้านหลังการ์ด</Label>
              <ErrorMessage name="back" component={StyledError} />
              
              <FieldArray name="back">
                {({ remove, push }) => (
                  <BackItems>
                    {values.back.map((item, index) => (
                      <BackItem key={index}>
                        <StyledField 
                          name={`back.${index}`} 
                          placeholder={`รายการที่ ${index + 1}`} 
                        />
                        {values.back.length > 1 && (
                          <RemoveItemButton 
                            type="button" 
                            onClick={() => remove(index)}
                          >
                            <FaTrash />
                          </RemoveItemButton>
                        )}
                      </BackItem>
                    ))}
                    
                    <AddItemButton
                      type="button"
                      onClick={() => push('')}
                    >
                      <FaPlus /> เพิ่มรายการ
                    </AddItemButton>
                  </BackItems>
                )}
              </FieldArray>
            </FormGroup>

            <ButtonGroup>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'กำลังบันทึก...' : (editingCard ? 'บันทึกการแก้ไข' : 'สร้างการ์ด')}
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

export default CardForm;